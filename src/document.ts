import { FlHTMLElement as FlElement, FlHTMLElement, FlTextNode } from "./felin"

export class FlDocument {
  window: Window
  document: Document
  rootSelector: string;
  rootElement: FlElement;

  constructor() {
    if (window) {
      this.window = window
      this.document = document
    }
  }

  render(selector: string, element: FlElement) {
    if (this.document instanceof Document) {
      let target = this.document.querySelector(selector)
      if (target instanceof HTMLElement || element instanceof Node) {
        let domElementRoot = element.element()
        target.appendChild(domElementRoot)
        this.rootSelector = selector;
        this.rootElement = element;
        let stateCalls = element.getStateCalls()
        Fl.registerFlDocumentRoot(selector, this)
        Fl.registerStateCalls(selector, stateCalls)
        Fl.run()
      } else
        throw Error("FlJsError: no element found with selector " + selector)
    }
  }

  selector(element: FlElement) {
    let elementPath: FlHTMLElement[] = []
    let currentElement = element
    let selector = `${this.rootSelector}>${this.rootElement.name}`
    while (currentElement.id != this.rootElement.id) {
      if (currentElement instanceof FlHTMLElement) {
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
