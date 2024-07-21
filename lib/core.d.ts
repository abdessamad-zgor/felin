import { FlState } from "./state";
import { FlElement, FlHTMLElement } from "./element";
import { FlDocument } from "./document";
import { FlEffect } from "./effect";
import { FlComputed } from "./computed";
import { FlRouter } from "./router";
export interface FlTask<A = {
    [key: string]: any;
}, R = void> {
    priority: number;
    call(args: A): R;
}
type DOMUpdateArgs = {
    state: FlState | FlComputed;
    flDocument: FlDocument;
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
type FlRouteChangeArgs = {
    document: FlDocument;
    router: FlRouter;
    path: string;
};
export declare class FlRouteChange implements FlTask {
    priority: number;
    args: FlRouteChangeArgs;
    constructor(args: FlRouteChangeArgs);
    call(args: FlRouteChangeArgs): void;
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
    router?: {
        [key: string]: FlRouter;
    };
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
    registerActiveRouter(rootSelector: string, router: FlRouter): void;
    registerRouteChange(path: string, rootSelector: string): void;
    getElementRootSelector(element: FlElement, parent?: FlHTMLElement): string | boolean;
}
export declare const Felin: FlRegistry;
export {};
