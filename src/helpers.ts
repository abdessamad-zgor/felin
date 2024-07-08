import { FlexComputed } from "./computed";
import { FlexEffect } from "./effect";
import { FlexTextNode, createState, FlexTask, FlexState } from "./flex";

export function text<T extends any[]>(text: string, ...args: T) {
  return new FlexTextNode(text, ...args)
}

export function state<T>(value: T) {
  return createState(value)
}

export function effect(fn: (...args: FlexState[])=>void){
  return new FlexEffect(fn)
}

export function computed(fn: (...args: FlexState[])=>void, ...states: FlexState[]){
  return new FlexComputed(fn, ...states)
}
