import * as CSS from "csstype"

export type HsDocument = Document | {};

export type HsEvent = Event | CustomEvent;

export interface HsHTMLElement {
  child(e: HsHTMLElement): HsHTMLElement;
  children(es: HsHTMLElement[]): HsHTMLElement;
  class(cl: string): HsHTMLElement;
  listener(event: string, callback: (e: HsEvent) => void): HsHTMLElement;
  style(style: CSS.Properties): HsHTMLElement;
}

export interface HsStack {

}

export interface HsRegister {

}
