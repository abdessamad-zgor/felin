import { FlElement, FlHTMLElement } from "./element"

export type FlComponent<T={}> = (props: T)=> FlElement

export type FlRouterTreeLocation = {router: FlRouter, location: FlHTMLElement}

export class FlRouter {
  routes:  FlRoute[]
  active: FlRoute
  history: FlRoute[]
  parentNode?: FlHTMLElement

  constructor(...routes: FlRoute[]){
    this.routes = routes
    this.determineActiveRoute(window.location.href)
  }

  determineActiveRoute(path: string){
    let activeRoute = this.routes.find(r=>r.path == path)
    if(activeRoute){
      this.active = activeRoute 
    } else {
      let catchAll = this.routes.find(r=>r.path == "*")
      this.active = catchAll
    }
  }

  buildRouterTree(): FlRouter {
    for(let route of this.routes){
      let element = route.component({})
      if(element instanceof FlHTMLElement){
        if(element.router){
          throw Error("Cannot have nested routers inside the same element tree");
        } else {
          if(element.routes && element.routes.length>0){
            for(let childRoute of element.routes){
              childRoute.parentRoute = route
              route.children.push(childRoute)
            }
          }
        }
      }
    }
    return this
  }

  element(){
    return this.active.component({}).element()
  }
}

export class FlRoute {
  path: string
  component: FlComponent
  parentRoute?: FlRoute
  parentNode?: FlHTMLElement
  children?: FlRoute[]

  constructor(path: string, component: FlComponent, parent?: FlRoute){
    this.path = path
    this.component = component
    if(parent){
      this.parentRoute = parent
    }
  }
  
}
