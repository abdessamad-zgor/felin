/**@typedef {import('csstype').Properties} CssStyle*/
/**@typedef {import('./types').HsElement} HsElement*/
/**@typedef {(e:import('./types').HsEvent)=>void} HsListener*/

/** a Hot Sticky Element
 * @class
 * @implements {HsElement}
 * */
export class HsHTMLElement {

  /**
   * Create a new Hot Sticky Element
   *
   * @param {import('./types').HTMLElementTagNames} name
   * @param {HsElement[] | null} children
   * @param {CssStyle | null} style
   *
   * */
  constructor(name, children, style) {
    this.name = name
    this.$children = children
    this.$style = style
  }

  /**
   * @param {CssStyle} style
   * */
  style(style) {
    return this
  }

  children() {
    return this
  }

  child() {
    return this
  }

  /**
   * @param {string} name
   * @param {HsListener} callback
   * */
  listen(name, callback) {
    return this
  }

  $element() {
    /**@type {HTMLElement}*/
    let element = document.createElement(this.name)
    element.style = toCssString(this.$style)
    return element
  }
}
