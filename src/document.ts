import { FlHTMLElement, FlTextNode } from "./element"
import { FlRouter } from "./router";

export class FlDocument {
  window: Window
  document: Document
  rootSelector: string;
  rootElement: FlHTMLElement;
  router?: FlRouter

  constructor() {
    if (window) {
      this.window = window
      this.document = document
    }
  }

  render(selector: string, element: FlHTMLElement) {
    if (this.document instanceof Document) {
      let target = this.document.querySelector(selector)
      this.rootSelector = selector;
      this.rootElement = element;
      if (target instanceof HTMLElement || element instanceof Node) {
        element.buildElementTree();
        let router = element.hasRouter()
        if(router){
          router.buildRouterTree()
          Felin.registerActiveRouter(this.rootSelector, router)
        }
        let domElementRoot = element.element()
        let stateCalls = element.getStateCalls()
        target.appendChild(domElementRoot)
        Felin.registerFlDocumentRoot(selector, this)
        Felin.registerStateCalls(selector, stateCalls)
        Felin.run()
      } else
        throw Error("FelinError: no element found with selector " + selector)
    }
  }

  selector(element: FlHTMLElement) {
    let elementPath: FlHTMLElement[] = []
    let currentElement = element
    let selector = `${this.rootSelector}>${this.rootElement.name}`
    while (currentElement.id != this.rootElement.id) {
      if (currentElement instanceof FlHTMLElement) {
        elementPath.push(currentElement)
      }
      //@ts-ignore
      currentElement = currentElement.parentNode
    }
    for (let pathElement of elementPath) {
      selector += `>${pathElement.name}`
    }
    return selector
  }

  rerenderElement(element: FlHTMLElement){
    let selector = this.selector(element)
    let targetNode = this.document.querySelector(selector)
    targetNode.replaceWith(element.element())
  }
}
