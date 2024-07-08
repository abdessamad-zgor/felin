import { Properties as CssStyle } from "csstype"
import { FlexDocument, FlexElement, FlexHTMLElement, FlexState, FlexTextNode } from "./flex"
import { FlexEffect } from "./effect"
import { FlexComputed } from "./computed"

export interface FlexTask<A = { [key: string]: any }, R = void> {
  priority: number
  call(args: A): R
}

type DOMUpdateArgs = { state: FlexState|FlexComputed, hsDocument: FlexDocument, element: FlexElement }

export class FlexDOMUpdate implements FlexTask<DOMUpdateArgs, void> {
  priority: number
  args: DOMUpdateArgs

  constructor(args: DOMUpdateArgs) {
    this.priority = 1
    this.args = args
  }

  call(args: DOMUpdateArgs) {
    let newValue = (this.args.state as Function)()
    console.log(newValue)
    let nodeSelector = this.args.hsDocument.selector(this.args.element as FlexHTMLElement)

    let domElement = this.args.hsDocument.document.querySelector(nodeSelector)
    if (domElement) {
      domElement.replaceWith(this.args.element.element())
    }
  }
}


export class FlexComputedRefresh implements FlexTask {
  priority: number
  args: FlexComputed

  constructor(args: FlexComputed){
    this.args = args
    this.priority = 2
  }

  call(args) {
    let newValue = this.args.fn(...this.args.states)
    this.args.value = newValue
  }

}

type FlexEffectArgs = { fn: (...args: FlexState[]) => void, dependents: FlexState[] }

export class FlexEffectCall implements FlexTask {
  priority: number
  args: FlexEffectArgs

  constructor(args: FlexEffectArgs) {
    this.args = args
    this.priority = 3
  }

  call(args: FlexEffectArgs) {
    args.fn(...args.dependents)
  }
}

function quickSortByPriority(array: FlexTask[]) {
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

export class FlexStack {
  tasks: FlexTask[] = []
  constructor() {
  }

  pop(): FlexTask {
    if (this.tasks.length > 0) {
      let highestPriorityTask = this.tasks[0]
      this.tasks = this.tasks.slice(1)
      return highestPriorityTask
    }
  }

  push(task: FlexTask) {
    this.tasks.push(task)
    this.tasks = quickSortByPriority(this.tasks)
  }

  empty() {
    return this.tasks.length == 0
  }
}

export class FlexRuntime {
  stack: FlexStack
  running: boolean

  constructor() {
    this.stack = new FlexStack()
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
      if (task instanceof FlexDOMUpdate) {
        task.call(task.args)
      } else if (task instanceof FlexComputedRefresh) {
        task.call(task.args)
      } else if (task instanceof FlexEffectCall) {
        task.call(task.args)
      }
    }
  }

  pushTask(task: FlexTask) {
    this.stack.push(task)
    if (!this.running) this.run()
  }
}

export class FlexRegistry {
  runtime: FlexRuntime
  documentStates: { [key: string]: { state: FlexState, element: FlexElement }[] }
  documentRootsMap: { [key: string]: FlexDocument }
  effects: FlexEffect[]
  computed: FlexComputed[]

  constructor() {
    this.runtime = new FlexRuntime();
    this.documentRootsMap = {}
    this.documentStates = {}
    this.effects = []
    this.computed = []
  }

  register(task: FlexTask) {
    this.runtime.pushTask(task)
  }

  registerStateCalls(root: string, stateCalls: { state: FlexState, element: FlexElement }[]) {
    this.documentStates[root] = stateCalls
  }

  registerStateUpdate(state: FlexState) {
    let root = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state.id == state.id))
    if (root) {
      let hsDocument = this.documentRootsMap[root]
      let stateCalls = this.documentStates[root].filter(s => s.state.id == state.id);
      for (let stateCall of stateCalls) {
        let targetElement: FlexHTMLElement = stateCall.element as FlexHTMLElement
        if (stateCall.element instanceof FlexTextNode) {
          targetElement = stateCall.element.parentNode
        }
        let domUpdate = new FlexDOMUpdate({ hsDocument, state: stateCall.state, element: targetElement })
        this.runtime.pushTask(domUpdate);
      }
    }

    let computed = this.computed.find(e=>e.states.some(s=>s.id==state.id))
    console.log(computed)
    if(computed){
      let computedRefresh = new FlexComputedRefresh(computed)
      this.runtime.pushTask(computedRefresh)
      console.log(this.documentStates)
      let computedStateRoot = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state.id == computed.id))
      if(computedStateRoot){
        let computedFlexDocument = this.documentRootsMap[computedStateRoot]
        let computedStateCalls = this.documentStates[computedStateRoot].filter(s=>s.state.id == computed.id);
        for (let computedStateCall of computedStateCalls){
          let computedTargetElement: FlexHTMLElement = computedStateCall.element as FlexHTMLElement
          if(computedStateCall.element instanceof FlexTextNode){
            computedTargetElement = computedStateCall.element.parentNode
          }
          let computedDomUpdate = new FlexDOMUpdate({hsDocument: computedFlexDocument, state: computedStateCall.state, element: computedTargetElement})
          this.runtime.pushTask(computedDomUpdate)
        }
      }
    }

    let effect = this.effects.find(e => e.dependants.some(s => s.id == state.id))
    if(effect){
      let effectCall = new FlexEffectCall({ fn: effect.effect, dependents: effect.dependants })
      this.runtime.pushTask(effectCall)
    }
  }

  registerFlexDocumentRoot(root: string, document: FlexDocument) {
    if (!Object.keys(this.documentRootsMap).includes(root)) {
      this.documentRootsMap[root] = document
    }
  }

  run() {
    this.runtime.run()
  }

  registerEffect(effect: FlexEffect) {
    if(!this.effects.some(e=>e.id==effect.id))
      this.effects.push(effect)
  }

  registerComputedState(state: FlexComputed){
    if(!this.computed.some(c=>c.id == state.id))
      this.computed.push(state)
  }
}

export const FLEX = new FlexRegistry()

