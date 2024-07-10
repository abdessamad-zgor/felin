import { FlComputed } from "./computed";
import { FlEffect } from "./effect";
import { FlTextNode, FlState } from "./felin";
export declare function text<T extends any[]>(text: string, ...args: T): FlTextNode<T>;
export declare function state<T>(value: T): FlState<any>;
export declare function effect(fn: (...args: FlState[]) => void): FlEffect;
export declare function computed(fn: (...args: FlState[]) => void, ...states: FlState[]): FlComputed;
