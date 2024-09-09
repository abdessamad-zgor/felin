import { ExtensibleFunction } from "./utils";

const templateError = (strings, values)=>{
  let template = ""
  for(let i=0; i<strings.length; i++){
    let value = i>=values.length? values[i] : ""
    template += `${strings[i]}${value}`
  }
  return template
}

export class Assert extends ExtensibleFunction {
  code: string
  _success: string = "Assertion successful"
  _error: string = "Assertion failed"
  constructor(code?:string, success?: string, error?: string){
    super(
      (condition, ...args)=>{
        if(condition){
          console.info(this._success)
          for(let arg of args) console.info(arg)
        } else {
          console.error(this._error)
          for(let arg of args) console.error(arg)
        }
      }
    )
    this._success = success
    this._error = error
    this.code = code
  }

  static assert(code?: string, success?: string, error?: string){
    return new Assert(code, success, error)
  }

  static expect(value: any){
    let expectation = new Expectation(value)
    let assertion = new Assert()
    expectation.assertion = assertion

    return expectation
  }

  static debug(value: any){
    console.trace(value)
  }
}

export class Expectation {
  value: any
  assertion: Assert
  constructor(value: any){
    this.value = value
  }

  toBe<T>(value: T){
    //preforms shallow compairaison on objects and premitive values
    if(typeof value != "number" && !value.toString().includes(".")){
      this.assertion._success = "succesfull match."
      this.assertion.code = "error"

      this.assertion(Object.is(this.value, value)==true, this.value, value)
    } else {
      throw new Error("floating point numbers cannot be matched with toBe consider using toBeCloseTo.")
    }
  }

  toEqual<T>(value: T){
    //preforms deep compairaison on objects and premitive values
    if(typeof value != "number" && !value.toString().includes(".")){
      this.assertion._success = "succesfull match."
      this.assertion.code = "error"
      if(typeof value == "object" && typeof this.value == "object"){
        this.assertion(deepCompare(this.value, value), this.value, value)
      } else if(typeof value != typeof this.value){
        this.assertion.code = "type"
        this.assertion(false, this.value, value)
      } else {
        this.assertion(Object.is(this.value, value)==true, this.value, value)
      }
    } else {
      throw new Error("floating point numbers cannot be matched with toBe consider using toBeCloseTo.")
    }
  }

  toBeCloseTo(value: number, precision: number = 1){
    if(typeof this.value == typeof value){
      this.assertion(value.toFixed(precision) == (this.value as number).toString(), this.value, value)
    }else{
      throw new Error("toBeCloseTo matcher is exclusive to floating point numbers consider using toBe or toEqual.")
    }
  }
}

function deepCompare(value1: {[key: string]: any}, value2: {[key: string]: any}){
  let result = true
  for(let key in value1){
    if(typeof value1[key] == "object" && typeof value2[key] == "object") result = deepCompare(value1[key], value2[key])
    else return false
    if(value1[key] != value2[key]) result = false
    if(!result) return result
  }
  return result
}
