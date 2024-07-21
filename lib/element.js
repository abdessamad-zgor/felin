import { toCssString } from "./style";
import { FlRoute, FlRouter } from "./router";
export class FlTextNode {
    constructor(text, ...args) {
        this.stateCalls = [];
        this.id = crypto.randomUUID();
        if (args.length > 0)
            for (let arg of args) {
                if (arg instanceof Function) {
                    this.stateCalls.push(arg);
                }
                else {
                    text = text.replace("{}", arg);
                }
            }
        this.text = text;
    }
    element(parent) {
        if (parent) {
            this.parentNode = parent;
        }
        let textContent = this.text;
        for (let state of this.stateCalls) {
            textContent = textContent.replace("{}", state());
        }
        return document.createTextNode(textContent);
    }
    getStateCalls(accumulator) {
        let acc = accumulator || [];
        let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }));
        acc = acc.concat(...stateCalls);
        return acc;
    }
}
// TODO: MAKE `element()` ACCEPT AN `FlDocument`
export class FlHTMLElement {
    constructor(name, children, style) {
        this.stateCalls = [];
        this.router = null;
        this.routes = null;
        this.id = crypto.randomUUID();
        this.name = name;
        if (typeof children == "string") {
            this.$children = [new FlTextNode(children)];
        }
        else if (Array.isArray(children)) {
            this.$children = [];
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (child instanceof Function) {
                    this.$children.push(new FlTextNode("{}", child));
                    //@ts-ignore
                    this.stateCalls.push(child);
                }
                else if (child instanceof FlRouter) {
                    if (this.router) {
                        throw Error("Cannot have multiple routers in the same element tree.");
                    }
                    else {
                        child.parentNode = this;
                        child.index = i;
                        this.router = child;
                    }
                }
                else if (child instanceof FlRoute) {
                    child.parentNode = this;
                    child.index = i;
                    if (!Array.isArray(this.routes))
                        this.routes = [];
                    this.routes.push(child);
                }
                else {
                    this.$children.push(typeof child == "string" ? new FlTextNode(child) : child);
                }
            }
        }
        else {
            this.$children = [];
        }
        this.$style = style || null;
        this.$listeners = new Map();
        this.$attributes = {};
    }
    style(style) {
        this.$style = style;
        return this;
    }
    children(children) {
        if (!children)
            return this.$children;
        else {
            for (let child of children) {
                if (child instanceof Function) {
                    this.$children.push(new FlTextNode("{}", child));
                }
                else {
                    this.$children.push(child);
                }
            }
            return this;
        }
    }
    getStateCalls(accumulator) {
        let acc = accumulator || [];
        let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }));
        acc = acc.concat(...stateCalls);
        if (this.$children.length != 0) {
            for (let child of this.$children) {
                acc = child.getStateCalls(acc);
            }
        }
        return acc;
    }
    child() {
        return this;
    }
    listen(eventname, callback) {
        if (!this.$listeners.has(eventname)) {
            this.$listeners.set(eventname, callback);
        }
        return this;
    }
    element() {
        let element = document.createElement(this.name);
        //element.style.cssText = toCssString(this.$style)
        for (let entry of this.$listeners.entries()) {
            element.addEventListener(entry[0], entry[1]);
        }
        if (this.$style) {
            element.style.cssText = toCssString(this.$style);
        }
        if (this.$classname) {
            element.classList.add(...this.$classname.split(" "));
        }
        for (let key of Object.keys(this.$attributes)) {
            element.setAttribute(key, this.$attributes[key]);
        }
        let elementChildren = this.children();
        if (elementChildren.length == 0) {
            return element;
        }
        else {
            for (let child of elementChildren) {
                //@ts-ignore
                element.appendChild(child.element());
            }
            return element;
        }
    }
    buildElementTree(parent) {
        if (parent) {
            this.parentNode = parent;
        }
        this.buildElementTree(this);
    }
    class(classname) {
        this.$classname = classname;
    }
    attr(name, value) {
        this.$attributes[name] = value;
    }
    attrs(attrs) {
        this.$attributes = Object.assign(Object.assign({}, this.$attributes), attrs);
    }
    hasRouter() {
        if (this.router) {
            return this.router;
        }
        else {
            if (this.$children.length > 0) {
                let router;
                for (let child of this.$children) {
                    if (child instanceof FlHTMLElement) {
                        if (child.hasRouter())
                            router = child.hasRouter();
                    }
                }
                return router;
            }
        }
    }
}
export class FlSVGElement {
    constructor(name, children, style) {
        this.stateCalls = [];
        this.id = crypto.randomUUID();
        this.name = name;
        this.$children = [];
        for (let child of children) {
            if (child instanceof Function) {
                this.$children.push(new FlTextNode("{}", child));
                //@ts-ignore
                this.stateCalls.push(child);
            }
            else {
                this.$children.push(typeof child == "string" ? new FlTextNode(child) : child);
            }
        }
        this.$style = style || null;
        this.$listeners = new Map();
        this.$attributes = {};
    }
    style(style) {
        this.$style = style;
        return this;
    }
    children(children) {
        if (!children)
            return this.$children;
        else {
            for (let child of children) {
                if (child instanceof Function) {
                    this.$children.push(new FlTextNode("{}", child));
                }
                else {
                    this.$children.push(child);
                }
            }
            return this;
        }
    }
    getStateCalls(accumulator) {
        let acc = accumulator || [];
        let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }));
        acc = acc.concat(...stateCalls);
        if (this.$children.length != 0) {
            for (let child of this.$children) {
                acc = child.getStateCalls(acc);
            }
        }
        return acc;
    }
    child() {
        return this;
    }
    listen(eventname, callback) {
        if (!this.$listeners.has(eventname)) {
            this.$listeners.set(eventname, callback);
        }
        return this;
    }
    element(parent) {
        if (parent) {
            this.parentNode = parent;
        }
        let element = document.createElementNS("http://www.w3.org/2000/svg", this.name);
        //element.style.cssText = toCssString(this.$style)
        for (let entry of this.$listeners.entries()) {
            element.addEventListener(entry[0], entry[1]);
        }
        if (this.$style) {
            element.style.cssText = toCssString(this.$style);
        }
        if (this.$classname) {
            element.classList.add(...this.$classname.split(" "));
        }
        for (let key of Object.keys(this.$attributes)) {
            element.setAttribute(key, this.$attributes[key]);
        }
        let elementChildren = this.children();
        if (elementChildren.length == 0) {
            return element;
        }
        else {
            for (let child of elementChildren) {
                //@ts-ignore
                element.appendChild(child.element(this));
            }
            return element;
        }
    }
    class(classname) {
        this.$classname = classname;
    }
    attr(name, value) {
        this.$attributes[name] = value;
    }
    attrs(attrs) {
        this.$attributes = Object.assign(Object.assign({}, this.$attributes), attrs);
    }
}
