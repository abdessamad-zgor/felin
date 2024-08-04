import { Properties } from "csstype";
declare class ExtensibleFunction extends Function {
    constructor(f: any);
}
type FStateMutation<FState> = FState extends {
    [key: string]: any;
} | any[] ? (state: FState | Partial<FState>) => FState | Partial<FState> : (state: FState) => FState;
interface FState<T = any> {
    state: StateType<T>;
    _id: string;
    parent?: ParentState;
    set: (fnOrState: FStateMutation<T> | T, child?: State<T>) => void;
}
type ParentState = {
    state: FState;
    key: string;
};
type StateType<T = any> = (FNumber | FArray | FObject | FBoolean | FString) & ExtensibleFunction;
export class State<T = any> extends ExtensibleFunction implements FState<T> {
    _id: string;
    state: StateType<T>;
    parent?: ParentState;
    elements: FElement[];
    constructor(value: T, parent?: ParentState);
    set(fnOrState: FStateMutation<T> | T, child?: State<T>): void;
    setElement(element: FElement): void;
}
export class FArray<T = any> extends ExtensibleFunction {
    value: Array<T>;
    parent?: State<T>;
    constructor(value: T[]);
    map(): void;
    filter(): void;
    reduce(): void;
    find(): void;
    every(): void;
    some(): void;
}
export class FBoolean extends ExtensibleFunction {
    value: boolean;
    constructor(value: boolean);
}
export class FObject<T extends {
    [key: string]: any;
} = {}> extends ExtensibleFunction {
    value: T;
    parent?: State<T>;
    constructor(value: T);
    keys(): Computed;
    values(): Computed;
    has(key: string): Computed;
}
export class FString extends ExtensibleFunction {
    value: string;
    parent?: State;
    constructor(value: string);
}
export class FNumber extends ExtensibleFunction {
    value: number;
    parent?: State;
    constructor(value: number);
    gt(cmp: number): Computed;
    gte(cmp: number): Computed;
    lt(cmp: number): Computed;
    lte(cmp: number): Computed;
    eq(cmp: number): Computed;
}
export type RouterTreeLocation = {
    router: Router;
    location: FHTMLElement;
};
export class Router {
    routes: Route[];
    index?: number;
    active: Route[];
    previous: Route[];
    history: Route[];
    parent?: FHTMLElement;
    params: {
        [key: string]: string | number;
    };
    constructor(...routes: Route[]);
    matchRoute(path: string): void;
    buildRouterTree(): Router;
}
export class Route {
    path: string;
    index?: number;
    element: FElement;
    parentRoute?: Route;
    parent?: FHTMLElement;
    children?: Route[];
    constructor(path: string, element: FElement);
}
export class Conditional {
    condition: () => boolean;
    _true: FElement;
    _false: FElement;
    parent?: FElement;
    index: number;
    constructor(condition: () => boolean, _true: FElement, _false: FElement);
    element(parent?: FElement): HTMLElement | SVGElement | Text;
}
export class Loop<T = any> {
    state: State<Array<T>>;
    iteration: (element: T) => FElement;
    index: number;
    constructor(state: State, iteration: (element: T) => FElement);
}
export type FEvent = Event | CustomEvent;
export interface FElement<Register = {}> {
    _id: string;
    register: Register;
    parent?: FElement;
    element(): HTMLElement | SVGElement | Text;
}
type FTextChildren = (State | Computed | string | number)[];
type FTextRegister = Partial<{
    states: State[];
    computed: Computed[];
}>;
export class FText implements FElement<FTextRegister> {
    _id: string;
    register: FTextRegister;
    parent?: FHTMLElement | FSVGElement;
    text: string;
    constructor(text: string, ...args: FTextChildren);
    element(): Text;
}
type FHTMLElementChidren = (FElement | Router | Route | Conditional | Loop | State | Computed | string | number)[];
type FHTMLElementRegister = Partial<{
    states: State[];
    computed: Computed[];
    router: Router;
    routes: Route[];
    conditionals: Conditional[];
    loops: Loop[];
}>;
export class FHTMLElement implements FElement<FHTMLElementRegister> {
    _id: string;
    name: keyof HTMLElementTagNameMap;
    parent: FHTMLElement | FSVGElement;
    register: FHTMLElementRegister;
    _children: FElement[];
    _style: Properties | null;
    _listeners: Map<keyof HTMLElementEventMap, (event: FEvent) => void>;
    _classname: string;
    _attributes: {
        [attr: string]: any;
    };
    constructor(name: keyof HTMLElementTagNameMap, children?: FHTMLElementChidren);
    style(style: Properties): this;
    children(children?: FElement[]): this;
    listener(eventname: keyof HTMLElementEventMap, callback: (event: FEvent) => void): this;
    element(): HTMLElement;
    class(classname: string): void;
    attr(name: string, value: any): void;
    attrs(attrs: {
        [attr: string]: any;
    }): void;
}
type FSVGElementRegister = Partial<{
    states: State[];
    computed: Computed[];
    conditionals: Conditional[];
    loops: Loop[];
}>;
export class FSVGElement implements FElement<FSVGElementRegister> {
    _id: string;
    name: keyof SVGElementTagNameMap;
    parent: FSVGElement | FHTMLElement;
    register: FSVGElementRegister;
    _children: FElement[];
    _style: Properties | null;
    _listeners: Map<keyof SVGElementEventMap, (event: FEvent) => void>;
    _classname: string;
    _attributes: {
        [attr: string]: any;
    };
    constructor(name: keyof SVGElementTagNameMap, children?: FElement[]);
    style(style: Properties): this;
    children(children?: FElement[]): this;
    listener(eventname: keyof SVGElementEventMap, callback: (event: FEvent) => void): this;
    element(parent?: FSVGElement): SVGElement;
    class(classname: string): void;
    attr(name: string, value: any): void;
    attrs(attrs: {
        [attr: string]: any;
    }): void;
}
export class Computed extends ExtensibleFunction {
    _id: string;
    value: any;
    fn: (...args: State[]) => any;
    states: State[];
    elements: FElement[];
    constructor(fn: (...args: State[]) => any, ...states: State[]);
    setElement(element: FElement): void;
}
export class FDocument {
    window: Window;
    document: Document;
    rootSelector: string;
    rootElement: FHTMLElement;
    router?: Router;
    constructor();
    render(selector: string, element: FHTMLElement): void;
    selector(element: FHTMLElement | FSVGElement): string;
    rerenderElement(element: FHTMLElement): void;
    hasRouter(element: FElement): Router;
    getStates(element: FElement): State<any>[];
}
export class Effect {
    _id: string;
    effect: () => void;
    states: State[];
    constructor(fn: () => void, ...states: State[]);
}
export interface Task<A = {
    [key: string]: any;
}, R = void> {
    priority: number;
    args: A;
    call(): R;
}
type DOMUpdateArgs = {
    state: State | Computed;
    document: FDocument;
};
export class DOMUpdate implements Task<DOMUpdateArgs, void> {
    priority: number;
    args: DOMUpdateArgs;
    constructor(args: DOMUpdateArgs);
    call(): void;
}
export class ComputedRefresh implements Task<Computed, void> {
    priority: number;
    args: Computed;
    constructor(args: Computed);
    call(): void;
}
export class EffectCall implements Task {
    priority: number;
    args: Effect;
    constructor(args: Effect);
    call(): void;
}
type RouteChangeArgs = {
    document: FDocument;
    router: Router;
    path: string;
};
export class RouteChange implements Task {
    priority: number;
    args: RouteChangeArgs;
    constructor(args: RouteChangeArgs);
    call(): void;
}
type InitEffectRegistryArgs = Effect;
export class InitEffectRegistry implements Task {
    priority: number;
    args: InitEffectRegistryArgs;
    constructor(args: InitEffectRegistryArgs);
    call(): void;
}
type InitComputedRegistryArgs = Computed;
export class InitComputedRegistry implements Task {
    priority: number;
    args: InitComputedRegistryArgs;
    constructor(args: InitComputedRegistryArgs);
    call(): void;
}
export class Stack {
    tasks: Task[];
    running: boolean;
    constructor();
    pop(): Task;
    push(task: Task): void;
    empty(): boolean;
    run(): void;
}
type DocumentRegister = {
    document: FDocument;
    states: State[];
    effects: Effect[];
    computed: Computed[];
    router: Router;
};
export class Registry {
    stack: Stack;
    register: {
        [key: string]: DocumentRegister;
    };
    constructor();
    initEffectRegistry(effect: Effect): void;
    initComputedRegistry(computed: Computed): void;
    registerStates(root: string, states: State[]): void;
    registerStateUpdate(state: State): void;
    registerFlDocumentRoot(root: string, document: FDocument): void;
    run(): void;
    registerEffect(effect: Effect): void;
    registerComputed(computed: Computed): void;
    registerActiveRouter(rootSelector: string, router: Router): void;
    registerRouteChange(path: string, rootSelector: string): void;
    getElementRootSelector(element: FElement, parent?: FHTMLElement): string | boolean;
    getRouterParams(): {
        [key: string]: string | number;
    };
}
export const Felin: Registry;
export class Component<T extends {
    [key: string]: any;
}> extends ExtensibleFunction {
    fn: (props: T) => FElement;
    props: T;
    parentNode?: FElement;
    constructor(fn: (props: T) => FElement);
    element(parent?: FElement): HTMLElement | SVGElement | Text;
}
export const a: (...children: FElement[]) => FElement;
export const abbr: (...children: FElement[]) => FElement;
export const address: (...children: FElement[]) => FElement;
export const area: (...children: FElement[]) => FElement;
export const article: (...children: FElement[]) => FElement;
export const aside: (...children: FElement[]) => FElement;
export const audio: (...children: FElement[]) => FElement;
export const b: (...children: FElement[]) => FElement;
export const base: (...children: FElement[]) => FElement;
export const bdi: (...children: FElement[]) => FElement;
export const bdo: (...children: FElement[]) => FElement;
export const blockquote: (...children: FElement[]) => FElement;
export const body: (...children: FElement[]) => FElement;
export const br: (...children: FElement[]) => FElement;
export const button: (...children: FElement[]) => FElement;
export const canvas: (...children: FElement[]) => FElement;
export const caption: (...children: FElement[]) => FElement;
export const cite: (...children: FElement[]) => FElement;
export const code: (...children: FElement[]) => FElement;
export const col: (...children: FElement[]) => FElement;
export const colgroup: (...children: FElement[]) => FElement;
export const data: (...children: FElement[]) => FElement;
export const datalist: (...children: FElement[]) => FElement;
export const dd: (...children: FElement[]) => FElement;
export const del: (...children: FElement[]) => FElement;
export const details: (...children: FElement[]) => FElement;
export const dfn: (...children: FElement[]) => FElement;
export const dialog: (...children: FElement[]) => FElement;
export const div: (...children: FElement[]) => FElement;
export const dl: (...children: FElement[]) => FElement;
export const dt: (...children: FElement[]) => FElement;
export const em: (...children: FElement[]) => FElement;
export const embed: (...children: FElement[]) => FElement;
export const fieldset: (...children: FElement[]) => FElement;
export const figcaption: (...children: FElement[]) => FElement;
export const figure: (...children: FElement[]) => FElement;
export const footer: (...children: FElement[]) => FElement;
export const form: (...children: FElement[]) => FElement;
export const h1: (...children: FElement[]) => FElement;
export const h2: (...children: FElement[]) => FElement;
export const h3: (...children: FElement[]) => FElement;
export const h4: (...children: FElement[]) => FElement;
export const h5: (...children: FElement[]) => FElement;
export const h6: (...children: FElement[]) => FElement;
export const head: (...children: FElement[]) => FElement;
export const header: (...children: FElement[]) => FElement;
export const hgroup: (...children: FElement[]) => FElement;
export const hr: (...children: FElement[]) => FElement;
export const html: (...children: FElement[]) => FElement;
export const i: (...children: FElement[]) => FElement;
export const iframe: (...children: FElement[]) => FElement;
export const img: (...children: FElement[]) => FElement;
export const input: (...children: FElement[]) => FElement;
export const ins: (...children: FElement[]) => FElement;
export const kbd: (...children: FElement[]) => FElement;
export const label: (...children: FElement[]) => FElement;
export const legend: (...children: FElement[]) => FElement;
export const li: (...children: FElement[]) => FElement;
export const link: (...children: FElement[]) => FElement;
export const main: (...children: FElement[]) => FElement;
export const map: (...children: FElement[]) => FElement;
export const mark: (...children: FElement[]) => FElement;
export const menu: (...children: FElement[]) => FElement;
export const meta: (...children: FElement[]) => FElement;
export const meter: (...children: FElement[]) => FElement;
export const nav: (...children: FElement[]) => FElement;
export const noscript: (...children: FElement[]) => FElement;
export const object: (...children: FElement[]) => FElement;
export const ol: (...children: FElement[]) => FElement;
export const optgroup: (...children: FElement[]) => FElement;
export const option: (...children: FElement[]) => FElement;
export const output: (...children: FElement[]) => FElement;
export const p: (...children: FElement[]) => FElement;
export const picture: (...children: FElement[]) => FElement;
export const pre: (...children: FElement[]) => FElement;
export const progress: (...children: FElement[]) => FElement;
export const q: (...children: FElement[]) => FElement;
export const rp: (...children: FElement[]) => FElement;
export const rt: (...children: FElement[]) => FElement;
export const ruby: (...children: FElement[]) => FElement;
export const s: (...children: FElement[]) => FElement;
export const samp: (...children: FElement[]) => FElement;
export const search: (...children: FElement[]) => FElement;
export const section: (...children: FElement[]) => FElement;
export const select: (...children: FElement[]) => FElement;
export const slot: (...children: FElement[]) => FElement;
export const small: (...children: FElement[]) => FElement;
export const source: (...children: FElement[]) => FElement;
export const span: (...children: FElement[]) => FElement;
export const strong: (...children: FElement[]) => FElement;
export const sub: (...children: FElement[]) => FElement;
export const summary: (...children: FElement[]) => FElement;
export const sup: (...children: FElement[]) => FElement;
export const table: (...children: FElement[]) => FElement;
export const tbody: (...children: FElement[]) => FElement;
export const td: (...children: FElement[]) => FElement;
export const template: (...children: FElement[]) => FElement;
export const textarea: (...children: FElement[]) => FElement;
export const tfoot: (...children: FElement[]) => FElement;
export const th: (...children: FElement[]) => FElement;
export const thead: (...children: FElement[]) => FElement;
export const time: (...children: FElement[]) => FElement;
export const title: (...children: FElement[]) => FElement;
export const tr: (...children: FElement[]) => FElement;
export const track: (...children: FElement[]) => FElement;
export const u: (...children: FElement[]) => FElement;
export const ul: (...children: FElement[]) => FElement;
export const _var: (...children: FElement[]) => FElement;
export const video: (...children: FElement[]) => FElement;
export const wbr: (...children: FElement[]) => FElement;
export const _a: (...children: FElement[]) => FElement;
export const animate: (...children: FElement[]) => FElement;
export const animateMotion: (...children: FElement[]) => FElement;
export const animateTransform: (...children: FElement[]) => FElement;
export const circle: (...children: FElement[]) => FElement;
export const clipPath: (...children: FElement[]) => FElement;
export const defs: (...children: FElement[]) => FElement;
export const desc: (...children: FElement[]) => FElement;
export const ellipse: (...children: FElement[]) => FElement;
export const feBlend: (...children: FElement[]) => FElement;
export const feColorMatrix: (...children: FElement[]) => FElement;
export const feComponentTransfer: (...children: FElement[]) => FElement;
export const feComposite: (...children: FElement[]) => FElement;
export const feConvolveMatrix: (...children: FElement[]) => FElement;
export const feDiffuseLighting: (...children: FElement[]) => FElement;
export const feDisplacementMap: (...children: FElement[]) => FElement;
export const feDistantLight: (...children: FElement[]) => FElement;
export const feDropShadow: (...children: FElement[]) => FElement;
export const feFlood: (...children: FElement[]) => FElement;
export const feFuncA: (...children: FElement[]) => FElement;
export const feFuncB: (...children: FElement[]) => FElement;
export const feFuncG: (...children: FElement[]) => FElement;
export const feFuncR: (...children: FElement[]) => FElement;
export const feGaussianBlur: (...children: FElement[]) => FElement;
export const feImage: (...children: FElement[]) => FElement;
export const feMerge: (...children: FElement[]) => FElement;
export const feMergeNode: (...children: FElement[]) => FElement;
export const feMorphology: (...children: FElement[]) => FElement;
export const feOffset: (...children: FElement[]) => FElement;
export const fePointLight: (...children: FElement[]) => FElement;
export const feSpecularLighting: (...children: FElement[]) => FElement;
export const feSpotLight: (...children: FElement[]) => FElement;
export const feTile: (...children: FElement[]) => FElement;
export const feTurbulence: (...children: FElement[]) => FElement;
export const filter: (...children: FElement[]) => FElement;
export const foreignObject: (...children: FElement[]) => FElement;
export const g: (...children: FElement[]) => FElement;
export const image: (...children: FElement[]) => FElement;
export const line: (...children: FElement[]) => FElement;
export const linearGradient: (...children: FElement[]) => FElement;
export const marker: (...children: FElement[]) => FElement;
export const mask: (...children: FElement[]) => FElement;
export const metadata: (...children: FElement[]) => FElement;
export const mpath: (...children: FElement[]) => FElement;
export const path: (...children: FElement[]) => FElement;
export const pattern: (...children: FElement[]) => FElement;
export const polygon: (...children: FElement[]) => FElement;
export const polyline: (...children: FElement[]) => FElement;
export const radialGradient: (...children: FElement[]) => FElement;
export const rect: (...children: FElement[]) => FElement;
export const set: (...children: FElement[]) => FElement;
export const stop: (...children: FElement[]) => FElement;
export const svg: (...children: FElement[]) => FElement;
export const _switch: (...children: FElement[]) => FElement;
export const symbol: (...children: FElement[]) => FElement;
export const _text: (...children: FElement[]) => FElement;
export const textPath: (...children: FElement[]) => FElement;
export const _title: (...children: FElement[]) => FElement;
export const tspan: (...children: FElement[]) => FElement;
export const use: (...children: FElement[]) => FElement;
export const view: (...children: FElement[]) => FElement;
export function $text(text: string, ...args: any[]): FText;
export function $state<T>(value: T): State<T>;
export function $effect(fn: () => void, ...states: State[]): void;
export function $computed(fn: (...args: State[]) => void, ...states: State[]): Computed;
export function $router(...routes: Route[]): Router;
export function $route(path: string, element: FElement): Route;
export function $params(): any;
export function $document(): FDocument;
export function $link(path: string, element: FElement | string): FHTMLElement;
export function $if(condition: () => boolean, trueBranch: FElement, falseBranch: FElement): Conditional;
export function $for<T>(state: State<Array<T>>, iteration: (element: T) => FElement): Loop<T>;
export function $length<T>(state: State<Array<T>>): State<number>;
export default Felin;

//# sourceMappingURL=felin.d.ts.map
