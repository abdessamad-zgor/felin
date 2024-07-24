import { Properties as CssStyle } from "csstype";
import { FElement, FHTMLElement, FSVGElement, FText } from "./elements/element";

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

export function foldElementTree(element: FElement, acc?: FElement[]): FElement[] {
  if(acc){
    let lastElementParent = (acc.reverse().find(e=>!(e instanceof FText)) as FHTMLElement | FSVGElement).parent;
    let i = 1;
    let nextLastElementParent= acc[acc.findIndex(e=>e._id == element._id)+i] 
    while(nextLastElementParent instanceof FHTMLElement || nextLastElementParent instanceof FSVGElement){
      i++;
      nextLastElementParent = acc[acc.findIndex(e=>e._id == element._id)+i]
    }
    if(nextLastElementParent){
      acc = [...acc, ...(nextLastElementParent as  FHTMLElement | FSVGElement )._children]
      return foldElementTree(nextLastElementParent, acc)
    }else{
      return acc
    }
  }else{
    let accumulator = [];
    if(element instanceof FHTMLElement || element instanceof FSVGElement){
      if(element._children.length>0){
        accumulator = [element, ...element._children]
        return foldElementTree(element, accumulator)
      }else {
        accumulator = [element]
        return accumulator
      }
    }else{
      accumulator = [element]
      return accumulator
    }
  }
}

export class ExtensibleFunction extends Function {
  constructor(f) {
    super()
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}
