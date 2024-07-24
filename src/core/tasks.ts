import { Computed } from "../primitives/computed"
import { State } from "../primitives/state"
import { FDocument } from "./document"
import { FElement, FHTMLElement } from "../elements/element"
import { Router } from "../router"
import { Effect } from "../primitives/effect"

export interface Task<A = { [key: string]: any }, R = void> {
  priority: number
  call(args: A): R
}

type DOMUpdateArgs = { state: State|Computed, document: FDocument }

export class DOMUpdate implements Task<DOMUpdateArgs, void> {
  priority: number
  args: DOMUpdateArgs

  constructor(args: DOMUpdateArgs) {
    this.priority = 1
    this.args = args
  }

  call(args: DOMUpdateArgs) {
    for(let element of args.state.elements){
      let newValue = (this.args.state as Function)()
      let nodeSelector = this.args.document.selector(element as FHTMLElement)

      let domElement = this.args.document.document.querySelector(nodeSelector)
      if (domElement) {
        domElement.replaceWith(element.element())
      }
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

export class EffectCall implements Task {
  priority: number
  args: Effect

  constructor(args: Effect) {
    this.args = args
    this.priority = 3
  }

  call(args: Effect) {
    args.effect()
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
        let routeParent = previousRoute.parent
        routeParent._children = routeParent._children.filter(child=>child._id != previousRoute.element._id)
      }
    }
    for(let activeRoute of activeRoutes){
      let routeParent = activeRoute.parent
      routeParent._children.splice(activeRoute.index, 0, activeRoute.element)
    }
    let routesParentNodes = activeRoutes.map(route=>route.parent)
    console.log(routesParentNodes)
    for(let targetNode of routesParentNodes){
      args.document.rerenderElement(targetNode)
    }
    args.document.window.history.pushState("", "", args.path)
  }
}

type InitEffectRegistryArgs = Effect
export class InitEffectRegistry implements Task {
  priority: number
  args: InitEffectRegistryArgs 

  constructor(args: InitEffectRegistryArgs){
    this.priority = 0
    this.args = args
  }

  call(){
    Felin.initEffectRegistry(this.args)
  }
}

type InitComputedRegistryArgs = Computed
export class InitComputedRegistry implements Task {
  priority: number
  args: InitComputedRegistryArgs 

  constructor(args: InitComputedRegistryArgs){
    this.priority = 0
    this.args = args
  }

  call(){
    Felin.initComputedRegistry(this.args)
  }
}
