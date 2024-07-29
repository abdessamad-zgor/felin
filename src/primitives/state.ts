import { throws } from "assert";
import { FElement } from "../elements/element";
import { ExtensibleFunction, ValueType, determineValueType, getObjectMethods } from "../utils"
import { Computed } from "./computed";

type FStateMutation<FState> = FState extends { [key: string]: any } | any[]
  ? (state: FState | Partial<FState>) => FState | Partial<FState> :
  (state: FState) => FState

interface FState<T = any> {
  state: StateType<T>,
  _id: string,
  parent?: ParentState,
  set: (fnOrState: FStateMutation<T> | T, child?: State<T>) => void,
}


type ParentState = {
  state: FState,
  key: string
}

type StateType<T = any> = (FNumber | FArray | FObject | FBoolean | FString) & ExtensibleFunction

export class State<T = any> extends ExtensibleFunction implements FState<T> {
  _id: string;
  state: StateType<T>;
  parent?: ParentState;
  elements: FElement[] = []

  constructor(value: T, parent?: ParentState) {
    super(() => (this.state as ExtensibleFunction)())
    this._id = crypto.randomUUID();
    if (parent) {
      this.parent = parent;
    }
    switch (determineValueType(value)) {
      case ValueType.OBJECT:
        this.state = new FObject(value)
        break;
      case ValueType.ARRAY:
        this.state = new FArray<any>(value as any[])
        break;
      case ValueType.NUMBER:
        this.state = new FNumber(value as number)
        break;
      case ValueType.STRING:
        this.state = new FString(value as string)
        break;
      case ValueType.BOOLEAN:
        this.state = new FBoolean(value as boolean)
        break;
      case ValueType.ANY:
        throw Error("Error: unsupported state data type.")
        break;
      default:
        break;
    }

    if(this.state instanceof FObject){
      let handler: ProxyHandler<State<T>> = {
        get: (target: State<T>, prop: string, reciever) => {
          if(getObjectMethods(target.state).includes(prop)){
            return target.state[prop]
          }else if (!Object.keys(target()).includes(prop)) {
            return Reflect.get(target, prop, reciever);
          } else {
            let value = target.state[prop];
            let childState = new State<typeof value>(value, {state: this, key: prop});
            return childState;
          }
        }
      }
      return new Proxy(this, handler);
    } else if(this.state instanceof FArray){
      let handler: ProxyHandler<State<T>> = {
        get: (target: State<T>, prop: string, reciever) => {
          if(getObjectMethods(target.state).includes(prop)){
            return target.state[prop]
          }else if (!Object.keys(target()).includes(prop)) {
            return Reflect.get(target, prop, reciever);
          } else {
            let value = target.state[prop];
            let childState = new State<typeof value>(value, {state: this, key: prop});
            return childState;
          }
        }
      }
      return new Proxy(this, handler);
    } else if(this.state instanceof FNumber){
      let handler: ProxyHandler<State<T>> = {
        get: (target: State<T>, prop: string, reciever)=>{
          if(getObjectMethods(target.state).includes(prop)){
            return target.state[prop]
          }else if (!Object.keys(target()).includes(prop)){
            return Reflect.get(target, prop, reciever)
          }
        }
      }
      return new Proxy(this, handler)
    } 
   // else if(this.state instanceof FString){

   // } else if(this.state instanceof FBoolean){

   // }
  }

  set(fnOrState: FStateMutation<T> | T, child?: State<T>) {
    let newValue: T | Partial<T> = (this.state as ExtensibleFunction)()
    if (child) {
      for (let key of Object.keys((this.state as ExtensibleFunction)())) {
        if (key == child.parent.key) {
          newValue[key] = child.state.value
        }
      }
    }
    if (fnOrState) {
      if (typeof fnOrState === "function") {
        newValue = (fnOrState as FStateMutation<T>)((this.state as ExtensibleFunction)()) as T
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

  setElement(element: FElement){
    this.elements.push(element)
  }
}

export class FArray<T = any> extends ExtensibleFunction{
  value: Array<T>
  parent?: State<T>
  constructor(value: T[]){
    super(()=>this.value)
    this.value = value
    let handler: ProxyHandler<FArray<T>> = {
      get: (target: FArray<T>, prop: string, reciever) => {
        if(getObjectMethods(target).includes(prop)){
          return target[prop]
        }else if (!Object.keys(target()).includes(prop)) {
          return Reflect.get(target, prop, reciever);
        } else {
          let value = target.value[prop];
          return value;
        }
      }
    }
    return new Proxy(this, handler);
  }

  map(){

  }

  filter(){

  }

  reduce(){

  }

  find(){

  }

  every(){

  }

  some(){

  }
}

export class FBoolean extends ExtensibleFunction{
  value: boolean
  constructor(value: boolean){
    super(()=>this.value)
    this.value = value
  }
}

export class FObject<T extends {[key: string]: any} = {}> extends ExtensibleFunction {
  value: T
  parent?: State<T>
  constructor(value: T){
    super(()=>this.value)
    this.value = value
    let handler = {
      get: (target, prop, reciever)=>{
        if(!Object.keys(target.value).includes(prop)){
          return Reflect.get(target, prop, reciever)
        } else {
          let value = target.value[prop]
          return value
        }
      }
    }
    return new Proxy(this, handler)
  }

  keys(){
    return new Computed(()=>Object.keys(this.value), this.parent)
  }

  values(){
    return new Computed(()=>Object.values(this.value), this.parent)
  }

  has(key: string){
    return new Computed(()=>Object.keys(this.value).includes(key), this.parent)
  }
}

export class FString extends ExtensibleFunction {
  value: string
  parent?: State
  constructor(value: string){
    super(()=>this.value)
    this.value = value
  }
}

export class FNumber extends ExtensibleFunction {
  value: number
  parent?: State
  constructor(value: number){
    super(()=>this.value)
    this.value = value
  }

  gt(cmp: number){
    return new Computed(()=>this.value > cmp, this.parent)
  }

  gte(cmp: number){
    return new Computed(()=>this.value >= cmp, this.parent)
  }

  lt(cmp: number){
    return new Computed(()=>this.value < cmp, this.parent)
  }

  lte(cmp: number){
    return new Computed(()=>this.value <= cmp, this.parent)
  }

  eq(cmp: number){
    return new Computed(()=>this.value == cmp, this.parent)
  }
}
