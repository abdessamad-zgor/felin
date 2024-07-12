import { ExtensibleFunction } from "./utils"

type StateTypeMutation<StateType> = StateType extends { [key: string]: any } | any[]
  ? (state: StateType | Partial<StateType>) => StateType | Partial<StateType>  :
  (state: StateType) => StateType

interface FlStateType<T=any> {
  value: T | Partial<T>,
  id: string,
  parent?: FlStateType,
  set: (fnOrState: StateTypeMutation<T> | T) => void,
}

export class FlState<T = any> extends ExtensibleFunction implements FlStateType<T> {
  id: string;
  value: T| Partial<T>;
  parent?: FlStateType<any>;

  constructor(value: T| Partial<T>, parent?: FlStateType<any>) {
    super(() => this.value)
    this.value = value;
    this.id = crypto.randomUUID();
    if (parent) {
      this.parent = parent;
    }
    if (typeof this.value == 'object') {
      let handler: ProxyHandler<FlState<T>>= {
        get: (target: FlState<T>, prop: string, reciever) => {
          if (Object.keys(this.value).includes(prop)) {
            let value = this.value[prop];
            if (typeof value == 'object') {
              return new Proxy(new FlState<typeof value>(value, this), handler);
            } else {
              return new FlState<typeof value>(value, this)
            }
          } else {
            return Reflect.get(target, prop, reciever);
          }
        },
        set: (target: FlState<T>, prop: string, value) => {
          if (Object.keys(this.value).includes(prop)) {
            target.set((s=>({...s, [prop]: value})) as StateTypeMutation<T>);
          } else if(prop=="value"){
            return Reflect.set(target, prop, value);
          } 
        }
      }
      return new Proxy(this, handler);
    } 
  }

  set(fnOrState?: StateTypeMutation<T> | T, child?: FlState<T>) {
    if(child){
      for(let key of Object.keys(this.value)){
        if(this[key].id == child.id){
          this.value[key] = child.value
        }
      }
    }
    let newValue: T | Partial<T>
    if (typeof fnOrState=== "function") {
      //@ts-ignore
      newValue = (fnOrState as StateTypeMutation<T>)(this.value) as T
    } else {
      newValue = fnOrState;
    }
    if (newValue != this.value) {
      this.value = newValue
      if(this.parent){
        this.parent.set(child=child)
      }else{
        Felin.registerStateUpdate(this)
      }
    }
  }
}
