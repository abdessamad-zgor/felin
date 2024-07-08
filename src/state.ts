
type StateTypeMutation<StateType> = StateType extends { [key: string]: any } | any[]
  ? <T>(state: StateType | Partial<StateType>) => StateType | Partial<StateType> | T :
  (state: StateType) => StateType

export class ExtensibleFunction extends Function {
  constructor(f) {
    super()
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}

export interface FlexStateClass<T> {
  id: string;
  value: T;
  parent?: FlexState;
  set(fnOrValue: T | StateTypeMutation<T>): void;
  update?: (child: FlexState) => void
}

export type FlexState<T = any> = Function & FlexStateClass<T>

export class FlexString extends ExtensibleFunction implements FlexState<string> {
  id: string
  value: string
  parent?: FlexState

  constructor(value: string, parent?: FlexState) {
    super(() => { return this.value })
    this.id = crypto.randomUUID()
    this.value = value
    this.parent = parent
  }

  set(value: string | Partial<string> | StateTypeMutation<string>) {
    let newValue: string | Partial<string>
    if (typeof value === "function") {
      newValue = (value as StateTypeMutation<string>)(this.value) as string
    } else {
      newValue = value;
    }
    if (newValue != this.value) {
      this.value = newValue
      this.parent?.update(this)
      FLEX.registerStateUpdate(this)
    }
  }
}

export class FlexNumber extends ExtensibleFunction implements FlexState<number> {
  id: string
  value: number
  parent?: FlexState

  constructor(value: number, parent: FlexState) {
    super(() => { return this.value })
    this.id = crypto.randomUUID()
    this.value = value
    this.parent = parent
  }

  set(value: number | Partial<number> | StateTypeMutation<number>) {
    let newValue: number | Partial<number>
    if (typeof value === "function") {
      newValue = (value as StateTypeMutation<number>)(this.value) as number
    } else {
      newValue = value;
    }
    if (newValue != this.value) {
      this.value = newValue
      this.parent?.update(this)
      FLEX.registerStateUpdate(this)
    }
  }

}

export type MappedObject = { [key: string]: any }

export class FlexMappedObject extends ExtensibleFunction implements FlexState<MappedObject> {
  id: string
  value: MappedObject
  parent?: FlexState

  constructor(value: MappedObject, parent?: FlexState) {
    super(() => { return this.value })
    this.id = crypto.randomUUID()
    this.value = value
    this.parent = parent
    for (let key of Object.keys(value)) {
      this[key] = createState(value[key], this)
    }
  }

  set(value: MappedObject | Partial<MappedObject> | StateTypeMutation<MappedObject>) {
    let newValue: MappedObject | Partial<MappedObject>
    if (typeof value === "function") {
      newValue = (value as StateTypeMutation<MappedObject>)(this.value) as MappedObject
    } else {
      newValue = value;
    }
    if (newValue != this.value) {
      this.value = newValue
      this.parent?.update(this)
      FLEX.registerStateUpdate(this)
    }
  }

  update(child: FlexState) {
    for (let key of Object.keys(this)) {
      if (Object.keys(this.value).includes(key) && this[key].id == child.id) {
        this.value[key] = child.value
      }
    }
    if (this.parent) {
      this.parent.update(this)
    }
  }
}

export class FlexArray extends ExtensibleFunction implements FlexState<any[]> {
  id: string
  value: any[]
  parent?: FlexState

  constructor(value: any[], parent?: FlexState) {
    super(() => { return this.value })
    this.id = crypto.randomUUID()
    this.value = value
    this.parent = parent
    for (let key of Object.keys(value)) {
      this[key] = createState(value[key], this)
    }

    Object.defineProperty(this, 'length', {
      get(){
        return this.value.length
      }
    })
  }

  set(value: any[] | Partial<any[]> | StateTypeMutation<any[]>) {
    let newValue: any[] | Partial<any[]>
    if (typeof value === "function") {
      newValue = (value as StateTypeMutation<any[]>)(this.value) as any[]
    } else {
      newValue = value;
    }
    if (newValue != this.value) {
      this.value = newValue
      this.parent?.update(this)
      FLEX.registerStateUpdate(this)
    }
  }

  update(child: FlexState) {
    for (let key of Object.keys(this)) {
      if (Object.keys(this.value).includes(key) && this[key].id == child.id) {
        this.value[key] = child.value
      }
    }
    if (this.parent) {
      this.parent.update(this)
    }
  }

  get length(){
    let length = this.value.length
    return length
  }
}

export function createState(value: any, parent?: FlexState): FlexState {
  let typeofValue = typeof value
  if (typeofValue == "string") {
    return new FlexString(value as string, parent)
  } else if (typeofValue == "number") {
    return new FlexNumber(value, parent)
  } else if (Array.isArray(value)) {
    return new FlexArray(value, parent)
  } else if (typeofValue == "object") {
    return new FlexMappedObject(value, parent)
  }
}
