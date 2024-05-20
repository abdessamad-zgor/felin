import * as CSS from "csstype"
import { HTMLElementTagNameMap } from "./dom";

export type HsDocument = Document | {};

export type HsEvent = Event | CustomEvent;

export interface HsElement {
  child(e: HsElement): HsElement;
  children(es: HsElement[]): HsElement;
  class(cl: string): HsElement;
  listener(event: string, callback: (e: HsEvent) => void): HsElement;
  style(style: CSS.Properties): HsElement;
}

export type HTMLElementTagNames = keyof HTMLElementTagNameMap

export interface HsStack {

}

export interface HsRegister {

}
