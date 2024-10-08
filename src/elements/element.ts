import { Properties as CssStyle } from "csstype";
import { State } from "../primitives/state";
import { ExtensibleFunction, toCssString } from "../utils";
import { Route, Router } from "../router";
import { Computed } from "../primitives/computed";
import { Conditional, Loop } from "../primitives/control-flow";

export type FEvent = Event | CustomEvent

export interface FElement<Register = {}> {
  _id: string,
  register: Register,
  parent?: FElement,
  element(): HTMLElement | SVGElement | Text
}

type FTextChildren = (State | Computed | string | number)[]
type FTextRegister = Partial<{states: State[], computed: Computed[]}>

export class FText implements FElement<FTextRegister> {
  _id: string
  register: FTextRegister
  parent?: FHTMLElement | FSVGElement;
  text: string

  constructor(text: string, ...args: FTextChildren) {
    this._id = crypto.randomUUID()
    this.register = {}
    if (args.length > 0)
      for (let arg of args) {
        if (arg instanceof State) {
          arg.setElement(this)
          if(!this.register.states) this.register.states = []
          this.register.states.push(arg)
          text = text.replace("{}", arg())
          continue;
        }
        text = text.replace("{}", arg as string)
      }
    this.text = text.toString()
  }

  element() {
    let textContent = this.text
    if(this.register.states && this.register.states.length){
      for (let state of this.register.states) {
        textContent = textContent.replace("{}", state())
      }
    }
    return document.createTextNode(textContent)
  }
}

type FHTMLElementChidren = (FElement | Router | Route | Conditional | Loop | State | Computed | string | number)[]
type FHTMLElementRegister = Partial<{states: State[], computed: Computed[], router: Router, routes: Route[], conditionals: Conditional[], loops: Loop[]}>
export class FHTMLElement implements FElement<FHTMLElementRegister> {
  _id: string;
  name: keyof HTMLElementTagNameMap;
  parent: FHTMLElement | FSVGElement;
  register: FHTMLElementRegister
  _children: FElement[];
  _style: CssStyle | null;
  _listeners: Map<keyof HTMLElementEventMap, (event: FEvent) => void>
  _classname: string
  _attributes: { [attr: string]: any }

  constructor(name: keyof HTMLElementTagNameMap, children?: FHTMLElementChidren) {
    this._id = crypto.randomUUID()
    this.name = name
    this.register = {}
    if (Array.isArray(children)) {
      this._children = []
      for (let i = 0; i < children.length; i++) {
        let child = children[i]
        if (child instanceof State) {
          this._children.push(new FText("{}", child as State))
          child.setElement(this)
          if(!this.register.states) this.register.states = []
          this.register.states.push(child)
        } else if(child instanceof Computed){
          this._children.push(new FText("{}", child as Computed))
          child.setElement(this)
          if(!this.register.computed) this.register.computed = []
          this.register.computed.push(child)
        } else if (child instanceof Router) {
          if (this.register.router) {
            throw Error("Cannot have multiple routers in the same element tree.")
          } else {
            child.parent = this
            child.index = i
            this.register.router = child
            for (let route of this.register.router.routes) {
              route.parent = this
              route.index = i
            }
          }
        } else if (child instanceof Route) {
          child.parent = this
          child.index = i
          if (!Array.isArray(this.register.routes))
            this.register.routes = []
          this.register.routes.push(child)
        } else if (child instanceof FHTMLElement || child instanceof FSVGElement || child instanceof FText) {
          (child as FElement).parent = this
          this._children.push(child)
        } else if (typeof child == "string" || typeof child == "number") {
          let textContent = new FText(child.toString())
          this._children.push(textContent)
        }
      }
    } else {
      this._children = []
    }
    this._style = null
    this._listeners = new Map()
    this._attributes = {}
  }

  style(style: CssStyle) {
    this._style = style
    return this
  }

  children(children?: FElement[]) {
    for (let child of children) {
      if (child instanceof State || child instanceof Computed) {
        let textContent = new FText("{}", (child as ExtensibleFunction)())
        textContent.parent = this
        this._children.push(textContent)
      } else {
        this._children.push(child)
      }
    }
    return this
  }

  listener(eventname: keyof HTMLElementEventMap, callback: (event: FEvent) => void) {
    if (!this._listeners.has(eventname)) {
      this._listeners.set(eventname, callback)
    }
    return this
  }

  element(): HTMLElement {
    let element = document.createElement(this.name)

    for (let entry of this._listeners.entries())
      element.addEventListener(entry[0], entry[1])

    if (this._style)
      element.style.cssText = toCssString(this._style)

    if (this._classname)
      element.classList.add(...this._classname.split(" "))

    for (let key of Object.keys(this._attributes))
      element.setAttribute(key, this._attributes[key] as string)

    let elementChildren = this._children as FElement[]
    if (elementChildren.length == 0) {
      return element
    } else {
      for (let child of elementChildren) {
        element.appendChild(child.element())
      }
      return element
    }
  }

  class(classname: string) {
    this._classname = classname
  }

  attr(name: string, value: any) {
    this._attributes[name] = value
  }

  attrs(attrs: { [attr: string]: any }) {
    this._attributes = { ...this._attributes, ...attrs }
  }
}

type FSVGElementChildren = FHTMLElement | FSVGElement | FText | State | Computed | Conditional | string | number| Loop;
type FSVGElementRegister = Partial<{states: State[], computed: Computed[], conditionals: Conditional[], loops: Loop[]}>;
export class FSVGElement implements FElement<FSVGElementRegister> {
  _id: string;
  name: keyof SVGElementTagNameMap;
  parent: FSVGElement | FHTMLElement;
  register: FSVGElementRegister;
  _children: FElement[];
  _style: CssStyle | null;
  _listeners: Map<keyof SVGElementEventMap, (event: FEvent) => void>
  _classname: string
  _attributes: { [attr: string]: any }

  constructor(name: keyof SVGElementTagNameMap, children?: FElement[]) {
    this._id = crypto.randomUUID();
    this.name = name;
    this.register = {}
    this._children = []
    for (let child of children) {
      if (child instanceof State) {
        let textContent = new FText("{}", child)
        textContent.parent = this
        this._children.push(textContent)
        if(!this.register.states) this.register.states = []
        this.register.states.push(child)
        this.register.states.push(child as State)
      }else if (child instanceof Computed){
        let textContent = new FText("{}", child)
        textContent.parent = this
        this._children.push(textContent)
        if(!this.register.computed) this.register.computed = []
        this.register.computed.push(child)
      } else {
        this._children.push(typeof child == "string" ? new FText(child) : child)
      }
    }
    this._style = null
    this._listeners = new Map()
    this._attributes = {}
  }

  style(style: CssStyle) {
    this._style = style
    return this
  }

  children(children?: FElement[]) {
    for (let child of children) {
      if (child instanceof State) {
        this._children.push(new FText("{}", child))
      } else {
        this._children.push(child)
      }
    }
    return this
  }

  listener(eventname: keyof SVGElementEventMap, callback: (event: FEvent) => void) {
    if (!this._listeners.has(eventname)) {
      this._listeners.set(eventname, callback)
    }
    return this
  }

  element(parent?: FSVGElement): SVGElement {
    if (parent) {
      this.parent = parent
    }
    let element = document.createElementNS("http://www.w3.org/2000/svg", this.name)
    //element.style.cssText = toCssString(this._style)
    for (let entry of this._listeners.entries()) {
      element.addEventListener(entry[0], entry[1])
    }
    if (this._style) {
      element.style.cssText = toCssString(this._style)
    }
    if (this._classname) {
      element.classList.add(...this._classname.split(" "))
    }

    for (let key of Object.keys(this._attributes)) {
      element.setAttribute(key, this._attributes[key] as string)
    }

    let elementChildren = this._children as FElement[]
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
    this._classname = classname
  }

  attr(name: string, value: any) {
    this._attributes[name] = value
  }

  attrs(attrs: { [attr: string]: any }) {
    this._attributes = { ...this._attributes, ...attrs }
  }
}

