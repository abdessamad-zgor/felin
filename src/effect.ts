import { ExtensibleFunction, HsState } from "./state"

export class HsEffect extends ExtensibleFunction {
  id: string
  effect: (...args: HsState[])=>void
  dependants: HsState[]

  constructor(fn: (...args: HsState[])=>void){
    super((...args: HsState[])=>{
      this.effect = fn
      this.dependants = args
      this.id = crypto.randomUUID()
      HSJS.registerEffect(this)
    })
    
  }
}
