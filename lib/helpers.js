import { FlComputed } from "./computed";
import { FlEffect } from "./effect";
import { FlState } from "./state";
import { FlHTMLElement, FlTextNode } from "./element";
import { FlRouter } from "./router";
import { FlConditional, FlLoop } from "./control-flow";
export function $text(text, ...args) {
    return new FlTextNode(text, ...args);
}
export function $state(value) {
    return new FlState(value);
}
export function $effect(fn) {
    return new FlEffect(fn);
}
export function $computed(fn, ...states) {
    return new FlComputed(fn, ...states);
}
export function $router(...routes) {
    return new FlRouter(...routes);
}
export function $link(path, element) {
    let linkElement = (new FlHTMLElement("a", typeof element == "string" ? element : [element]));
    return linkElement.listen("click", (e) => {
        e.preventDefault();
        let rootSelector = Felin.getElementRootSelector(linkElement);
        if (typeof rootSelector == 'string')
            Felin.registerRouteChange(path, rootSelector);
    });
}
export function $if(condition, trueBranch, falseBranch) {
    return new FlConditional(condition, trueBranch, falseBranch);
}
export function $for(state, iteration) {
    return new FlLoop(state, iteration);
}
