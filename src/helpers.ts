import { HsComputed } from "./computed";
import { HsEffect } from "./effect";
import { HsTextNode, createState, HsTask, HsState } from "./hsjs";

export function text<T extends any[]>(text: string, ...args: T) {
  return new HsTextNode(text, ...args)
}

export function state<T>(value: T) {
  return createState(value)
}

export function effect(fn: (...args: HsState[])=>void){
  return new HsEffect(fn)
}

export function computed(fn: (...args: HsState[])=>void, ...states: HsState[]){
  return new HsComputed(fn, ...states)
}
