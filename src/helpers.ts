import { HsTextNode, createState, HsTask } from "./hsjs";

export function text<T extends any[]>(text: string, ...args: T) {
  return new HsTextNode(text, ...args)
}

export function state<T>(value: T) {
  return createState(value)
}
