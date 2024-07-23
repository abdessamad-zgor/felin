import { Computed } from "../primitives/computed"
import { State } from "../primitives/state"
import { FDocument } from "./document"
import { FElement, FHTMLElement } from "../elements/element"
import { Router } from "../router"

export interface Task<A = { [key: string]: any }, R = void> {
  priority: number
  call(args: A): R
}

type DOMUpdateArgs = { state: State|Computed, flDocument: FDocument, element: FElement }

export class DOMUpdate implements Task<DOMUpdateArgs, void> {
  priority: number
  args: DOMUpdateArgs

  constructor(args: DOMUpdateArgs) {
    this.priority = 1
    this.args = args
  }

  call(args: DOMUpdateArgs) {
    let newValue = (this.args.state as Function)()
    let nodeSelector = this.args.flDocument.selector(this.args.element as FHTMLElement)

    let domElement = this.args.flDocument.document.querySelector(nodeSelector)
    if (domElement) {
      domElement.replaceWith(this.args.element.element())
    }
  }
}


export class ComputedRefresh implements Task {
  priority: number
  args: Computed

  constructor(args: Computed){
    this.args = args
    this.priority = 2
  }

  call(args) {
    let newValue = this.args.fn(...this.args.states)
    this.args.value = newValue
  }

}

type EffectArgs = { fn: (...args: State[]) => void, dependents: State[] }

export class EffectCall implements Task {
  priority: number
  args: EffectArgs

  constructor(args: EffectArgs) {
    this.args = args
    this.priority = 3
  }

  call(args: EffectArgs) {
    args.fn(...args.dependents)
  }
}

type RouteChangeArgs = {document: FDocument, router: Router, path: string}

export class RouteChange implements Task {
  priority: number
  args: RouteChangeArgs

  constructor(args: RouteChangeArgs) {
    this.args = args
    this.priority = 4
  }

  call(args: RouteChangeArgs) {
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
