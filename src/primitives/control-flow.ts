import { FlElement } from "./element"
import { FlState } from "./state"

export class FlConditional {
  condition: ()=>boolean
  trueBranch: FlElement
  falseBranch: FlElement
  parent?: FlElement

  constructor(condition: ()=>boolean, trueBranch: FlElement, falseBranch: FlElement){
    this.condition = condition
    this.trueBranch = trueBranch
    this.falseBranch = falseBranch
  }

  element(parent?: FlElement){
    if(parent){
      this.parent = parent
    }
    let result = this.condition()
    if(result){
      return this.trueBranch.element()
    } else {
      return this.falseBranch.element()
    }
  }
}

export class FlLoop<T = any> {
  state: FlState<Array<T>>
  iteration: (element: T)=>FlElement

  constructor(state: FlState, iteration: (element: T)=>FlElement){
    this.state = state
    this.iteration = iteration
  }
}
