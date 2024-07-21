import { FlElement } from "./element";
import { FlState } from "./state";
export declare class FlConditional {
    condition: () => boolean;
    trueBranch: FlElement;
    falseBranch: FlElement;
    parent?: FlElement;
    constructor(condition: () => boolean, trueBranch: FlElement, falseBranch: FlElement);
    element(parent?: FlElement): Text | HTMLElement | SVGElement;
}
export declare class FlLoop<T = any> {
    state: FlState<Array<T>>;
    iteration: (element: T) => FlElement;
    constructor(state: FlState, iteration: (element: T) => FlElement);
}
