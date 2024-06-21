import { Properties as CssStyle } from "csstype"
import { HsDocument, HsElement, HsHTMLElement, HsState, HsTextNode } from "./hsjs"

export interface HsTask<A = { [key: string]: any }, R = void> {
  priority: number
  call(args: A): R
}

type DOMUpdateArgs = { state: HsState, hsDocument: HsDocument, element: HsElement }

export class HsDOMUpdate implements HsTask<DOMUpdateArgs, void> {
  priority: number
  args: DOMUpdateArgs

  constructor(args: DOMUpdateArgs) {
    this.priority = 1
    this.args = args
  }

  call(args: DOMUpdateArgs) {
    let newValue = this.args.state()
    let nodeSelector = this.args.hsDocument.selector(this.args.element as HsHTMLElement)
    console.log(nodeSelector)

    let domElement = this.args.hsDocument.document.querySelector(nodeSelector)
    console.log(nodeSelector)
    if (domElement) {
      console.log(domElement)
      console.log(this.args.element.element())
      domElement.replaceWith(this.args.element.element())
    }
  }
}

export class HsComputedState implements HsTask {
  priority: number
  args: {}

  call(args) {

  }

}

export class HsEffectCall implements HsTask {
  priority: number
  args: {}

  call(args) {

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
    console.log(this.tasks.map(t => t.priority))
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
      console.log(task)
      if (task instanceof HsDOMUpdate) {
        console.log(task)
        task.call(task.args)
      } else if (task instanceof HsComputedState) {

      } else if (task instanceof HsEffectCall) {

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

  constructor() {
    this.runtime = new HsRuntime();
    this.documentRootsMap = {}
    this.documentStates = {}
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
  }

  registerHsDocumentRoot(root: string, document: HsDocument) {
    if (!Object.keys(this.documentRootsMap).includes(root)) {
      this.documentRootsMap[root] = document
    }
  }

  run(root: string) {
    this.runtime.run()
  }
}

export const HSJS = new HsRegistry()

