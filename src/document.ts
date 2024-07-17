import { FlHTMLElement as FlElement, FlHTMLElement, FlTextNode } from "./element"
import { FlRouter } from "./router";

export class FlDocument {
  window: Window
  document: Document
  rootSelector: string;
  rootElement: FlElement;
  router?: FlRouter

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
        element.buildElementTree();
        let router = element.buildRouterTree()
        if(router){
          Felin.registerActiveRouter(this.rootSelector, routerLocation)
        }
        let domElementRoot = element.element()
        target.appendChild(domElementRoot)
        this.rootSelector = selector;
        this.rootElement = element;
        let stateCalls = element.getStateCalls()
        Felin.registerFlDocumentRoot(selector, this)
        Felin.registerStateCalls(selector, stateCalls)
        Felin.run()
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
