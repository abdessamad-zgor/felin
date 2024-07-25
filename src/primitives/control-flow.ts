import { FElement } from "../elements/element"
import { State } from "./state"

export class Conditional {
  condition: ()=>boolean
  _true: FElement
  _false: FElement
  parent?: FElement
  index:number

  constructor(condition: ()=>boolean, _true: FElement, _false: FElement){
    this.condition = condition
    this._true = _true
    this._false = _false
  }

  element(parent?: FElement){
    if(parent)
      this.parent = parent
    let result = this.condition()
    if(result)
      return this._true.element()
    else
      return this._false.element()
  }
}

export class Loop<T = any> {
  state: State<Array<T>>
  iteration: (element: T)=>FElement
  index: number

  constructor(state: State, iteration: (element: T)=>FElement){
    this.state = state
    this.iteration = iteration
  }
}
