import { FlElement, FlHTMLElement } from "./element";
export type FlComponent<T = {}> = (props: T) => FlElement;
export type FlRouterTreeLocation = {
    router: FlRouter;
    location: FlHTMLElement;
};
export declare class FlRouter {
    routes: FlRoute[];
    index?: number;
    active: FlRoute[];
    previous: FlRoute[];
    history: FlRoute[];
    parentNode?: FlHTMLElement;
    params: {
        [key: string]: string | number;
    };
    constructor(...routes: FlRoute[]);
    matchRoute(path: string): void;
    buildRouterTree(): FlRouter;
}
export declare class FlRoute {
    path: string;
    index?: number;
    component: FlComponent;
    parentRoute?: FlRoute;
    parentNode?: FlHTMLElement;
    children?: FlRoute[];
    constructor(path: string, component: FlComponent, parent?: FlRoute);
}
