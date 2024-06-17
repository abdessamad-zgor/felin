
/**@typedef {import('csstype').Properties} CssStyle*/
/**@typedef {import('./types').HsElement} HsElement*/
/**@typedef {import('./types').HsStack} HsStack*/
/**@typedef {(e:import('./types').HsEvent)=>void} HsListener*/

export class HsTextNode {
  /**@type {string}*/
  text
  constructor(text) {
    this.text = text
  }


  element() {
    return document.createTextNode(this.text)
  }
}

// TODO: MAKE `element()` ACCEPT AN `HsDocument`
/** a Hot Sticky Element
 * @class
 * */
export class HsHTMLElement {
  /** @type {import('./types').HTMLElementTagNames} name*/
  name;
  /** @type {HsElement[]} children*/
  $children;
  /** @type {CssStyle|null} style*/
  $style;
  /**
   * Create a new Hot Sticky Element
   *
   * @param {import('./types').HTMLElementTagNames} name
   * @param {HsElement[] | string | undefined} children
   * @param {CssStyle | undefined} style
   * */
  constructor(name, children, style) {
    this.name = name
    if (typeof children == "string") {
      this.$children = [new HsTextNode(children)]
    } else if (Array.isArray(children)) {
      this.$children = []
      for (let child of children)
        this.$children.push(typeof child == "string" ? new HsTextNode(child) : child)
    } else {
      this.$children = []
    }
    this.$style = style
  }

  /**
   * @param {CssStyle} style
   * */
  style(style) {
    this.$style = style
    return this
  }

  /**
   * @param {HsElement[]|undefined} children
   * @returns {HsElement[]|HsElement} 
   * */
  children(children) {
    if (!children)
      return this.$children
    else {
      this.$children = children;
      return this
    }
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

  element() {
    /**@type {HTMLElement}*/
    let element = document.createElement(this.name)
    //element.style.cssText = toCssString(this.$style)
    if (this.children().length == 0) {
      return element
    } else {
      for (let child of this.children()) {
        if (child instanceof HsTextNode) {
          console.log(child)
          element.appendChild(child.element())
        } else if (child instanceof HsHTMLElement) {
          element.appendChild(child.element())
        }
      }
      return element
    }
  }
}


// TODO: implement a priority tree
/**
 * @class
 * @implements {HsStack}
 */
export class Stack {
  /**@type {HsTask[]}*/
  tasks = []
  constructor() {
  }

  /**
   * returns the task with the highest priority (with the highest being equal to 1)
   *
   * @returns {HsTask}
   * */
  pop() {
    return this.tasks[0]
  }
} 
