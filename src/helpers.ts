import { State } from "./primitives/state";
import { Effect } from "./primitives/effect";
import { Computed } from "./primitives/computed";
import { Loop, Conditional } from "./primitives/control-flow";
import { Component, Route, Router } from "./router";
import { FElement, FHTMLElement, FText } from "./elements/element";
import { FDocument } from "./felin";

export function $text(text: string, ...args: any[]) {
  return new FText(text, ...args)
}

export function $state<T>(value: T) {
  return new State<T>(value);
}

export function $effect(fn: ()=>void, ...states: State[]){
  new Effect(fn, ...states)
}

export function $computed(fn: (...args: State[])=>void, ...states: State[]){
  return new Computed(fn, ...states)
}

export function $router(...routes: Route[]){
  return new Router(...routes)
}

export function $route(path: string, element: FElement){
  return new Route(path, element)
}

export function $params(){
  return Felin.getRouterParams()
}

export function $document(){
  return new FDocument()
}

export function $link(path: string, element: FElement|string){
  let linkElement = new FHTMLElement("a", [element])
  return linkElement.listener("click", (e)=>{
    e.preventDefault()
    let rootSelector = Felin.getElementRootSelector(linkElement)
    if(typeof rootSelector == 'string')
      Felin.registerRouteChange(path, rootSelector)
  })
}

export function $if(condition: ()=>boolean, trueBranch: FElement, falseBranch: FElement){
  return new Conditional(condition, trueBranch, falseBranch)
}

export function $for<T>(state: State<Array<T>>, iteration: (element: T)=>FElement){
  return new Loop(state, iteration)
}

export function $length<T>(state: State<Array<T>>){
  return new State(state.length)
}
