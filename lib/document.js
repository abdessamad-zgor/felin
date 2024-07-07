import { HsHTMLElement } from "../src/hsjs";
//import { DOMWindow, JSDOM } from 'jsdom'
export class HsDocument {
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
                //let { element, selector, state } = element.getStateCalls(root, this)
                let domElementRoot = element.element();
                target.appendChild(domElementRoot);
                this.rootSelector = selector;
                this.rootElement = element;
                let stateCalls = element.getStateCalls();
                HSJS.registerHsDocumentRoot(selector, this);
                HSJS.registerStateCalls(selector, stateCalls);
                HSJS.run(selector);
            }
            else
                throw Error("HsJsError: no element found with selector " + selector);
        }
    }
    selector(element) {
        let elementPath = [];
        let currentElement = element;
        let selector = `${this.rootSelector}>${this.rootElement.name}`;
        while (currentElement.id != this.rootElement.id) {
            if (currentElement instanceof HsHTMLElement) {
                elementPath.push(currentElement);
            }
            currentElement = currentElement.parentNode;
        }
        for (let pathElement of elementPath) {
            selector += `>${pathElement.name}`;
        }
        return selector;
    }
}
