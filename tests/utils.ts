export class TestRunner {
  suites: TestSuite[]

  constructor(){

  }
}

export class TestSuite {
  description: string
  tests: Test[]

  constructor(){}
}

export class Test {
  suite: TestSuite
  description: string
  routine: ()=>void

  constructor(){}
}

export class Expectation<T> {
  _value: T
  test: Test
  context: TestRunner
  constructor(value: T){
    this._value = value
  }

  toBe(value){

  }

  toEqual(value){

  }

  toDeepEqual(value){

  }
}
