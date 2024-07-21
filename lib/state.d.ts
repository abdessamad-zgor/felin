import { ExtensibleFunction } from "./utils";
type StateTypeMutation<StateType> = StateType extends {
    [key: string]: any;
} | any[] ? (state: StateType | Partial<StateType>) => StateType | Partial<StateType> : (state: StateType) => StateType;
interface FlStateType<T = any> {
    value: T | Partial<T>;
    _id: string;
    parent?: ParentState;
    set: (fnOrState: StateTypeMutation<T> | T, child?: FlState<T>) => void;
}
type ParentState = {
    state: FlStateType;
    key: string;
};
export declare class FlState<T = any> extends ExtensibleFunction implements FlStateType<T> {
    _id: string;
    value: T | Partial<T>;
    parent?: ParentState;
    constructor(value: T | Partial<T>, parent?: ParentState);
    set(fnOrState: StateTypeMutation<T> | T, child?: FlState<T>): void;
}
export {};
