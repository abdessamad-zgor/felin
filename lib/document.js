import { FlHTMLElement } from "./element";
export class FlDocument {
    constructor() {
        if (window) {
            this.window = window;
            this.document = document;
        }
    }
    render(selector, element) {
        if (this.document instanceof Document) {
            let target = this.document.querySelector(selector);
            if (target instanceof HTMLElement || element instanceof Node) {
                element.buildElementTree();
                let router = element.hasRouter();
                if (router) {
                    router.buildRouterTree();
                    Felin.registerActiveRouter(this.rootSelector, router);
                }
                let domElementRoot = element.element();
                target.appendChild(domElementRoot);
                this.rootSelector = selector;
                this.rootElement = element;
                let stateCalls = element.getStateCalls();
                Felin.registerFlDocumentRoot(selector, this);
                Felin.registerStateCalls(selector, stateCalls);
                Felin.run();
            }
            else
                throw Error("FelinError: no element found with selector " + selector);
        }
    }
    selector(element) {
        let elementPath = [];
        let currentElement = element;
        let selector = `${this.rootSelector}>${this.rootElement.name}`;
        while (currentElement.id != this.rootElement.id) {
            if (currentElement instanceof FlHTMLElement) {
                elementPath.push(currentElement);
            }
            currentElement = currentElement.parentNode;
        }
        for (let pathElement of elementPath) {
            selector += `>${pathElement.name}`;
        }
        return selector;
    }
    rerenderElement(element) {
        let selector = this.selector(element);
        let targetNode = this.document.querySelector(selector);
        targetNode.replaceWith(element.element());
    }
}
