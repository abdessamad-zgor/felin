import { FlComputed } from "./computed";
import { FlEffect } from "./effect";
import { FlTextNode, createState } from "./felin";
export function text(text, ...args) {
    return new FlTextNode(text, ...args);
}
export function state(value) {
    return createState(value);
}
export function effect(fn) {
    return new FlEffect(fn);
}
export function computed(fn, ...states) {
    return new FlComputed(fn, ...states);
}
