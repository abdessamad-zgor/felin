import { FlexComputed } from "./computed";
import { FlexEffect } from "./effect";
import { FlexTextNode, createState } from "./flex";
export function text(text, ...args) {
    return new FlexTextNode(text, ...args);
}
export function state(value) {
    return createState(value);
}
export function effect(fn) {
    return new FlexEffect(fn);
}
export function computed(fn, ...states) {
    return new FlexComputed(fn, ...states);
}
