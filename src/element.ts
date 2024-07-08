import { Properties as CssStyle } from "csstype";
import { HsEvent } from "./event";
import { HsState } from "./state";
import { text } from "stream/consumers";
import { toCssString } from "./style";

export class HsTextNode<T extends any[]> {
  id: string
  stateCalls: HsState[] = [];
  parentNode: HsHTMLElement;
  text: string

  constructor(text: string, ...args: T) {
    this.id = crypto.randomUUID()
    if (args.length > 0)
      for (let arg of args) {
        if (arg instanceof Function) {
          this.stateCalls.push(arg)
        } else {
          text = text.replace("{}", arg)
        }
      }
    this.text = text
  }

  element(parent?: HsHTMLElement) {
    if (parent) {
      this.parentNode = parent
    }
    let textContent = this.text
    for (let state of this.stateCalls) {
      textContent = textContent.replace("{}", state())
    }
    return document.createTextNode(textContent)
  }

  getStateCalls(accumulator?: { state: HsState, element: HsElement }[]) {
    let acc = accumulator || []
    let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }))
    acc = acc.concat(...stateCalls)
    return acc
  }

}

// TODO: MAKE `element()` ACCEPT AN `HsDocument`
export class HsHTMLElement {
  id: string;
  name: keyof HTMLElementTagNameMap;
  parentNode: HsHTMLElement;
  stateCalls: HsState[] = [];
  $children: HsElement[];
  $style: CssStyle | null;
  $listeners: Map<keyof HTMLElementEventMap, (event: HsEvent) => void>
  $classname: string
  $attributes: { [attr: string]: any }

  constructor(name: keyof HTMLElementTagNameMap, children?: (HsElement | string)[] | string, style?: CssStyle) {
    this.id = crypto.randomUUID()
    this.name = name
    if (typeof children == "string") {
      this.$children = [new HsTextNode(children)]
    } else if (Array.isArray(children)) {
      this.$children = []
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new HsTextNode("{}", child))
          //@ts-ignore
          this.stateCalls.push(child as HsState)
        } else {
          this.$children.push(typeof child == "string" ? new HsTextNode(child) : child)
        }
      }
    } else {
      this.$children = []
    }
    this.$style = style || null
    this.$listeners = new Map()
  }

  style(style: CssStyle) {
    this.$style = style
    return this
  }

  children(children?: HsElement[]) {
    if (!children)
      return this.$children
    else {
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new HsTextNode("{}", child))
        } else {
          this.$children.push(child)
        }
      }
      return this
    }
  }

  getStateCalls(accumulator?: { state: HsState, element: HsElement }[]) {
    let acc = accumulator || []
    let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }))
    acc = acc.concat(...stateCalls)
    if (this.$children.length != 0) {
      for (let child of this.$children) {
        acc = child.getStateCalls(acc)
      }
    }
    return acc
  }

  child() {
    return this
  }

  listen(eventname: keyof HTMLElementEventMap, callback: (event: HsEvent) => void) {
    if (!this.$listeners.has(eventname)) {
      this.$listeners.set(eventname, callback)
    }
    return this
  }

  element(parent?: HsHTMLElement): HTMLElement {
    if (parent) {
      this.parentNode = parent
    }
    let element = document.createElement(this.name)
    //element.style.cssText = toCssString(this.$style)
    for (let entry of this.$listeners.entries()) {
      element.addEventListener(entry[0], entry[1])
    }
    if (this.$style) {
      element.style.cssText = toCssString(this.$style)
    }
    if (this.$classname) {
      element.classList.add(...this.$classname.split(" "))
    }

    for (let key of Object.keys(this.$attributes)) {
      element.setAttribute(key, this.$attributes[key] as string)
    }

    let elementChildren = this.children() as HsElement[]
    if (elementChildren.length == 0) {
      return element
    } else {
      for (let child of elementChildren) {
        //@ts-ignore
        element.appendChild(child.element(this))
      }
      return element
    }
  }

  class(classname: string) {
    this.$classname = classname
  }

  attr(name: string, value: any) {
    this.$attributes[name] = value
  }

  attrs(attrs: { [attr: string]: any }) {
    this.$attributes = { ...this.$attributes, ...attrs }
  }
}

export class HsSVGElement {
  id: string;
  name: keyof SVGElementTagNameMap;
  parentNode: HsSVGElement;
  stateCalls: HsState[] = [];
  $children: HsElement[];
  $style: CssStyle | null;
  $listeners: Map<keyof SVGElementEventMap, (event: HsEvent) => void>
  $classname: string
  $attributes: { [attr: string]: any }

  constructor(name: keyof SVGElementTagNameMap, children?: HsElement[], style?: CssStyle) {
    this.id = crypto.randomUUID();
    this.name = name;

    this.$children = []
    for (let child of children) {
      if (child instanceof Function) {
        this.$children.push(new HsTextNode("{}", child))
        //@ts-ignore
        this.stateCalls.push(child as HsState)
      } else {
        this.$children.push(typeof child == "string" ? new HsTextNode(child) : child)
      }
    }
    this.$style = style || null
    this.$listeners = new Map()
  }

  style(style: CssStyle) {
    this.$style = style
    return this
  }

  children(children?: HsElement[]) {
    if (!children)
      return this.$children
    else {
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new HsTextNode("{}", child))
        } else {
          this.$children.push(child)
        }
      }
      return this
    }
  }

  getStateCalls(accumulator?: { state: HsState, element: HsElement }[]) {
    let acc = accumulator || []
    let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }))
    acc = acc.concat(...stateCalls)
    if (this.$children.length != 0) {
      for (let child of this.$children) {
        acc = child.getStateCalls(acc)
      }
    }
    return acc
  }

  child() {
    return this
  }

  listen(eventname: keyof SVGElementEventMap, callback: (event: HsEvent) => void) {
    if (!this.$listeners.has(eventname)) {
      this.$listeners.set(eventname, callback)
    }
    return this
  }

  element(parent?: HsSVGElement): SVGElement {
    if (parent) {
      this.parentNode = parent
    }
    let element = document.createElementNS("http://www.w3.org/2000/svg", this.name)
    //element.style.cssText = toCssString(this.$style)
    for (let entry of this.$listeners.entries()) {
      element.addEventListener(entry[0], entry[1])
    }
    if (this.$style) {
      element.style.cssText = toCssString(this.$style)
    }
    if (this.$classname) {
      element.classList.add(...this.$classname.split(" "))
    }

    for (let key of Object.keys(this.$attributes)) {
      element.setAttribute(key, this.$attributes[key] as string)
    }

    let elementChildren = this.children() as HsElement[]
    if (elementChildren.length == 0) {
      return element
    } else {
      for (let child of elementChildren) {
        //@ts-ignore
        element.appendChild(child.element(this))
      }
      return element
    }
  }

  class(classname: string) {
    this.$classname = classname
  }

  attr(name: string, value: any) {
    this.$attributes[name] = value
  }

  attrs(attrs: { [attr: string]: any }) {
    this.$attributes = { ...this.$attributes, ...attrs }
  }
}

export type HsElement = HsTextNode<any[]> | HsHTMLElement | HsSVGElement
