import { FElement, FHTMLElement } from "../elements/element"


export type RouterTreeLocation = {router: Router, location: FHTMLElement}

export class Router {
  routes:  Route[]
  index?: number
  active: Route[]
  previous: Route[]
  history: Route[]
  parent?: FHTMLElement;
  params: {[key: string]: string|number}

  constructor(...routes: Route[]){
    this.routes = routes
    this.params = {}
    this.previous = []
    this.active = []
  }

  matchRoute(path: string){
    if(this.active.length>0){
      this.previous = [...this.active]
      this.active = []
    }
    if(path=='/'){
      let homeRoute = this.routes.find(r=>r.path=="/")
      if(homeRoute){
        this.active = [homeRoute]
        return;
      }
      return;
    }
    let pathSegments = path.split('/').filter(s=>s!='')
    let foundMatch: Route | undefined = undefined
    for(let i=0; i<pathSegments.length; i++){
      if(!foundMatch){
        for(let route of this.routes){
          let routeSegments = route.path.split('/')
          if(pathSegments[i]==routeSegments[i]){
            foundMatch = route
            break;
          }
        }
      } else {
        foundMatch = undefined
        for(let matchChildRoute of foundMatch.children){
          let routeSegments = matchChildRoute.path.split('/')
          if(routeSegments[i].startsWith(":")){
            this.params = {[routeSegments[i].slice(1)]: Number.isNaN((+pathSegments[i]) as number) ? +pathSegments[i]: pathSegments[i]}
            foundMatch = matchChildRoute
            break;
          }else if(routeSegments[i] == pathSegments[i]){
            foundMatch = matchChildRoute;
            break;
          }
        }
      }
      if(foundMatch!=undefined){
        this.active.push(foundMatch)
        continue;
      }else if(i==0){
        let catchAll = this.routes.find(r=>r.path == "*")
        if(catchAll!=undefined){
          this.active = [catchAll]
        }
        break;
      } else if (this.active.length<i+1){
        break;
      }
    }
  }

  buildRouterTree(): Router {
    for(let route of this.routes){
      let element = route.element
      if(element instanceof FHTMLElement){
        if(element.register.router){
          throw Error("Cannot have nested routers inside the same element tree");
        } else {
          if(element.register.routes && element.register.routes.length>0){
            for(let childRoute of element.register.routes){
              childRoute.parentRoute = route
              route.children.push(childRoute)
            }
          }
        }
      }
    }
    return this
  }
}

export class Route {
  path: string
  index?: number
  element: FElement
  parentRoute?: Route
  parent?: FHTMLElement
  children?: Route[] = []

  constructor(path: string, element: FElement){
    this.path = path
    this.element = element
  }
}

