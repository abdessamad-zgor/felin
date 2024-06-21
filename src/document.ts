import { HsHTMLElement as HsElement } from "../src/hsjs"
//import { DOMWindow, JSDOM } from 'jsdom'

export class HsDocument {
  //env: "browser" | "node"
  window: Window
  document: Document
  rootId: string;
  rootElement: HsElement;

  constructor() {
    if (window) {
      this.window = window
      this.document = document
    }
  }

  render(id: string, element: HsElement) {
    if (this.document instanceof Document) {
      let target = this.document.getElementById(id)
      if (target instanceof HTMLElement || element instanceof Node) {
        //let { element, selector, state } = element.getStateCalls(root, this)
        let domElementRoot = element.element()
        target.appendChild(domElementRoot)
        this.rootId = id;
        this.rootElement = element
        let stateCalls = element.getStateCalls()
        HSJS.registerHsDocumentRoot(id, this)
        HSJS.registerStateCalls(id, stateCalls)
        HSJS.run(id)
      } else
        throw Error("HsJsError: no element found with id " + id)
    }
  }
}
