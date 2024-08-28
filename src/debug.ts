import { ExtensibleFunction } from "./utils";

const templateError = (strings, values)=>{
  let template = ""
  for(let i=0; i<strings.length; i++){
    let value = i>=values.length? values[i] : ""
    template += `${strings[i]}${value}`
  }
  return template
}

const FelinErrorMap = new Map([
  ["error", (value?: any)=>templateError`Unexpected error ${value}`]
]);

export class FelinError {
  code: string
  message: string

  constructor(code: string, message?: string, ...args: any[]){
    this.code = code
    if(message){
      this.message = message
    }else{
      if(FelinErrorMap.has(code as string)){
        let templateMessage = FelinErrorMap.get(code as string)
        if(typeof templateMessage == "function"){
          this.message = templateMessage(...args)
        }else{
          this.message = message
        }
      }
    }
  }

  toString(){
    return `FelinError: ${this.code as string}: ${this.message}`
  }

  throw(){
    throw new Error(this.toString())
  }
}

export class Assert extends ExtensibleFunction {
  code: string
  message: string
  constructor(code?: string, message?: string){
    super(
      (condition, ...args)=>{
        if(condition){
          console.log(this.message || "Assertion successful")
        }else{
          let error = new FelinError(this.code)
          for(let arg of args){
            console.log(arg)
          }
          error.throw()
        }
      })
    this.message = message
    this.code = code
  }

  static assert(message: string){
    return new Assert(message)
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
      this.assertion.message = "succesfull match."
      this.assertion.code = "error"

      this.assertion(Object.is(this.value, value)==true, this.value, value)
    } else {
      throw new Error("floating point numbers cannot be matched with toBe consider using toBeCloseTo.")
    }
  }

  toEqual<T>(value: T){
    //preforms deep compairaison on objects and premitive values
    if(typeof value != "number" && !value.toString().includes(".")){
      this.assertion.message = "succesfull match."
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
