import { Properties } from "csstype";
declare class ExtensibleFunction extends Function {
    constructor(f: any);
}
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
declare class FlState<T = any> extends ExtensibleFunction implements FlStateType<T> {
    _id: string;
    value: T | Partial<T>;
    parent?: ParentState;
    constructor(value: T | Partial<T>, parent?: ParentState);
    set(fnOrState: StateTypeMutation<T> | T, child?: FlState<T>): void;
}
type FlEvent = Event | CustomEvent;
type FlComponent<T = {}> = (props: T) => FlElement;
declare class FlRouter {
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
declare class FlRoute {
    path: string;
    index?: number;
    component: FlComponent;
    parentRoute?: FlRoute;
    parentNode?: FlHTMLElement;
    children?: FlRoute[];
    constructor(path: string, component: FlComponent, parent?: FlRoute);
}
declare class FlTextNode<T extends any[]> {
    id: string;
    stateCalls: FlState[];
    parentNode?: FlHTMLElement | FlSVGElement;
    text: string;
    constructor(text: string, ...args: T);
    element(parent?: FlHTMLElement): Text;
    getStateCalls(accumulator?: {
        state: FlState;
        element: FlElement;
    }[]): {
        state: FlState;
        element: FlElement;
    }[];
    buildElementTree(parent?: FlHTMLElement | FlSVGElement): void;
}
declare class FlHTMLElement {
    id: string;
    name: keyof HTMLElementTagNameMap;
    parentNode: FlHTMLElement | FlSVGElement;
    stateCalls: FlState[];
    $children: FlElement[];
    $style: Properties | null;
    $listeners: Map<keyof HTMLElementEventMap, (event: FlEvent) => void>;
    $classname: string;
    $attributes: {
        [attr: string]: any;
    };
    router: FlRouter | null;
    routes: FlRoute[] | null;
    constructor(name: keyof HTMLElementTagNameMap, children?: (FlElement | string)[] | string, style?: Properties);
    style(style: Properties): this;
    children(children?: FlElement[]): this | FlElement[];
    getStateCalls(accumulator?: {
        state: FlState;
        element: FlElement;
    }[]): {
        state: FlState;
        element: FlElement;
    }[];
    child(): this;
    listen(eventname: keyof HTMLElementEventMap, callback: (event: FlEvent) => void): this;
    element(): HTMLElement;
    buildElementTree(parent?: FlHTMLElement | FlSVGElement): void;
    class(classname: string): void;
    attr(name: string, value: any): void;
    attrs(attrs: {
        [attr: string]: any;
    }): void;
    hasRouter(): FlRouter | undefined;
}
declare class FlSVGElement {
    id: string;
    name: keyof SVGElementTagNameMap;
    parentNode: FlSVGElement | FlHTMLElement;
    stateCalls: FlState[];
    $children: FlElement[];
    $style: Properties | null;
    $listeners: Map<keyof SVGElementEventMap, (event: FlEvent) => void>;
    $classname: string;
    $attributes: {
        [attr: string]: any;
    };
    constructor(name: keyof SVGElementTagNameMap, children?: FlElement[], style?: Properties);
    style(style: Properties): this;
    children(children?: FlElement[]): this | FlElement[];
    getStateCalls(accumulator?: {
        state: FlState;
        element: FlElement;
    }[]): {
        state: FlState;
        element: FlElement;
    }[];
    child(): this;
    listen(eventname: keyof SVGElementEventMap, callback: (event: FlEvent) => void): this;
    element(parent?: FlSVGElement): SVGElement;
    class(classname: string): void;
    attr(name: string, value: any): void;
    attrs(attrs: {
        [attr: string]: any;
    }): void;
    buildElementTree(parent?: FlHTMLElement | FlSVGElement): void;
}
type FlElement = FlTextNode<any[]> | FlHTMLElement | FlSVGElement;
export class FlDocument {
    window: Window;
    document: Document;
    rootSelector: string;
    rootElement: FlHTMLElement;
    router?: FlRouter;
    constructor();
    render(selector: string, element: FlHTMLElement): void;
    selector(element: FlHTMLElement): string;
    rerenderElement(element: FlHTMLElement): void;
}
declare class FlEffect extends ExtensibleFunction {
    _id: string;
    effect: (...args: FlState<any>[]) => void;
    dependants: FlState[];
    constructor(fn: (...args: FlState[]) => void);
}
declare class FlComputed extends ExtensibleFunction {
    _id: string;
    value: any;
    fn: (...args: FlState[]) => any;
    states: FlState[];
    constructor(fn: (...args: FlState[]) => any, ...states: FlState[]);
}
export const a: (...children: FlElement[]) => FlElement;
export const abbr: (...children: FlElement[]) => FlElement;
export const address: (...children: FlElement[]) => FlElement;
export const area: (...children: FlElement[]) => FlElement;
export const article: (...children: FlElement[]) => FlElement;
export const aside: (...children: FlElement[]) => FlElement;
export const audio: (...children: FlElement[]) => FlElement;
export const b: (...children: FlElement[]) => FlElement;
export const base: (...children: FlElement[]) => FlElement;
export const bdi: (...children: FlElement[]) => FlElement;
export const bdo: (...children: FlElement[]) => FlElement;
export const blockquote: (...children: FlElement[]) => FlElement;
export const body: (...children: FlElement[]) => FlElement;
export const br: (...children: FlElement[]) => FlElement;
export const button: (...children: FlElement[]) => FlElement;
export const canvas: (...children: FlElement[]) => FlElement;
export const caption: (...children: FlElement[]) => FlElement;
export const cite: (...children: FlElement[]) => FlElement;
export const code: (...children: FlElement[]) => FlElement;
export const col: (...children: FlElement[]) => FlElement;
export const colgroup: (...children: FlElement[]) => FlElement;
export const data: (...children: FlElement[]) => FlElement;
export const datalist: (...children: FlElement[]) => FlElement;
export const dd: (...children: FlElement[]) => FlElement;
export const del: (...children: FlElement[]) => FlElement;
export const details: (...children: FlElement[]) => FlElement;
export const dfn: (...children: FlElement[]) => FlElement;
export const dialog: (...children: FlElement[]) => FlElement;
export const div: (...children: FlElement[]) => FlElement;
export const dl: (...children: FlElement[]) => FlElement;
export const dt: (...children: FlElement[]) => FlElement;
export const em: (...children: FlElement[]) => FlElement;
export const embed: (...children: FlElement[]) => FlElement;
export const fieldset: (...children: FlElement[]) => FlElement;
export const figcaption: (...children: FlElement[]) => FlElement;
export const figure: (...children: FlElement[]) => FlElement;
export const footer: (...children: FlElement[]) => FlElement;
export const form: (...children: FlElement[]) => FlElement;
export const h1: (...children: FlElement[]) => FlElement;
export const h2: (...children: FlElement[]) => FlElement;
export const h3: (...children: FlElement[]) => FlElement;
export const h4: (...children: FlElement[]) => FlElement;
export const h5: (...children: FlElement[]) => FlElement;
export const h6: (...children: FlElement[]) => FlElement;
export const head: (...children: FlElement[]) => FlElement;
export const header: (...children: FlElement[]) => FlElement;
export const hgroup: (...children: FlElement[]) => FlElement;
export const hr: (...children: FlElement[]) => FlElement;
export const html: (...children: FlElement[]) => FlElement;
export const i: (...children: FlElement[]) => FlElement;
export const iframe: (...children: FlElement[]) => FlElement;
export const img: (...children: FlElement[]) => FlElement;
export const input: (...children: FlElement[]) => FlElement;
export const ins: (...children: FlElement[]) => FlElement;
export const kbd: (...children: FlElement[]) => FlElement;
export const label: (...children: FlElement[]) => FlElement;
export const legend: (...children: FlElement[]) => FlElement;
export const li: (...children: FlElement[]) => FlElement;
export const link: (...children: FlElement[]) => FlElement;
export const main: (...children: FlElement[]) => FlElement;
export const map: (...children: FlElement[]) => FlElement;
export const mark: (...children: FlElement[]) => FlElement;
export const menu: (...children: FlElement[]) => FlElement;
export const meta: (...children: FlElement[]) => FlElement;
export const meter: (...children: FlElement[]) => FlElement;
export const nav: (...children: FlElement[]) => FlElement;
export const noscript: (...children: FlElement[]) => FlElement;
export const object: (...children: FlElement[]) => FlElement;
export const ol: (...children: FlElement[]) => FlElement;
export const optgroup: (...children: FlElement[]) => FlElement;
export const option: (...children: FlElement[]) => FlElement;
export const output: (...children: FlElement[]) => FlElement;
export const p: (...children: FlElement[]) => FlElement;
export const picture: (...children: FlElement[]) => FlElement;
export const pre: (...children: FlElement[]) => FlElement;
export const progress: (...children: FlElement[]) => FlElement;
export const q: (...children: FlElement[]) => FlElement;
export const rp: (...children: FlElement[]) => FlElement;
export const rt: (...children: FlElement[]) => FlElement;
export const ruby: (...children: FlElement[]) => FlElement;
export const s: (...children: FlElement[]) => FlElement;
export const samp: (...children: FlElement[]) => FlElement;
export const search: (...children: FlElement[]) => FlElement;
export const section: (...children: FlElement[]) => FlElement;
export const select: (...children: FlElement[]) => FlElement;
export const slot: (...children: FlElement[]) => FlElement;
export const small: (...children: FlElement[]) => FlElement;
export const source: (...children: FlElement[]) => FlElement;
export const span: (...children: FlElement[]) => FlElement;
export const strong: (...children: FlElement[]) => FlElement;
export const sub: (...children: FlElement[]) => FlElement;
export const summary: (...children: FlElement[]) => FlElement;
export const sup: (...children: FlElement[]) => FlElement;
export const table: (...children: FlElement[]) => FlElement;
export const tbody: (...children: FlElement[]) => FlElement;
export const td: (...children: FlElement[]) => FlElement;
export const template: (...children: FlElement[]) => FlElement;
export const textarea: (...children: FlElement[]) => FlElement;
export const tfoot: (...children: FlElement[]) => FlElement;
export const th: (...children: FlElement[]) => FlElement;
export const thead: (...children: FlElement[]) => FlElement;
export const time: (...children: FlElement[]) => FlElement;
export const title: (...children: FlElement[]) => FlElement;
export const tr: (...children: FlElement[]) => FlElement;
export const track: (...children: FlElement[]) => FlElement;
export const u: (...children: FlElement[]) => FlElement;
export const ul: (...children: FlElement[]) => FlElement;
export const _var: (...children: FlElement[]) => FlElement;
export const video: (...children: FlElement[]) => FlElement;
export const wbr: (...children: FlElement[]) => FlElement;
export const _a: (...children: FlElement[]) => FlElement;
export const animate: (...children: FlElement[]) => FlElement;
export const animateMotion: (...children: FlElement[]) => FlElement;
export const animateTransform: (...children: FlElement[]) => FlElement;
export const circle: (...children: FlElement[]) => FlElement;
export const clipPath: (...children: FlElement[]) => FlElement;
export const defs: (...children: FlElement[]) => FlElement;
export const desc: (...children: FlElement[]) => FlElement;
export const ellipse: (...children: FlElement[]) => FlElement;
export const feBlend: (...children: FlElement[]) => FlElement;
export const feColorMatrix: (...children: FlElement[]) => FlElement;
export const feComponentTransfer: (...children: FlElement[]) => FlElement;
export const feComposite: (...children: FlElement[]) => FlElement;
export const feConvolveMatrix: (...children: FlElement[]) => FlElement;
export const feDiffuseLighting: (...children: FlElement[]) => FlElement;
export const feDisplacementMap: (...children: FlElement[]) => FlElement;
export const feDistantLight: (...children: FlElement[]) => FlElement;
export const feDropShadow: (...children: FlElement[]) => FlElement;
export const feFlood: (...children: FlElement[]) => FlElement;
export const feFuncA: (...children: FlElement[]) => FlElement;
export const feFuncB: (...children: FlElement[]) => FlElement;
export const feFuncG: (...children: FlElement[]) => FlElement;
export const feFuncR: (...children: FlElement[]) => FlElement;
export const feGaussianBlur: (...children: FlElement[]) => FlElement;
export const feImage: (...children: FlElement[]) => FlElement;
export const feMerge: (...children: FlElement[]) => FlElement;
export const feMergeNode: (...children: FlElement[]) => FlElement;
export const feMorphology: (...children: FlElement[]) => FlElement;
export const feOffset: (...children: FlElement[]) => FlElement;
export const fePointLight: (...children: FlElement[]) => FlElement;
export const feSpecularLighting: (...children: FlElement[]) => FlElement;
export const feSpotLight: (...children: FlElement[]) => FlElement;
export const feTile: (...children: FlElement[]) => FlElement;
export const feTurbulence: (...children: FlElement[]) => FlElement;
export const filter: (...children: FlElement[]) => FlElement;
export const foreignObject: (...children: FlElement[]) => FlElement;
export const g: (...children: FlElement[]) => FlElement;
export const image: (...children: FlElement[]) => FlElement;
export const line: (...children: FlElement[]) => FlElement;
export const linearGradient: (...children: FlElement[]) => FlElement;
export const marker: (...children: FlElement[]) => FlElement;
export const mask: (...children: FlElement[]) => FlElement;
export const metadata: (...children: FlElement[]) => FlElement;
export const mpath: (...children: FlElement[]) => FlElement;
export const path: (...children: FlElement[]) => FlElement;
export const pattern: (...children: FlElement[]) => FlElement;
export const polygon: (...children: FlElement[]) => FlElement;
export const polyline: (...children: FlElement[]) => FlElement;
export const radialGradient: (...children: FlElement[]) => FlElement;
export const rect: (...children: FlElement[]) => FlElement;
export const set: (...children: FlElement[]) => FlElement;
export const stop: (...children: FlElement[]) => FlElement;
export const svg: (...children: FlElement[]) => FlElement;
export const _switch: (...children: FlElement[]) => FlElement;
export const symbol: (...children: FlElement[]) => FlElement;
export const _text: (...children: FlElement[]) => FlElement;
export const textPath: (...children: FlElement[]) => FlElement;
export const _title: (...children: FlElement[]) => FlElement;
export const tspan: (...children: FlElement[]) => FlElement;
export const use: (...children: FlElement[]) => FlElement;
export const view: (...children: FlElement[]) => FlElement;
declare class FlConditional {
    condition: () => boolean;
    trueBranch: FlElement;
    falseBranch: FlElement;
    parent?: FlElement;
    constructor(condition: () => boolean, trueBranch: FlElement, falseBranch: FlElement);
    element(parent?: FlElement): Text | HTMLElement | SVGElement;
}
declare class FlLoop<T = any> {
    state: FlState<Array<T>>;
    iteration: (element: T) => FlElement;
    constructor(state: FlState, iteration: (element: T) => FlElement);
}
export function $text<T extends any[]>(text: string, ...args: T): FlTextNode<T>;
export function $state<T>(value: T): FlState<T>;
export function $effect(fn: (...args: FlState[]) => void): FlEffect;
export function $computed(fn: (...args: FlState[]) => void, ...states: FlState[]): FlComputed;
export function $router(...routes: FlRoute[]): FlRouter;
export function $route(path: string, element: FlComponent<{}>): FlRoute;
export function $params(): any;
export function $link(path: string, element: FlElement | string): FlHTMLElement;
export function $if(condition: () => boolean, trueBranch: FlElement, falseBranch: FlElement): FlConditional;
export function $for<T>(state: FlState<Array<T>>, iteration: (element: T) => FlElement): FlLoop<T>;

//# sourceMappingURL=felin.d.ts.map
