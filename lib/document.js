//import { DOMWindow, JSDOM } from 'jsdom'
export class HsDocument {
    constructor() {
        if (window) {
            this.window = window;
            this.document = document;
        }
    }
    render(id, element) {
        if (this.document instanceof Document) {
            let target = this.document.getElementById(id);
            if (target instanceof HTMLElement || element instanceof Node) {
                //let { element, selector, state } = element.getStateCalls(root, this)
                let domElementRoot = element.element();
                target.appendChild(domElementRoot);
                this.rootId = id;
                this.rootElement = element;
                let stateCalls = element.getStateCalls();
                HSJS.registerHsDocumentRoot(id, this);
                HSJS.registerStateCalls(id, stateCalls);
                HSJS.run(id);
            }
            else
                throw Error("HsJsError: no element found with id " + id);
        }
    }
}
