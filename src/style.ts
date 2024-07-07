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
  console.log(styleString)
  return styleString
}
