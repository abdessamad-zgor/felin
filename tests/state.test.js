import { describe, test, expect } from "vitest";
import {Computed, State} from "felin"

describe('test state module', ()=>{
  test('test number state', ()=>{
    let state = new State(12);
    expect(state()).toEqual(12)
    expect(state.value).toEqual(12)
    state.set(13)
    expect(state()).toEqual(13)
    state.set(s=>s+1)
    expect(state()).toEqual(14)
    let isEqual14 = state.eq(14)
    expect(isEqual14 instanceof Computed).toEqual(true)
    expect(isEqual14()).toEqual(true)
    expect(state.gte(14)()).toEqual(true)
    expect(state.gt(13)()).toEqual(true)
    expect(state.gt(15)()).toEqual(false)
    expect(state.lt(13)()).toEqual(true)
    expect(state.lt(15)()).toEqual(true)
  })
  
  test('test array state', ()=>{
    let state = new State([12, 14, 15])
    expect(state.value).toEqual([12, 14, 15])
    expect(state()).toEqual([12, 14, 15])
    state.set(s=>[...s, 12])
    expect(state()).toEqual([12, 14, 15, 12])

    expect(state.length()()).toEqual(4)
  });

  test('test array state methods', ()=>{
    let state = new State([1, 2, 3, 4, 5])
    let arrLength = state.length()
    expect(arrLength).toEqual(5)
  });

  test('test object state', ()=>{
    let state = new State({a: 12, b:334, c: "c prop", d: true})
    expect(state.value).toBe({a: 12, b:334, c: "c prop", d: true})
    expect(state.a()).toEqual(12)
    expect(state.b()).toEqual(334)
  });

  test('test string')
})
