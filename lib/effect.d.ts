import { ExtensibleFunction } from "./utils";
import { FlState } from "./state";
export declare class FlEffect extends ExtensibleFunction {
    _id: string;
    effect: (...args: FlState<any>[]) => void;
    dependants: FlState[];
    constructor(fn: (...args: FlState[]) => void);
}
