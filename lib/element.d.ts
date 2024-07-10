import { Properties as CssStyle } from "csstype";
import { FlEvent } from "./event";
import { FlState } from "./state";
export declare class FlTextNode<T extends any[]> {
    id: string;
    stateCalls: FlState[];
    parentNode: FlHTMLElement;
    text: string;
    constructor(text: string, ...args: T);
    element(parent?: FlHTMLElement): Text;
    getStateCalls(accumulator?: {
        state: FlState;
        element: FlElement;
    }[]): {
        state: FlState;
        element: FlElement;
    }[];
}
export declare class FlHTMLElement {
    id: string;
    name: keyof HTMLElementTagNameMap;
    parentNode: FlHTMLElement;
    stateCalls: FlState[];
    $children: FlElement[];
    $style: CssStyle | null;
    $listeners: Map<keyof HTMLElementEventMap, (event: FlEvent) => void>;
    $classname: string;
    $attributes: {
        [attr: string]: any;
    };
    constructor(name: keyof HTMLElementTagNameMap, children?: (FlElement | string)[] | string, style?: CssStyle);
    style(style: CssStyle): this;
    children(children?: FlElement[]): this | FlElement[];
    getStateCalls(accumulator?: {
        state: FlState;
        element: FlElement;
    }[]): {
        state: FlState;
        element: FlElement;
    }[];
    child(): this;
    listen(eventname: keyof HTMLElementEventMap, callback: (event: FlEvent) => void): this;
    element(parent?: FlHTMLElement): HTMLElement;
    class(classname: string): void;
    attr(name: string, value: any): void;
    attrs(attrs: {
        [attr: string]: any;
    }): void;
}
export declare class FlSVGElement {
    id: string;
    name: keyof SVGElementTagNameMap;
    parentNode: FlSVGElement;
    stateCalls: FlState[];
    $children: FlElement[];
    $style: CssStyle | null;
    $listeners: Map<keyof SVGElementEventMap, (event: FlEvent) => void>;
    $classname: string;
    $attributes: {
        [attr: string]: any;
    };
    constructor(name: keyof SVGElementTagNameMap, children?: FlElement[], style?: CssStyle);
    style(style: CssStyle): this;
    children(children?: FlElement[]): this | FlElement[];
    getStateCalls(accumulator?: {
        state: FlState;
        element: FlElement;
    }[]): {
        state: FlState;
        element: FlElement;
    }[];
    child(): this;
    listen(eventname: keyof SVGElementEventMap, callback: (event: FlEvent) => void): this;
    element(parent?: FlSVGElement): SVGElement;
    class(classname: string): void;
    attr(name: string, value: any): void;
    attrs(attrs: {
        [attr: string]: any;
    }): void;
}
export type FlElement = FlTextNode<any[]> | FlHTMLElement | FlSVGElement;
