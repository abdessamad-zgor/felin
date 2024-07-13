import { ExtensibleFunction } from "./utils"
import { FlState } from "./state";

export class FlComputed extends ExtensibleFunction {
  _id: string
  value: any
  fn: (...args: FlState[]) => any
  states: FlState[]
  constructor(fn: (...args: FlState[]) => any, ...states: FlState[]) {
    super(() => {
      this.value = this.fn(...this.states)
      return this.value
    })
    this.fn = fn
    this.states = states
    this.value = fn(...states)
    this._id = crypto.randomUUID()
    Felin.registerComputedState(this)
  }
}
