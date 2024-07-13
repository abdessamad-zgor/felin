import { ExtensibleFunction } from "./utils"
import { FlState } from "./state"

export class FlEffect extends ExtensibleFunction {
  _id: string
  effect: (...args: FlState<any>[])=>void
  dependants: FlState[]

  constructor(fn: (...args: FlState[])=>void){
    super((...args: FlState[])=>{
      this.effect = fn
      this.dependants = args
      this._id = crypto.randomUUID()
      Felin.registerEffect(this)
    })
    
  }
}
