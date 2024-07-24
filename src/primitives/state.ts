import { FElement } from "../elements/element";
import { ExtensibleFunction } from "../utils"

type StateTypeMutation<StateType> = StateType extends { [key: string]: any } | any[]
  ? (state: StateType | Partial<StateType>) => StateType | Partial<StateType> :
  (state: StateType) => StateType

interface StateType<T = any> {
  value: T | Partial<T>,
  _id: string,
  parent?: ParentState,
  set: (fnOrState: StateTypeMutation<T> | T, child?: State<T>) => void,
}

type ParentState = {
  state: StateType,
  key: string
}

export class State<T = any> extends ExtensibleFunction implements StateType<T> {
  _id: string;
  value: T | Partial<T>;
  parent?: ParentState;
  elements: FElement[] = []

  constructor(value: T | Partial<T>, parent?: ParentState) {
    super(() => this)
    this.value = value;
    this._id = crypto.randomUUID();
    if (parent) {
      this.parent = parent;
    }
    if (typeof this.value == 'object' && this.value != undefined && this.value != null) {
      let handler: ProxyHandler<State<T>> = {
        get: (target: State<T>, prop: string, reciever) => {
          if (!Object.keys(target.value).includes(prop)) {
            return Reflect.get(target, prop, reciever);
          } else {
            let value = target.value[prop];
            let childState = new State<typeof value>(value, {state: this, key: prop});
            return childState;
          }
        }
      }
      return new Proxy(this, handler);
    }
  }

  set(fnOrState: StateTypeMutation<T> | T, child?: State<T>) {
    let newValue: T | Partial<T> = this.value
    if (child) {
      for (let key of Object.keys(this.value)) {
        if (key == child.parent.key) {
          newValue[key] = child.value
        }
      }
    }
    if (fnOrState) {
      if (typeof fnOrState === "function") {
        //@ts-ignore
        newValue = (fnOrState as StateTypeMutation<T>)(this.value) as T
      } else {
        newValue = fnOrState;
      }
      this.value = newValue
    }
    if (this.parent) {
      this.value = newValue;
      this.parent.state.set(undefined, this)
    } else {
      this.value = newValue
      Felin.registerStateUpdate(this)
    }
  }

  setElement(element: FElement){
    this.elements.push(element)
  }
}
