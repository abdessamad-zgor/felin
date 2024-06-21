
type StateTypeMutation<StateType> = <T>(state: StateType | Partial<StateType>) => StateType | Partial<StateType> | T

class ExtensibleFunction extends Function {
  constructor(f) {
    super()
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}

export class HsState<StateType = unknown> extends ExtensibleFunction {
  id: string
  value: StateType | Partial<StateType>

  constructor(value: StateType) {
    super(() => { return this.value })
    this.id = crypto.randomUUID()
    this.value = value
  }

  set(value: StateType | Partial<StateType> | StateTypeMutation<StateType>) {
    let newValue: StateType | Partial<StateType>
    if (typeof value === "function") {
      newValue = (value as StateTypeMutation<StateType>)(this.value) as StateType
    } else {
      newValue = value;
    }
    console.log(newValue, this.value)
    if (newValue != this.value) {
      this.value = newValue
      HSJS.registerStateUpdate(this)
    }
  }
}

