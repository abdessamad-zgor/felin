import { ExtensibleFunction, FlState } from "./state";
export declare class FlEffect extends ExtensibleFunction {
    id: string;
    effect: (...args: FlState[]) => void;
    dependants: FlState[];
    constructor(fn: (...args: FlState[]) => void);
}
