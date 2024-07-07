import { Properties as CssStyle } from "csstype"
import { HsDocument, HsElement, HsHTMLElement, HsState, HsTextNode } from "./hsjs"
import { HsEffect } from "./effect"
import { HsComputed } from "./computed"

export interface HsTask<A = { [key: string]: any }, R = void> {
  priority: number
  call(args: A): R
}

type DOMUpdateArgs = { state: HsState|HsComputed, hsDocument: HsDocument, element: HsElement }

export class HsDOMUpdate implements HsTask<DOMUpdateArgs, void> {
  priority: number
  args: DOMUpdateArgs

  constructor(args: DOMUpdateArgs) {
    this.priority = 1
    this.args = args
  }

  call(args: DOMUpdateArgs) {
    let newValue = (this.args.state as Function)()
    console.log(newValue)
    let nodeSelector = this.args.hsDocument.selector(this.args.element as HsHTMLElement)

    let domElement = this.args.hsDocument.document.querySelector(nodeSelector)
    if (domElement) {
      domElement.replaceWith(this.args.element.element())
    }
  }
}


export class HsComputedRefresh implements HsTask {
  priority: number
  args: HsComputed

  constructor(args: HsComputed){
    this.args = args
    this.priority = 2
  }

  call(args) {
    let newValue = this.args.fn(...this.args.states)
    this.args.value = newValue
  }

}

type HsEffectArgs = { fn: (...args: HsState[]) => void, dependents: HsState[] }

export class HsEffectCall implements HsTask {
  priority: number
  args: HsEffectArgs

  constructor(args: HsEffectArgs) {
    this.args = args
    this.priority = 3
  }

  call(args: HsEffectArgs) {
    args.fn(...args.dependents)
  }
}

function quickSortByPriority(array: HsTask[]) {
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

export class HsStack {
  tasks: HsTask[] = []
  constructor() {
  }

  pop(): HsTask {
    if (this.tasks.length > 0) {
      let highestPriorityTask = this.tasks[0]
      this.tasks = this.tasks.slice(1)
      return highestPriorityTask
    }
  }

  push(task: HsTask) {
    this.tasks.push(task)
    this.tasks = quickSortByPriority(this.tasks)
  }

  empty() {
    return this.tasks.length == 0
  }
}

export class HsRuntime {
  stack: HsStack
  running: boolean

  constructor() {
    this.stack = new HsStack()
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
      if (task instanceof HsDOMUpdate) {
        task.call(task.args)
      } else if (task instanceof HsComputedRefresh) {
        task.call(task.args)
      } else if (task instanceof HsEffectCall) {
        task.call(task.args)
      }
    }
  }

  pushTask(task: HsTask) {
    this.stack.push(task)
    if (!this.running) this.run()
  }
}

export class HsRegistry {
  runtime: HsRuntime
  documentStates: { [key: string]: { state: HsState, element: HsElement }[] }
  documentRootsMap: { [key: string]: HsDocument }
  effects: HsEffect[]
  computed: HsComputed[]

  constructor() {
    this.runtime = new HsRuntime();
    this.documentRootsMap = {}
    this.documentStates = {}
    this.effects = []
    this.computed = []
  }

  register(task: HsTask) {
    this.runtime.pushTask(task)
  }

  registerStateCalls(root: string, stateCalls: { state: HsState, element: HsElement }[]) {
    this.documentStates[root] = stateCalls
  }

  registerStateUpdate(state: HsState) {
    let root = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state.id == state.id))
    if (root) {
      let hsDocument = this.documentRootsMap[root]
      let stateCalls = this.documentStates[root].filter(s => s.state.id == state.id);
      for (let stateCall of stateCalls) {
        let targetElement: HsHTMLElement = stateCall.element as HsHTMLElement
        if (stateCall.element instanceof HsTextNode) {
          targetElement = stateCall.element.parentNode
        }
        let domUpdate = new HsDOMUpdate({ hsDocument, state: stateCall.state, element: targetElement })
        this.runtime.pushTask(domUpdate);
      }
    }

    let computed = this.computed.find(e=>e.states.some(s=>s.id==state.id))
    console.log(computed)
    if(computed){
      let computedRefresh = new HsComputedRefresh(computed)
      this.runtime.pushTask(computedRefresh)
      console.log(this.documentStates)
      let computedStateRoot = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state.id == computed.id))
      if(computedStateRoot){
        let computedHsDocument = this.documentRootsMap[computedStateRoot]
        let computedStateCalls = this.documentStates[computedStateRoot].filter(s=>s.state.id == computed.id);
        for (let computedStateCall of computedStateCalls){
          let computedTargetElement: HsHTMLElement = computedStateCall.element as HsHTMLElement
          if(computedStateCall.element instanceof HsTextNode){
            computedTargetElement = computedStateCall.element.parentNode
          }
          let computedDomUpdate = new HsDOMUpdate({hsDocument: computedHsDocument, state: computedStateCall.state, element: computedTargetElement})
          this.runtime.pushTask(computedDomUpdate)
        }
      }
    }

    let effect = this.effects.find(e => e.dependants.some(s => s.id == state.id))
    if(effect){
      let effectCall = new HsEffectCall({ fn: effect.effect, dependents: effect.dependants })
      this.runtime.pushTask(effectCall)
    }
  }

  registerHsDocumentRoot(root: string, document: HsDocument) {
    if (!Object.keys(this.documentRootsMap).includes(root)) {
      this.documentRootsMap[root] = document
    }
  }

  run() {
    this.runtime.run()
  }

  registerEffect(effect: HsEffect) {
    if(!this.effects.some(e=>e.id==effect.id))
      this.effects.push(effect)
  }

  registerComputedState(state: HsComputed){
    if(!this.computed.some(c=>c.id == state.id))
      this.computed.push(state)
  }
}

export const HSJS = new HsRegistry()

