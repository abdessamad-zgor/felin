import { ExtensibleFunction } from "./utils";
import { FlState } from "./state";
export declare class FlComputed extends ExtensibleFunction {
    _id: string;
    value: any;
    fn: (...args: FlState[]) => any;
    states: FlState[];
    constructor(fn: (...args: FlState[]) => any, ...states: FlState[]);
}
