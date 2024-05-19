import { HsHTMLElement } from './core.js'

/**
 * @param {import('./types').HsHTMLElement[] | undefined} children */

export const div = (children) => {
  let element = new HsHTMLElement(name = "div", children = children)
  return element
}
