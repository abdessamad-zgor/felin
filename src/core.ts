import { Properties as CssStyle } from "csstype"
import { HsDocument, HsElement, HsState } from "./hsjs"

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
    let nodeSelector = this.args.element.selector(this.args.hsDocument.rootId, this.args.hsDocument.rootElement)

    let domElement = this.args.hsDocument.document.querySelector(nodeSelector)
    this.args.hsDocument.document.replaceChild(domElement, this.args.element.element())
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
      let highestPriorityTask = { ...(this.tasks[0]) }
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

  run(documentMap: { [key: string]: HsDocument }, root: string) {
    while (true) {
      if (!this.stack.empty()) {
        let task = this.stack.pop()
        if (task instanceof HsDOMUpdate) {
          task.call(task.args)
        } else if (task instanceof HsComputedState) {

        } else if (task instanceof HsEffectCall) {

        }
      }
    }
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
    this.runtime.stack.push(task)
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
        this.runtime.stack.push(new HsDOMUpdate({ hsDocument, state: stateCall.state, element: stateCall.element }));
      }
    }
  }

  registerHsDocumentRoot(root: string, document: HsDocument) {
    if (!Object.keys(this.documentRootsMap).includes(root)) {
      this.documentRootsMap[root] = document
    }
  }

  run(root: string) {
    this.runtime.run(this.documentRootsMap, root)
  }
}

export const HSJS = new HsRegistry()

