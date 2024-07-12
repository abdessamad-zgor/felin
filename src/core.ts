import { Properties as CssStyle } from "csstype"
import { FlState } from "./state"
import { FlElement, FlTextNode, FlHTMLElement } from "./element"
import { FlDocument } from "./document"
import { FlEffect } from "./effect"
import { FlComputed } from "./computed"

export interface FlTask<A = { [key: string]: any }, R = void> {
  priority: number
  call(args: A): R
}

type DOMUpdateArgs = { state: FlState|FlComputed, hsDocument: FlDocument, element: FlElement }

export class FlDOMUpdate implements FlTask<DOMUpdateArgs, void> {
  priority: number
  args: DOMUpdateArgs

  constructor(args: DOMUpdateArgs) {
    this.priority = 1
    this.args = args
  }

  call(args: DOMUpdateArgs) {
    let newValue = (this.args.state as Function)()
    let nodeSelector = this.args.hsDocument.selector(this.args.element as FlHTMLElement)

    let domElement = this.args.hsDocument.document.querySelector(nodeSelector)
    if (domElement) {
      domElement.replaceWith(this.args.element.element())
    }
  }
}


export class FlComputedRefresh implements FlTask {
  priority: number
  args: FlComputed

  constructor(args: FlComputed){
    this.args = args
    this.priority = 2
  }

  call(args) {
    let newValue = this.args.fn(...this.args.states)
    this.args.value = newValue
  }

}

type FlEffectArgs = { fn: (...args: FlState[]) => void, dependents: FlState[] }

export class FlEffectCall implements FlTask {
  priority: number
  args: FlEffectArgs

  constructor(args: FlEffectArgs) {
    this.args = args
    this.priority = 3
  }

  call(args: FlEffectArgs) {
    args.fn(...args.dependents)
  }
}

function quickSortByPriority(array: FlTask[]) {
  if (array.length <= 1) {
    return array;
  }

  let pivot = array[0];
  let left = [];
  let right = [];

  for (let i = 1; i < array.length; i++) {
    array[i].priority < pivot.priority ? left.push(array[i]) : right.push(array[i]);
  }
  return quickSortByPriority(left).concat(pivot, quickSortByPriority(right));
};

export class FlStack {
  tasks: FlTask[] = []
  constructor() {
  }

  pop(): FlTask {
    if (this.tasks.length > 0) {
      let highestPriorityTask = this.tasks[0]
      this.tasks = this.tasks.slice(1)
      return highestPriorityTask
    }
  }

  push(task: FlTask) {
    this.tasks.push(task)
    this.tasks = quickSortByPriority(this.tasks)
  }

  empty() {
    return this.tasks.length == 0
  }
}

export class FlRuntime {
  stack: FlStack
  running: boolean

  constructor() {
    this.stack = new FlStack()
    this.running = true
  }

  run() {
    if (!this.running) this.running = true
    while (this.running) {
      if (this.stack.empty()) {
        this.running = false
        break;
      }
      let task = this.stack.pop()
      if (task instanceof FlDOMUpdate) {
        task.call(task.args)
      } else if (task instanceof FlComputedRefresh) {
        task.call(task.args)
      } else if (task instanceof FlEffectCall) {
        task.call(task.args)
      }
    }
  }

  pushTask(task: FlTask) {
    this.stack.push(task)
    if (!this.running) this.run()
  }
}

export class FlRegistry {
  runtime: FlRuntime
  documentStates: { [key: string]: { state: FlState, element: FlElement }[] }
  documentRootsMap: { [key: string]: FlDocument }
  effects: FlEffect[]
  computed: FlComputed[]

  constructor() {
    this.runtime = new FlRuntime();
    this.documentRootsMap = {}
    this.documentStates = {}
    this.effects = []
    this.computed = []
  }

  register(task: FlTask) {
    this.runtime.pushTask(task)
  }

  registerStateCalls(root: string, stateCalls: { state: FlState, element: FlElement }[]) {
    this.documentStates[root] = stateCalls
  }

  registerStateUpdate(state: FlState) {
    let root = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state.id == state.id))
    if (root) {
      let hsDocument = this.documentRootsMap[root]
      let stateCalls = this.documentStates[root].filter(s => s.state.id == state.id);
      for (let stateCall of stateCalls) {
        let targetElement: FlHTMLElement = stateCall.element as FlHTMLElement
        if (stateCall.element instanceof FlTextNode) {
          targetElement = stateCall.element.parentNode
        }
        let domUpdate = new FlDOMUpdate({ hsDocument, state: stateCall.state, element: targetElement })
        this.runtime.pushTask(domUpdate);
      }
    }

    let computed = this.computed.find(e=>e.states.some(s=>s.id==state.id))
    if(computed){
      let computedRefresh = new FlComputedRefresh(computed)
      this.runtime.pushTask(computedRefresh)
      let computedStateRoot = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state.id == computed.id))
      if(computedStateRoot){
        let computedFlDocument = this.documentRootsMap[computedStateRoot]
        let computedStateCalls = this.documentStates[computedStateRoot].filter(s=>s.state.id == computed.id);
        for (let computedStateCall of computedStateCalls){
          let computedTargetElement: FlHTMLElement = computedStateCall.element as FlHTMLElement
          if(computedStateCall.element instanceof FlTextNode){
            computedTargetElement = computedStateCall.element.parentNode
          }
          let computedDomUpdate = new FlDOMUpdate({hsDocument: computedFlDocument, state: computedStateCall.state, element: computedTargetElement})
          this.runtime.pushTask(computedDomUpdate)
        }
      }
    }

    let effect = this.effects.find(e => e.dependants.some(s => s.id == state.id))
    if(effect){
      let effectCall = new FlEffectCall({ fn: effect.effect, dependents: effect.dependants })
      this.runtime.pushTask(effectCall)
    }
  }

  registerFlDocumentRoot(root: string, document: FlDocument) {
    if (!Object.keys(this.documentRootsMap).includes(root)) {
      this.documentRootsMap[root] = document
    }
  }

  run() {
    this.runtime.run()
  }

  registerEffect(effect: FlEffect) {
    if(!this.effects.some(e=>e.id==effect.id))
      this.effects.push(effect)
  }

  registerComputedState(state: FlComputed){
    if(!this.computed.some(c=>c.id == state.id))
      this.computed.push(state)
  }
}

export const Felin = new FlRegistry()

