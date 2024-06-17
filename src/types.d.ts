import * as CSS from "csstype"
import { HTMLElementTagNameMap } from "./dom";
import { HsHTMLElement, HsTextNode } from "./core";

export type HsDocument = Document | {};

export type HsEvent = Event | CustomEvent;

export type HsElement = HsTextNode | HsHTMLElement

export type HsTask = {
  fn: Function,
  args: any[],
  priority: number,
  tasks?: HsTask[]
}

export type HTMLElementTagNames = keyof HTMLElementTagNameMap

export interface HsStack {
  push(c: any): void
  pop(): any
  peek(i: number): any
}

/**
 * a registry is class which keeps track of the dynamic allocations that will be stored Hs Stack for now I dont think this is necessary but in the future I thinks they will
 * */
export interface HsRegistry {
  register(c: any): void
}

export interface HsRuntime {
  run(task: HsTask): Error | null
}
