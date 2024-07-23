import { ExtensibleFunction } from "../utils"
import { State } from "./state"

export class Effect extends ExtensibleFunction {
  _id: string
  effect: (...args: State<any>[])=>void
  dependants: State[]

  constructor(fn: (...args: State[])=>void){
    super((...args: State[])=>{
      this.effect = fn
      this.dependants = args
      this._id = crypto.randomUUID()
      Felin.registerEffect(this)
    })
    
  }
}
