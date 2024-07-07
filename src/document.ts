import { HsHTMLElement as HsElement, HsHTMLElement, HsTextNode } from "../src/hsjs"

export class HsDocument {
  window: Window
  document: Document
  rootSelector: string;
  rootElement: HsElement;

  constructor() {
    if (window) {
      this.window = window
      this.document = document
    }
  }

  render(selector: string, element: HsElement) {
    if (this.document instanceof Document) {
      let target = this.document.querySelector(selector)
      if (target instanceof HTMLElement || element instanceof Node) {
        let domElementRoot = element.element()
        target.appendChild(domElementRoot)
        this.rootSelector = selector;
        this.rootElement = element;
        let stateCalls = element.getStateCalls()
        HSJS.registerHsDocumentRoot(selector, this)
        HSJS.registerStateCalls(selector, stateCalls)
        HSJS.run()
      } else
        throw Error("HsJsError: no element found with selector " + selector)
    }
  }

  selector(element: HsElement) {
    let elementPath: HsHTMLElement[] = []
    let currentElement = element
    let selector = `${this.rootSelector}>${this.rootElement.name}`
    while (currentElement.id != this.rootElement.id) {
      if (currentElement instanceof HsHTMLElement) {
        elementPath.push(currentElement)
      }
      currentElement = currentElement.parentNode
    }
    for (let pathElement of elementPath) {
      selector += `>${pathElement.name}`
    }
    return selector
  }
}
