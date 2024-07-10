type StateTypeMutation<StateType> = StateType extends {
    [key: string]: any;
} | any[] ? <T>(state: StateType | Partial<StateType>) => StateType | Partial<StateType> | T : (state: StateType) => StateType;
export declare class ExtensibleFunction extends Function {
    constructor(f: any);
}
export interface FlStateClass<T> {
    id: string;
    value: T;
    parent?: FlState;
    set(fnOrValue: T | StateTypeMutation<T>): void;
    update?: (child: FlState) => void;
}
export type FlState<T = any> = Function & FlStateClass<T>;
export declare class FlString extends ExtensibleFunction implements FlState<string> {
    id: string;
    value: string;
    parent?: FlState;
    constructor(value: string, parent?: FlState);
    set(value: string | Partial<string> | StateTypeMutation<string>): void;
}
export declare class FlNumber extends ExtensibleFunction implements FlState<number> {
    id: string;
    value: number;
    parent?: FlState;
    constructor(value: number, parent: FlState);
    set(value: number | Partial<number> | StateTypeMutation<number>): void;
}
export type MappedObject = {
    [key: string]: any;
};
export declare class FlMappedObject extends ExtensibleFunction implements FlState<MappedObject> {
    id: string;
    value: MappedObject;
    parent?: FlState;
    constructor(value: MappedObject, parent?: FlState);
    set(value: MappedObject | Partial<MappedObject> | StateTypeMutation<MappedObject>): void;
    update(child: FlState): void;
}
export declare class FlArray extends ExtensibleFunction implements FlState<any[]> {
    id: string;
    value: any[];
    parent?: FlState;
    constructor(value: any[], parent?: FlState);
    set(value: any[] | Partial<any[]> | StateTypeMutation<any[]>): void;
    update(child: FlState): void;
    get length(): number;
}
export declare function createState(value: any, parent?: FlState): FlState;
export {};
