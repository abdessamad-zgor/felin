import { ExtensibleFunction, FlState } from "./state"

export class FlEffect extends ExtensibleFunction {
  id: string
  effect: (...args: FlState[])=>void
  dependants: FlState[]

  constructor(fn: (...args: FlState[])=>void){
    super((...args: FlState[])=>{
      this.effect = fn
      this.dependants = args
      this.id = crypto.randomUUID()
      Fl.registerEffect(this)
    })
    
  }
}
