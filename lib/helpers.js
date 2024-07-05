import { HsTextNode, createState } from "./hsjs";
export function text(text, ...args) {
    return new HsTextNode(text, ...args);
}
export function state(value) {
    return createState(value);
}
