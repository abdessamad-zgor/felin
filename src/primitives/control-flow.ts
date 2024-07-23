import { FElement } from "../elements/element"
import { State } from "./state"

export class FlConditional {
  condition: ()=>boolean
  trueBranch: FElement
  falseBranch: FElement
  parent?: FElement

  constructor(condition: ()=>boolean, trueBranch: FElement, falseBranch: FElement){
    this.condition = condition
    this.trueBranch = trueBranch
    this.falseBranch = falseBranch
  }

  element(parent?: FElement){
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
  state: State<Array<T>>
  iteration: (element: T)=>FElement

  constructor(state: State, iteration: (element: T)=>FElement){
    this.state = state
    this.iteration = iteration
  }
}
