import { Properties as CssStyle } from "csstype";
import { FlEvent } from "./event";
import { FlState } from "./state";
import { toCssString } from "./style";

export class FlTextNode<T extends any[]> {
  id: string
  stateCalls: FlState[] = [];
  parentNode: FlHTMLElement;
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

  element(parent?: FlHTMLElement) {
    if (parent) {
      this.parentNode = parent
    }
    let textContent = this.text
    for (let state of this.stateCalls) {
      textContent = textContent.replace("{}", state())
    }
    return document.createTextNode(textContent)
  }

  getStateCalls(accumulator?: { state: FlState, element: FlElement }[]) {
    let acc = accumulator || []
    let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }))
    acc = acc.concat(...stateCalls)
    return acc
  }
}

// TODO: MAKE `element()` ACCEPT AN `FlDocument`
export class FlHTMLElement {
  id: string;
  name: keyof HTMLElementTagNameMap;
  parentNode: FlHTMLElement;
  stateCalls: FlState[] = [];
  $children: FlElement[];
  $style: CssStyle | null;
  $listeners: Map<keyof HTMLElementEventMap, (event: FlEvent) => void>
  $classname: string
  $attributes: { [attr: string]: any }

  constructor(name: keyof HTMLElementTagNameMap, children?: (FlElement | string)[] | string, style?: CssStyle) {
    this.id = crypto.randomUUID()
    this.name = name
    if (typeof children == "string") {
      this.$children = [new FlTextNode(children)]
    } else if (Array.isArray(children)) {
      this.$children = []
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new FlTextNode("{}", child))
          //@ts-ignore
          this.stateCalls.push(child as FlState)
        } else {
          this.$children.push(typeof child == "string" ? new FlTextNode(child) : child)
        }
      }
    } else {
      this.$children = []
    }
    this.$style = style || null
    this.$listeners = new Map()
    this.$attributes = {}
  }

  style(style: CssStyle) {
    this.$style = style
    return this
  }

  children(children?: FlElement[]) {
    if (!children)
      return this.$children
    else {
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new FlTextNode("{}", child))
        } else {
          this.$children.push(child)
        }
      }
      return this
    }
  }

  getStateCalls(accumulator?: { state: FlState, element: FlElement }[]) {
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

  listen(eventname: keyof HTMLElementEventMap, callback: (event: FlEvent) => void) {
    if (!this.$listeners.has(eventname)) {
      this.$listeners.set(eventname, callback)
    }
    return this
  }

  element(parent?: FlHTMLElement): HTMLElement {
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

    let elementChildren = this.children() as FlElement[]
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

export class FlSVGElement {
  id: string;
  name: keyof SVGElementTagNameMap;
  parentNode: FlSVGElement;
  stateCalls: FlState[] = [];
  $children: FlElement[];
  $style: CssStyle | null;
  $listeners: Map<keyof SVGElementEventMap, (event: FlEvent) => void>
  $classname: string
  $attributes: { [attr: string]: any }

  constructor(name: keyof SVGElementTagNameMap, children?: FlElement[], style?: CssStyle) {
    this.id = crypto.randomUUID();
    this.name = name;

    this.$children = []
    for (let child of children) {
      if (child instanceof Function) {
        this.$children.push(new FlTextNode("{}", child))
        //@ts-ignore
        this.stateCalls.push(child as FlState)
      } else {
        this.$children.push(typeof child == "string" ? new FlTextNode(child) : child)
      }
    }
    this.$style = style || null
    this.$listeners = new Map()
    this.$attributes = {}
  }

  style(style: CssStyle) {
    this.$style = style
    return this
  }

  children(children?: FlElement[]) {
    if (!children)
      return this.$children
    else {
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new FlTextNode("{}", child))
        } else {
          this.$children.push(child)
        }
      }
      return this
    }
  }

  getStateCalls(accumulator?: { state: FlState, element: FlElement }[]) {
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

  listen(eventname: keyof SVGElementEventMap, callback: (event: FlEvent) => void) {
    if (!this.$listeners.has(eventname)) {
      this.$listeners.set(eventname, callback)
    }
    return this
  }

  element(parent?: FlSVGElement): SVGElement {
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

    let elementChildren = this.children() as FlElement[]
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

export type FlElement = FlTextNode<any[]> | FlHTMLElement | FlSVGElement
