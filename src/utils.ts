import { Properties as CssStyle } from "csstype";

export function toCssString(style: CssStyle) {
  let styleString = "";
  for (let property of Object.keys(style)) {
    let key = property.split('').map((char, i) => {
      if (property.charCodeAt(i) >= 65 && property.charCodeAt(i)<=90) {
        return '-' + char.toLowerCase()
      }
      return char;
    });
    styleString += key.join('') + ": " + style[property] + ";"
  }
  return styleString
}
export class ExtensibleFunction extends Function {
  constructor(f) {
    super()
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}
