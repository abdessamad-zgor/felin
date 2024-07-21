import { FlHTMLElement } from "./element";
export class FlRouter {
    constructor(...routes) {
        this.routes = routes;
        this.params = {};
        this.previous = [];
        this.active = [];
        this.matchRoute(window.location.href.slice(window.location.hostname.length + window.location.protocol.length + 2));
    }
    matchRoute(path) {
        if (this.active.length > 0) {
            this.previous = [...this.active];
            this.active = [];
        }
        if (path == '/') {
            let homeRoute = this.routes.find(r => r.path == "/");
            if (homeRoute) {
                this.active = [homeRoute];
                return;
            }
            return;
        }
        let pathSegments = path.split('/').filter(s => s != '');
        let foundMatch;
        for (let i = 0; i < pathSegments.length; i++) {
            if (!foundMatch) {
                for (let route of this.routes) {
                    let routeSegments = route.path.split('/');
                    if (pathSegments[i] == routeSegments[i]) {
                        foundMatch = route;
                        break;
                    }
                }
            }
            else {
                foundMatch = undefined;
                for (let matchChildRoute of foundMatch.children) {
                    let routeSegments = matchChildRoute.path.split('/');
                    if (routeSegments[i].startsWith(":")) {
                        this.params = { [routeSegments[i].slice(1)]: Number.isNaN((+pathSegments[i])) ? +pathSegments[i] : pathSegments[i] };
                        foundMatch = matchChildRoute;
                        break;
                    }
                    else if (routeSegments[i] == pathSegments[i]) {
                        foundMatch = matchChildRoute;
                        break;
                    }
                }
            }
            if (foundMatch) {
                this.active.push(foundMatch);
                continue;
            }
            else if (i == 0) {
                let catchAll = this.routes.find(r => r.path == "*");
                this.active = [catchAll];
                break;
            }
            else if (this.active.length < i + 1) {
                break;
            }
        }
    }
    buildRouterTree() {
        for (let route of this.routes) {
            let element = route.component({});
            if (element instanceof FlHTMLElement) {
                if (element.router) {
                    throw Error("Cannot have nested routers inside the same element tree");
                }
                else {
                    if (element.routes && element.routes.length > 0) {
                        for (let childRoute of element.routes) {
                            childRoute.parentRoute = route;
                            route.children.push(childRoute);
                        }
                    }
                }
            }
        }
        return this;
    }
}
export class FlRoute {
    constructor(path, component, parent) {
        this.path = path;
        this.component = component;
        if (parent) {
            this.parentRoute = parent;
        }
    }
}
