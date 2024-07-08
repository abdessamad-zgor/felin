import { ExtensibleFunction, FlexState } from "./state";

export class FlexComputed extends ExtensibleFunction {
  id: string
  value: any
  fn:  (...args: FlexState[])=>any
  states: FlexState[]
  constructor(fn: (...args: FlexState[])=>any, ...states: FlexState[]) {
    super(()=>{
      this.value = this.fn(...this.states)
      return this.value
    })
    this.fn = fn
    this.states = states
    this.value = fn(...states)
    this.id = crypto.randomUUID()
    FLEX.registerComputedState(this)
  }
}
