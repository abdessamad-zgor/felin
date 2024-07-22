import { ExtensibleFunction } from "./utils"

type StateTypeMutation<StateType> = StateType extends { [key: string]: any } | any[]
  ? (state: StateType | Partial<StateType>) => StateType | Partial<StateType> :
  (state: StateType) => StateType

interface FlStateType<T = any> {
  value: T | Partial<T>,
  _id: string,
  parent?: ParentState,
  set: (fnOrState: StateTypeMutation<T> | T, child?: FlState<T>) => void,
}

type ParentState = {
  state: FlStateType,
  key: string
}

export class FlState<T = any> extends ExtensibleFunction implements FlStateType<T> {
  _id: string;
  value: T | Partial<T>;
  parent?: ParentState;

  constructor(value: T | Partial<T>, parent?: ParentState) {
    super(() => this.value)
    this.value = value;
    this._id = crypto.randomUUID();
    if (parent) {
      this.parent = parent;
    }
    if (typeof this.value == 'object' && this.value != undefined && this.value != null) {
      let handler: ProxyHandler<FlState<T>> = {
        get: (target: FlState<T>, prop: string, reciever) => {
          if (!Object.keys(target.value).includes(prop)) {
            return Reflect.get(target, prop, reciever);
          } else {
            let value = target.value[prop];
            let childState = new FlState<typeof value>(value, {state: this, key: prop});
            return childState;
          }
        }
      }
      return new Proxy(this, handler);
    }
  }

  set(fnOrState: StateTypeMutation<T> | T, child?: FlState<T>) {
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
}
