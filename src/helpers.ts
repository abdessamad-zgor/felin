import { FlComputed } from "./computed";
import { FlEffect } from "./effect";
import { FlState } from "./state";
import { FlElement, FlHTMLElement, FlTextNode } from "./element";
import { FlComponent, FlRoute, FlRouter } from "./router";
import { FlConditional, FlLoop } from "./control-flow";

export function $text<T extends any[]>(text: string, ...args: T) {
  return new FlTextNode(text, ...args)
}

export function $state<T>(value: T) {
  return new FlState<T>(value);
}

export function $effect(fn: (...args: FlState[])=>void){
  return new FlEffect(fn)
}

export function $computed(fn: (...args: FlState[])=>void, ...states: FlState[]){
  return new FlComputed(fn, ...states)
}

export function $router(...routes: FlRoute[]){
  return new FlRouter(...routes)
}

export function $route(path: string, element: FlComponent<{}>){
  return new FlRoute(path, element)
}

export function $params(){
  return Felin.getRouterParams()
}

export function $link(path: string, element: FlElement|string){
  let linkElement = (new FlHTMLElement("a", typeof element == "string"? element: [element] ))
  return linkElement.listen("click", (e)=>{
    e.preventDefault()
    let rootSelector = Felin.getElementRootSelector(linkElement)
    if(typeof rootSelector == 'string')
      Felin.registerRouteChange(path, rootSelector)
  })
}

export function $if(condition: ()=>boolean, trueBranch: FlElement, falseBranch: FlElement){
  return new FlConditional(condition, trueBranch, falseBranch)
}

export function $for<T>(state: FlState<Array<T>>, iteration: (element: T)=>FlElement){
  return new FlLoop(state, iteration)
}
