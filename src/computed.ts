import { ExtensibleFunction, HsState } from "./state";

export class HsComputed extends ExtensibleFunction {
  id: string
  value: any
  fn:  (...args: HsState[])=>any
  states: HsState[]
  constructor(fn: (...args: HsState[])=>any, ...states: HsState[]) {
    super(()=>{
      this.value = this.fn(...this.states)
      return this.value
    })
    this.fn = fn
    this.states = states
    this.value = fn(...states)
    this.id = crypto.randomUUID()
    HSJS.registerComputedState(this)
  }
}
