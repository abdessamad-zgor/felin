import { Felin } from "./core/registry";

if(window){
  window.Felin = Felin;
}

export default Felin 
export * from "./primitives";
export * from "./elements";
export * from "./core";
export * from "./helpers";
export * from "./router";
export * from "./utils";
