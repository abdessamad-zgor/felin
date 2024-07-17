import { FlComputed } from "./computed";
import { FlEffect } from "./effect";
import { FlState } from "./state";
import { FlElement, FlTextNode } from "./element";
import { FlRoute, FlRouter } from "./router";
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

export function $link(path: string, element: FlElement|string){

}

export function $if(condition: ()=>boolean, trueBranch: FlElement, falseBranch: FlElement){
  return new FlConditional(condition, trueBranch, falseBranch)
}

export function $for<T>(state: FlState<Array<T>>, iteration: (element: T)=>FlElement){
  return new FlLoop(state, iteration)
}
