import { FlComputed } from "./computed";
import { FlEffect } from "./effect";
import { createState, FlState } from "./state";
import { FlTextNode } from "./element";

export function text<T extends any[]>(text: string, ...args: T) {
  return new FlTextNode(text, ...args)
}

export function state<T>(value: T) {
  return createState(value)
}

export function effect(fn: (...args: FlState[])=>void){
  return new FlEffect(fn)
}

export function computed(fn: (...args: FlState[])=>void, ...states: FlState[]){
  return new FlComputed(fn, ...states)
}
