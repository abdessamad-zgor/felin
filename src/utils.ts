import { Properties as CssStyle } from "csstype";
import { FElement, FHTMLElement, FSVGElement, FText } from "./elements/element";

export enum ValueType {
  NUMBER,
  STRING,
  BOOLEAN,
  OBJECT,
  MAP,
  SET,
  ARRAY,
  PROMISE,
  ANY
}

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

function isObjectLiteral(obj) {
    if (typeof obj !== "object" || obj === null)
        return false;

    var hasOwnProp = Object.prototype.hasOwnProperty,
    ObjProto = obj;

    // get obj's Object constructor's prototype
    while (Object.getPrototypeOf(ObjProto = Object.getPrototypeOf(ObjProto)) !== null);

    return Object.getPrototypeOf(obj) === ObjProto;
};

export function determineValueType<T>(value: T){
  if(typeof value == "string"){
    return ValueType.STRING
  }else if(typeof value == "number"){
    return ValueType.NUMBER
  }else if(typeof value == "boolean"){
    return ValueType.BOOLEAN
  }else if(Array.isArray(value)){
    return ValueType.ARRAY
  }else if(isObjectLiteral(value)){
    return ValueType.OBJECT
    //@ts-ignore
  }else if(value && typeof value.then == "function"){
    return ValueType.PROMISE
  }else {
    return ValueType.ANY
  }
}

export function getObjectMethods(obj){
  let objectPrototype = obj.__proto__
  let methods = Object.getOwnPropertyNames(objectPrototype).filter(k=>typeof obj[k] == "function" && k!="constructor");
  return methods
}

export function flattenElementTree(element: FElement, acc?: FElement[]): FElement[] {
  if(acc){
    let lastElementParent = element;
    let i = 1;
    let nextElementParentIndex = acc.findIndex(e=>e._id == element._id)+i
    let nextElementParent: FElement|null = null;
    while( nextElementParentIndex < acc.length ){
      nextElementParent = acc[nextElementParentIndex]
      if(nextElementParent instanceof FSVGElement || nextElementParent instanceof FHTMLElement){
        if(nextElementParent._children.length!=0){
          nextElementParent = acc[nextElementParentIndex]
          acc = [...acc, ...(nextElementParent as  FHTMLElement | FSVGElement)._children]
          return flattenElementTree(nextElementParent, acc)
        }else{
          continue;
        }
      }
      i++;
      nextElementParentIndex = acc.findIndex(e=>e._id == element._id)+i
    }
    return acc
  }else{
    let accumulator = [];
    if(element instanceof FHTMLElement || element instanceof FSVGElement){
      if(element._children.length>0){
        accumulator = [element, ...element._children]
        return flattenElementTree(element, accumulator)
      }else {
        accumulator = [element]
        return accumulator
      }
    }else{
      accumulator = [element]
      return accumulator
    }
  }
  return []
}

export class ExtensibleFunction extends Function {
  constructor(f) {
    super()
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}
