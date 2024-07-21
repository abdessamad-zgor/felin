import { FlElement } from "./element"
import { ExtensibleFunction } from "./utils"

export class FlComponent<T extends {[key: string]: any}> extends ExtensibleFunction {
  fn: (props: T)=>FlElement
  props: T
  parentNode?: FlElement

  constructor(fn: (props: T)=>FlElement){
    super((props: T)=>{this.props = props; return this})
    this.fn = fn
  }

  element(parent?: FlElement){
    if(parent){
      this.parentNode = parent
    }
    let element = this.fn(this.props)
    return element.element()
  }
}
