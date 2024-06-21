import { JSDOM } from 'jsdom';
export class HsDocument {
    constructor() {
        if (window) {
            this.env = "browser";
            this.window = window;
            this.document = document;
        }
        else {
            this.env = "node";
            let nodeDom = new JSDOM();
            this.document = nodeDom.window.document;
            this.window = nodeDom.window;
        }
    }
    render(id, element) {
        if (this.document instanceof Document) {
            /**@type {HTMLElement|null}*/
            let target = this.document.getElementById(id);
            if (target instanceof HTMLElement || element instanceof Node) {
                let domElementRoot = element.element();
                target.appendChild(domElementRoot);
                HSJS.registerHsDocumentRoot(id, this);
            }
            else
                throw Error("HsJsError: no element found with id " + id);
        }
    }
}
