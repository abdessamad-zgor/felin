import { ExtensibleFunction, FlState } from "./state";
export declare class FlComputed extends ExtensibleFunction {
    id: string;
    value: any;
    fn: (...args: FlState[]) => any;
    states: FlState[];
    constructor(fn: (...args: FlState[]) => any, ...states: FlState[]);
}
