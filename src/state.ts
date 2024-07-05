
type StateTypeMutation<StateType> = StateType extends { [key: string]: any } | any[]
  ? <T>(state: StateType | Partial<StateType>) => StateType | Partial<StateType> | T :
  (state: StateType) => StateType

class ExtensibleFunction extends Function {
  constructor(f) {
    super()
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}

export interface HsStateClass<T> {
  id: string;
  value: T;
  parent?: HsState;
  set(fnOrValue: T | StateTypeMutation<T>): void;
  update?: (child: HsState) => void
}

export type HsState<T = any> = Function & HsStateClass<T>

export class HsString extends ExtensibleFunction implements HsState<string> {
  id: string
  value: string
  parent?: HsState

  constructor(value: string, parent?: HsState) {
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
      HSJS.registerStateUpdate(this)
    }
  }
}

export class HsNumber extends ExtensibleFunction implements HsState<number> {
  id: string
  value: number
  parent?: HsState

  constructor(value: number, parent: HsState) {
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
      HSJS.registerStateUpdate(this)
    }
  }

}

export type MappedObject = { [key: string]: any }

export class HsMappedObject extends ExtensibleFunction implements HsState<MappedObject> {
  id: string
  value: MappedObject
  parent?: HsState

  constructor(value: MappedObject, parent?: HsState) {
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
      HSJS.registerStateUpdate(this)
    }
  }

  update(child: HsState) {
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

export class HsArray extends ExtensibleFunction implements HsState<any[]> {
  id: string
  value: any[]
  parent?: HsState

  constructor(value: any[], parent?: HsState) {
    super(() => { return this.value })
    this.id = crypto.randomUUID()
    this.value = value
    this.parent = parent
    for (let key of Object.keys(value)) {
      this[key] = createState(value[key], this)
    }
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
      HSJS.registerStateUpdate(this)
    }
  }

  update(child: HsState) {
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
    return this.value.length
  }
}

export function createState(value: any, parent?: HsState): HsState {
  let typeofValue = typeof value
  if (typeofValue == "string") {
    return new HsString(value as string, parent)
  } else if (typeofValue == "number") {
    return new HsNumber(value, parent)
  } else if (Array.isArray(value)) {
    return new HsArray(value, parent)
  } else if (typeofValue == "object") {
    return new HsMappedObject(value, parent)
  }
}
