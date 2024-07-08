import { ExtensibleFunction, FlexState } from "./state"

export class FlexEffect extends ExtensibleFunction {
  id: string
  effect: (...args: FlexState[])=>void
  dependants: FlexState[]

  constructor(fn: (...args: FlexState[])=>void){
    super((...args: FlexState[])=>{
      this.effect = fn
      this.dependants = args
      this.id = crypto.randomUUID()
      FLEX.registerEffect(this)
    })
    
  }
}
