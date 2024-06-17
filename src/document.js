import { HsHTMLElement as HsElement } from "../src/hsjs.js"

export class HsDocument {
  /**@type {Document | {}} */
  document = window ? document : {}
  constructor() {

  }

  /**
   * @method 
   * @param {string} id
   * @param {HsElement} element
   * @returns {void}
   * */
  render(id, element) {
    if (this.document != {}) {
      /**@type {HTMLElement|null}*/
      let target = this.document.getElementById(id)
      if (target instanceof HTMLElement || element instanceof Node) {
        let domElementRoot = element.element()
        target.appendChild(domElementRoot)
      } else
        throw Error("HsJsError: no element found with id " + id)
    }
  }
}
