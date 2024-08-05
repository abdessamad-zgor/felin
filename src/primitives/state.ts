import { FElement } from "../elements/element";
import { ExtensibleFunction, ValueType, determineValueType, getObjectMethods } from "../utils"
import { Computed } from "./computed";

type FStateMutation<T, R> = (state: T) => R

interface FState<T = any> {
  state: StateType<T>,
  _id: string,
  parent?: ParentState,
  set: <R>(fnOrState: FStateMutation<T, R> | T, child?: State<T>) => void,
}


type ParentState = {
  state: FState,
  key: string
}

type FStateType = string | boolean | number | {[key: string]: any} | any[] 
type StateType<T = FStateType> = FNumber | FArray | FObject | FBoolean | FString

export class State<T = FStateType> extends ExtensibleFunction implements FState<T> {
  _id: string;
  state: StateType<T>;
  parent?: ParentState;
  elements: FElement[] = []

  constructor(value: T, parent?: ParentState) {
    super(() => this.state.value )
    this._id = crypto.randomUUID();
    if (parent) {
      this.parent = parent;
    }
    switch (determineValueType(value)) {
      case ValueType.OBJECT:
        this.state = new FObject(value)
        this.state.parent = this
        break;
      case ValueType.ARRAY:
        this.state = new FArray<any>(value as any[])
        this.state.parent = this 
        break;
      case ValueType.NUMBER:
        this.state = new FNumber(value as number)
        this.state.parent = this 
        break;
      case ValueType.STRING:
        this.state = new FString(value as string)
        this.state.parent = this
        break;
      case ValueType.BOOLEAN:
        this.state = new FBoolean(value as boolean)
        this.state.parent = this
        break;
      case ValueType.ANY:
        throw Error("Error: unsupported state data type.")
        break;
      default:
        break;
    }

    if (this.state instanceof FObject) {
      let handler: ProxyHandler<State<T>> = {
        get: (target: State<T>, prop: string, reciever) => {
          if(prop=="set"){
              return this.set
          }else if (getObjectMethods(target.state).includes(prop)) {
            return target.state[prop]
          } else if (!Object.keys(target()).includes(prop)) {
            return Reflect.get(target, prop, reciever);
          } else {
            let value = target.state[prop];
            let childState = new State<typeof value>(value, { state: this, key: prop });
            return childState;
          }
        }
      }
      return new Proxy(this, handler);
    } else if (this.state instanceof FArray) {
      let handler: ProxyHandler<State<T>> = {
        get: (target: State<T>, prop: string, reciever) => {
          if(prop=="set"){
              return this.set
          }else 
          if (getObjectMethods(target.state).includes(prop)) {
            return target.state[prop]
          } else if (!Object.keys(target()).includes(prop)) {
            return Reflect.get(target, prop, reciever);
          } else {
            let value = target.state[prop];
            let childState = new State<typeof value>(value, { state: this, key: prop });
            return childState;
          }
        }
      }
      return new Proxy(this, handler);
    } else if (this.state instanceof FNumber) {
      let handler: ProxyHandler<State<T>> = {
        get: (target: State<T>, prop: string, reciever) => {
          if(prop=="set"){
              return target.set
          }else 
          if (getObjectMethods(target.state).includes(prop)) {
            return target.state[prop]
          } else {
            return Reflect.get(target, prop, reciever)
          }
        }
      }
      return new Proxy(this, handler)
    } 
  }

  set<R>(fnOrState: FStateMutation<FStateType, R> | FStateType, child?: State<T>) {
    let newValue: FStateType = this.state.value as FStateType
    if (child) {
      for (let key of Object.keys(this.state.value)) {
        if (key == child.parent.key) {
          newValue[key] = child.state.value
        }
      }
    }
    if (fnOrState) {
      if (typeof fnOrState === "function") {
        newValue = (fnOrState)(this.state.value) 
      } else {
        newValue = fnOrState;
      }
      this.state.value = newValue
    }
    if (this.parent) {
      this.state.value = newValue;
      this.parent.state.set(undefined, this)
    } else {
      this.state.value = newValue
      Felin.registerStateUpdate(this)
    }
  }

  setElement(element: FElement) {
    this.elements.push(element)
  }
}

export class FArray<T = any> {
  value: Array<T>
  parent?: State<T>
  constructor(value: T[]) {
    this.value = value
    let handler: ProxyHandler<FArray<T>> = {
      get: (target: FArray<T>, prop: string, reciever) => {
        if (getObjectMethods(target).includes(prop)) {
          return target[prop]
        } else if (Object.keys(target.value).includes(prop)) {
          let value = target.value[prop];
          return value;
        } else {
          return Reflect.get(target, prop, reciever);
        }
      }
    }
    return new Proxy(this, handler);
  }

  map() {

  }

  filter() {

  }

  reduce() {

  }

  find() {

  }

  every() {

  }

  some() {

  }
}

export class FBoolean {
  value: boolean
  parent?: State
  constructor(value: boolean) {
    this.value = value
  }
}

export class FObject<T extends { [key: string]: any } = {}> {
  value: T
  parent?: State<T>
  constructor(value: T) {
    this.value = value
    let handler = {
      get: (target, prop, reciever) => {
        if (!Object.keys(target.value).includes(prop)) {
          return Reflect.get(target, prop, reciever)
        } else {
          let value = target.value[prop]
          return value
        }
      }
    }
    return new Proxy(this, handler)
  }

  keys() {
    return new Computed(() => Object.keys(this.value), this.parent)
  }

  values() {
    return new Computed(() => Object.values(this.value), this.parent)
  }

  has(key: string) {
    return new Computed(() => Object.keys(this.value).includes(key), this.parent)
  }
}

export class FString {
  value: string
  parent?: State
  constructor(value: string) {
    this.value = value
  }
}

export class FNumber {
  value: number
  parent?: State
  constructor(value: number) {
    this.value = value
  }

  gt(cmp: number) {
    return new Computed(() => this.value > cmp, this.parent)
  }

  gte(cmp: number) {
    return new Computed(() => this.value >= cmp, this.parent)
  }

  lt(cmp: number) {
    return new Computed(() => this.value < cmp, this.parent)
  }

  lte(cmp: number) {
    return new Computed(() => this.value <= cmp, this.parent)
  }

  eq(cmp: number) {
    return new Computed(() => this.value == cmp, this.parent)
  }
}
