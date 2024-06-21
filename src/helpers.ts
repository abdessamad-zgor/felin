import { HsTextNode, HsState, HsTask } from "./hsjs";

export function text<T extends any[]>(text: string, ...args: T) {
  return new HsTextNode(text, ...args)
}

export function state<T>(value: T) {
  return new HsState<T>(value)
}
