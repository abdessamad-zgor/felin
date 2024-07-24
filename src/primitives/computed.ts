import { FElement } from "../elements/element";
import { ExtensibleFunction } from "../utils"
import { State } from "./state";

export class Computed extends ExtensibleFunction {
  _id: string
  value: any
  fn: (...args: State[]) => any
  states: State[]
  elements: FElement[]

  constructor(fn: (...args: State[]) => any, ...states: State[]) {
    super(() => {
      this.value = this.fn(...this.states)
      return this
    })
    this.fn = fn
    this.states = states
    this.value = fn(...states)
    this._id = crypto.randomUUID()
    Felin.registerComputed(this)
  }

  setElement(element: FElement){
    this.elements.push(element)
  }
}
