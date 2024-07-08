import { Properties as CssStyle } from "csstype";
import { FlexEvent } from "./event";
import { FlexState } from "./state";
import { text } from "stream/consumers";
import { toCssString } from "./style";

export class FlexTextNode<T extends any[]> {
  id: string
  stateCalls: FlexState[] = [];
  parentNode: FlexHTMLElement;
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

  element(parent?: FlexHTMLElement) {
    if (parent) {
      this.parentNode = parent
    }
    let textContent = this.text
    for (let state of this.stateCalls) {
      textContent = textContent.replace("{}", state())
    }
    return document.createTextNode(textContent)
  }

  getStateCalls(accumulator?: { state: FlexState, element: FlexElement }[]) {
    let acc = accumulator || []
    let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }))
    acc = acc.concat(...stateCalls)
    return acc
  }
}

// TODO: MAKE `element()` ACCEPT AN `FlexDocument`
export class FlexHTMLElement {
  id: string;
  name: keyof HTMLElementTagNameMap;
  parentNode: FlexHTMLElement;
  stateCalls: FlexState[] = [];
  $children: FlexElement[];
  $style: CssStyle | null;
  $listeners: Map<keyof HTMLElementEventMap, (event: FlexEvent) => void>
  $classname: string
  $attributes: { [attr: string]: any }

  constructor(name: keyof HTMLElementTagNameMap, children?: (FlexElement | string)[] | string, style?: CssStyle) {
    this.id = crypto.randomUUID()
    this.name = name
    if (typeof children == "string") {
      this.$children = [new FlexTextNode(children)]
    } else if (Array.isArray(children)) {
      this.$children = []
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new FlexTextNode("{}", child))
          //@ts-ignore
          this.stateCalls.push(child as FlexState)
        } else {
          this.$children.push(typeof child == "string" ? new FlexTextNode(child) : child)
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

  children(children?: FlexElement[]) {
    if (!children)
      return this.$children
    else {
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new FlexTextNode("{}", child))
        } else {
          this.$children.push(child)
        }
      }
      return this
    }
  }

  getStateCalls(accumulator?: { state: FlexState, element: FlexElement }[]) {
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

  listen(eventname: keyof HTMLElementEventMap, callback: (event: FlexEvent) => void) {
    if (!this.$listeners.has(eventname)) {
      this.$listeners.set(eventname, callback)
    }
    return this
  }

  element(parent?: FlexHTMLElement): HTMLElement {
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

    let elementChildren = this.children() as FlexElement[]
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

export class FlexSVGElement {
  id: string;
  name: keyof SVGElementTagNameMap;
  parentNode: FlexSVGElement;
  stateCalls: FlexState[] = [];
  $children: FlexElement[];
  $style: CssStyle | null;
  $listeners: Map<keyof SVGElementEventMap, (event: FlexEvent) => void>
  $classname: string
  $attributes: { [attr: string]: any }

  constructor(name: keyof SVGElementTagNameMap, children?: FlexElement[], style?: CssStyle) {
    this.id = crypto.randomUUID();
    this.name = name;

    this.$children = []
    for (let child of children) {
      if (child instanceof Function) {
        this.$children.push(new FlexTextNode("{}", child))
        //@ts-ignore
        this.stateCalls.push(child as FlexState)
      } else {
        this.$children.push(typeof child == "string" ? new FlexTextNode(child) : child)
      }
    }
    this.$style = style || null
    this.$listeners = new Map()
  }

  style(style: CssStyle) {
    this.$style = style
    return this
  }

  children(children?: FlexElement[]) {
    if (!children)
      return this.$children
    else {
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new FlexTextNode("{}", child))
        } else {
          this.$children.push(child)
        }
      }
      return this
    }
  }

  getStateCalls(accumulator?: { state: FlexState, element: FlexElement }[]) {
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

  listen(eventname: keyof SVGElementEventMap, callback: (event: FlexEvent) => void) {
    if (!this.$listeners.has(eventname)) {
      this.$listeners.set(eventname, callback)
    }
    return this
  }

  element(parent?: FlexSVGElement): SVGElement {
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

    let elementChildren = this.children() as FlexElement[]
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

export type FlexElement = FlexTextNode<any[]> | FlexHTMLElement | FlexSVGElement
