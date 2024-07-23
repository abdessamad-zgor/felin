import { FElement } from "./element"
import { ExtensibleFunction } from "../utils"

export class Component<T extends { [key: string]: any }> extends ExtensibleFunction {
  fn: (props: T) => FElement
  props: T
  parentNode?: FElement

  constructor(fn: (props: T) => FElement) {
    super((props: T) => { this.props = props; return this })
    this.fn = fn
  }

  element(parent?: FElement) {
    if (parent) {
      this.parentNode = parent
    }
    let element = this.fn(this.props)
    return element.element()
  }
}
