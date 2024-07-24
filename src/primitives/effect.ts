import { Computed } from "./computed"
import { State } from "./state"

export class Effect {
  _id: string
  effect: ()=>void
  states: State[]

  constructor(fn: ()=>void, ...states: State[]){
    this.effect = fn
    this.states = states
    this._id = crypto.randomUUID()
    Felin.registerEffect(this)
  }
}
