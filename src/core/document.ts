import { FElement, FHTMLElement, FSVGElement, FText } from "../elements/element"
import { State } from "../primitives/state";
import { Router } from "../router";
import { foldElementTree } from "../utils";

export class FDocument {
  window: Window
  document: Document
  rootSelector: string;
  rootElement: FHTMLElement;
  router?: Router

  constructor() {
    if (window) {
      this.window = window
      this.document = document
    }
  }

  render(selector: string, element: FHTMLElement) {
    if (this.document instanceof Document) {
      let target = this.document.querySelector(selector)
      this.rootSelector = selector;
      this.rootElement = element;
      if (target instanceof HTMLElement || element instanceof Node) {
        let router = this.hasRouter(element)
        if(router){
          router.buildRouterTree()
          Felin.registerActiveRouter(this.rootSelector, router)
        }
        let domElementRoot = element.element()
        let states = this.getStates(element)
        target.appendChild(domElementRoot)
        Felin.registerFlDocumentRoot(selector, this)
        Felin.registerStates(selector, states)
        Felin.run()
      } else
        throw Error("FelinError: no element found with selector " + selector)
    }
  }

  selector(element: FHTMLElement) {
    let elementPath: FHTMLElement[] = []
    let currentElement = element
    let selector = `${this.rootSelector}>${this.rootElement.name}`
    while (currentElement._id != this.rootElement._id) {
      if (currentElement instanceof FHTMLElement) {
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

  rerenderElement(element: FHTMLElement){
    let selector = this.selector(element)
    let targetNode = this.document.querySelector(selector)
    targetNode.replaceWith(element.element())
  }

  hasRouter(element: FElement){
    let router: Router|null = null
    let elementTreeList = foldElementTree(element)
    elementTreeList.forEach(el=>{
      if(el instanceof FHTMLElement){
        if(el.router) router = el.router
      }
    })
    return router
  }

  getStates(element: FElement){
    let states: State[] = [];
    let elementTreeList = foldElementTree(element)
    for(let el of elementTreeList){
      states = [...states, ...el.states]
    }
    let uniqueStates = [...new Set(states.map(e=>e._id))]
    states = uniqueStates.map(id=>states.find(s=>s._id == id))
    return states
  }
}
