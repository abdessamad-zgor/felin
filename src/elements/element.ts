import { Properties as CssStyle } from "csstype";
import { FEvent } from "./event";
import { State } from "../primitives/state";
import { toCssString } from "../utils";
import { Route, Router } from "../router";

export class FTextNode<T extends any[]> {
  id: string
  stateCalls: State[] = [];
  parentNode?: FHTMLElement|FSVGElement;
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

  element(parent?: FHTMLElement) {
    if (parent) {
      this.parentNode = parent
    }
    let textContent = this.text
    for (let state of this.stateCalls) {
      textContent = textContent.replace("{}", state())
    }
    return document.createTextNode(textContent)
  }

  getStateCalls(accumulator?: { state: State, element: FElement }[]) {
    let acc = accumulator || []
    let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }))
    acc = acc.concat(...stateCalls)
    return acc
  }

  buildElementTree(parent?: FHTMLElement|FSVGElement){
    if(parent){
      this.parentNode = parent
    }
  }
}

// TODO: MAKE `element()` ACCEPT AN `FlDocument`
export class FHTMLElement {
  id: string;
  name: keyof HTMLElementTagNameMap;
  parentNode: FHTMLElement|FSVGElement;
  stateCalls: State[] = [];
  $children: FElement[];
  $style: CssStyle | null;
  $listeners: Map<keyof HTMLElementEventMap, (event: FEvent) => void>
  $classname: string
  $attributes: { [attr: string]: any }
  router: Router | null = null
  routes: Route[] | null = null;

  constructor(name: keyof HTMLElementTagNameMap, children?: (FElement | string)[] | string, style?: CssStyle) {
    this.id = crypto.randomUUID()
    this.name = name
    if (typeof children == "string") {
      this.$children = [new FTextNode(children)]
    } else if (Array.isArray(children)) {
      this.$children = []
      for (let i =0; i< children.length; i++) {
        let child = children[i]
        if (child instanceof Function) {
          this.$children.push(new FTextNode("{}", child))
          //@ts-ignore
          this.stateCalls.push(child as State)
        } else if(child instanceof Router) {
          if(this.router){
            throw Error("Cannot have multiple routers in the same element tree.")
          } else {
            child.parentNode = this
            child.index = i
            this.router = child
            for(let route of this.router.routes){
              route.parentNode = this
              route.index = i
            }
          }
        } else if (child instanceof Route) {
          child.parentNode = this
          child.index = i
          if(!Array.isArray(this.routes))
            this.routes = []
          this.routes.push(child)
        } else {
          this.$children.push(typeof child == "string" ? new FTextNode(child) : child)
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

  children(children?: FElement[]) {
    if (!children)
      return this.$children
    else {
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new FTextNode("{}", child))
        } else {
          this.$children.push(child)
        }
      }
      return this
    }
  }

  getStateCalls(accumulator?: { state: State, element: FElement }[]) {
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

  listen(eventname: keyof HTMLElementEventMap, callback: (event: FEvent) => void) {
    if (!this.$listeners.has(eventname)) {
      this.$listeners.set(eventname, callback)
    }
    return this
  }

  element(): HTMLElement {
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

    let elementChildren = this.children() as FElement[]
    if (elementChildren.length == 0) {
      return element
    } else {
      for (let child of elementChildren) {
        //@ts-ignore
        element.appendChild(child.element())
      }
      return element
    }
  }

  buildElementTree(parent?: FHTMLElement|FSVGElement){
    if(parent){
      this.parentNode = parent
    }
    if(this.$children.length > 0){
      for(let child of this.$children){
        child.buildElementTree(this)
      }
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

  hasRouter(): Router|undefined{
    if(this.router){
      return this.router;
    } else {
      if(this.$children.length>0){
        let router: Router
        for (let child of this.$children){
          if(child instanceof FHTMLElement){
            if(child.hasRouter())
              router = child.hasRouter()
          }
        }
        return router
      }
    }
  }
}

export class FSVGElement {
  id: string;
  name: keyof SVGElementTagNameMap;
  parentNode: FSVGElement|FHTMLElement;
  stateCalls: State[] = [];
  $children: FElement[];
  $style: CssStyle | null;
  $listeners: Map<keyof SVGElementEventMap, (event: FEvent) => void>
  $classname: string
  $attributes: { [attr: string]: any }

  constructor(name: keyof SVGElementTagNameMap, children?: FElement[], style?: CssStyle) {
    this.id = crypto.randomUUID();
    this.name = name;

    this.$children = []
    for (let child of children) {
      if (child instanceof Function) {
        this.$children.push(new FTextNode("{}", child))
        //@ts-ignore
        this.stateCalls.push(child as State)
      } else {
        this.$children.push(typeof child == "string" ? new FTextNode(child) : child)
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

  children(children?: FElement[]) {
    if (!children)
      return this.$children
    else {
      for (let child of children) {
        if (child instanceof Function) {
          this.$children.push(new FTextNode("{}", child))
        } else {
          this.$children.push(child)
        }
      }
      return this
    }
  }

  getStateCalls(accumulator?: { state: State, element: FElement }[]) {
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

  listen(eventname: keyof SVGElementEventMap, callback: (event: FEvent) => void) {
    if (!this.$listeners.has(eventname)) {
      this.$listeners.set(eventname, callback)
    }
    return this
  }

  element(parent?: FSVGElement): SVGElement {
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

    let elementChildren = this.children() as FElement[]
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

  buildElementTree(parent?: FHTMLElement | FSVGElement){
    if(parent){
      this.parentNode = parent
    }
    if(this.$children.length > 0){
      for(let child of this.$children){
        child.buildElementTree(this)
      }
    }
  }
}

export type FElement = FTextNode<any[]> | FHTMLElement | FSVGElement
