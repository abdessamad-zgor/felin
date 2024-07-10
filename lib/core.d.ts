import { FlDocument, FlElement, FlState } from "./felin";
import { FlEffect } from "./effect";
import { FlComputed } from "./computed";
export interface FlTask<A = {
    [key: string]: any;
}, R = void> {
    priority: number;
    call(args: A): R;
}
type DOMUpdateArgs = {
    state: FlState | FlComputed;
    hsDocument: FlDocument;
    element: FlElement;
};
export declare class FlDOMUpdate implements FlTask<DOMUpdateArgs, void> {
    priority: number;
    args: DOMUpdateArgs;
    constructor(args: DOMUpdateArgs);
    call(args: DOMUpdateArgs): void;
}
export declare class FlComputedRefresh implements FlTask {
    priority: number;
    args: FlComputed;
    constructor(args: FlComputed);
    call(args: any): void;
}
type FlEffectArgs = {
    fn: (...args: FlState[]) => void;
    dependents: FlState[];
};
export declare class FlEffectCall implements FlTask {
    priority: number;
    args: FlEffectArgs;
    constructor(args: FlEffectArgs);
    call(args: FlEffectArgs): void;
}
export declare class FlStack {
    tasks: FlTask[];
    constructor();
    pop(): FlTask;
    push(task: FlTask): void;
    empty(): boolean;
}
export declare class FlRuntime {
    stack: FlStack;
    running: boolean;
    constructor();
    run(): void;
    pushTask(task: FlTask): void;
}
export declare class FlRegistry {
    runtime: FlRuntime;
    documentStates: {
        [key: string]: {
            state: FlState;
            element: FlElement;
        }[];
    };
    documentRootsMap: {
        [key: string]: FlDocument;
    };
    effects: FlEffect[];
    computed: FlComputed[];
    constructor();
    register(task: FlTask): void;
    registerStateCalls(root: string, stateCalls: {
        state: FlState;
        element: FlElement;
    }[]): void;
    registerStateUpdate(state: FlState): void;
    registerFlDocumentRoot(root: string, document: FlDocument): void;
    run(): void;
    registerEffect(effect: FlEffect): void;
    registerComputedState(state: FlComputed): void;
}
export declare const Fl: FlRegistry;
export {};
