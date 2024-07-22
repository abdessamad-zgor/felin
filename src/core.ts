import { Properties as CssStyle } from "csstype"
import { FlState } from "./state"
import { FlElement, FlTextNode, FlHTMLElement } from "./element"
import { FlDocument } from "./document"
import { FlEffect } from "./effect"
import { FlComputed } from "./computed"
import { FlRoute, FlRouter } from "./router"

export interface FlTask<A = { [key: string]: any }, R = void> {
  priority: number
  call(args: A): R
}

type DOMUpdateArgs = { state: FlState|FlComputed, flDocument: FlDocument, element: FlElement }

export class FlDOMUpdate implements FlTask<DOMUpdateArgs, void> {
  priority: number
  args: DOMUpdateArgs

  constructor(args: DOMUpdateArgs) {
    this.priority = 1
    this.args = args
  }

  call(args: DOMUpdateArgs) {
    let newValue = (this.args.state as Function)()
    let nodeSelector = this.args.flDocument.selector(this.args.element as FlHTMLElement)

    let domElement = this.args.flDocument.document.querySelector(nodeSelector)
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

type FlRouteChangeArgs = {document: FlDocument, router: FlRouter, path: string}

export class FlRouteChange implements FlTask {
  priority: number
  args: FlRouteChangeArgs

  constructor(args: FlRouteChangeArgs) {
    this.args = args
    this.priority = 4
  }

  call(args: FlRouteChangeArgs) {
    args.router.matchRoute(args.path)
    let activeRoutes = args.router.active
    let previousRoutes = args.router.previous
    if(previousRoutes.length>0){
      for(let previousRoute of previousRoutes){
        let routeParent = previousRoute.parentNode
        routeParent.$children = routeParent.$children.filter(child=>child.id != previousRoute.element.id)
      }
    }
    for(let activeRoute of activeRoutes){
      let routeParent = activeRoute.parentNode
      routeParent.$children.splice(activeRoute.index, 0, activeRoute.element)
    }
    let routesParentNodes = activeRoutes.map(route=>route.parentNode)
    console.log(routesParentNodes)
    for(let targetNode of routesParentNodes){
      args.document.rerenderElement(targetNode)
    }
    args.document.window.history.pushState("", "", args.path)
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
      } else if (task instanceof FlRouteChange) {
        task.call(task.args)
      }
    }
  }

  pushTask(task: FlTask) {
    this.stack.push(task)
    if (!this.running) this.run()
  }
}


