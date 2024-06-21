import { HsState } from "./state";
export class HsTextNode {
    constructor(text, ...args) {
        this.id = crypto.randomUUID();
        if (args.length > 0)
            for (let arg of args) {
                if (arg instanceof HsState) {
                    text = text.replace("{}", arg());
                    this.stateCalls.push(arg);
                }
                else {
                    text = text.replace("{}", arg);
                }
            }
        this.text = text;
    }
    element() {
        return document.createTextNode(this.text);
    }
    getStateCalls(accumulator) {
        let acc = accumulator || [];
        let stateCalls = this.stateCalls.map(sc => ({ state: sc, element: this }));
        acc.concat(...stateCalls);
        return acc;
    }
    selector(root, rootElement) {
        let selector = "";
        if (rootElement) {
        }
        if (rootElement instanceof HsTextNode) {
            selector += `${root}`;
        }
        else if (rootElement instanceof HsHTMLElement) {
            let rootElementChildren = rootElement === null || rootElement === void 0 ? void 0 : rootElement.children();
            if (rootElementChildren.length == 0) {
                if (rootElement instanceof HsTextNode) {
                    selector += `${root}`;
                }
                else {
                    selector += `${root}>${rootElement.name}`;
                }
            }
            else {
                for (let i = 0; i < rootElementChildren.length; i++) {
                    let child = rootElementChildren[i];
                    if (child.id == this.id) {
                        if (child instanceof HsTextNode) {
                            selector += `${root}>${rootElement.name}:nth-child(${i + 1})`;
                        }
                        else if (child instanceof HsHTMLElement) {
                            selector += `${root}>${rootElement.name}:nth-child(${i + 1})>${child.name}`;
                        }
                        break;
                    }
                    else {
                        if (child instanceof HsTextNode) {
                            selector += `${root}>${rootElement.name}:nth-child(${i + 1})`;
                        }
                        else if (child instanceof HsHTMLElement) {
                            let newRootSelector = `${root}>${child}:nth-child(${i + 1})`;
                            selector += `${root}>${child}:nth-child(${i + 1})>${child.selector(newRootSelector, rootElementChildren[i])}`;
                        }
                    }
                }
            }
        }
        return selector;
    }
}
// TODO: MAKE `element()` ACCEPT AN `HsDocument`
export class HsHTMLElement {
    constructor(name, children, style) {
        this.id = crypto.randomUUID();
        this.name = name;
        if (typeof children == "string") {
            this.$children = [new HsTextNode(children)];
        }
        else if (Array.isArray(children)) {
            this.$children = [];
            for (let child of children) {
                if (child instanceof HsState) {
                    this.$children.push(new HsTextNode("{}", child));
                    this.stateCalls.push(child);
                }
                else {
                    this.$children.push(typeof child == "string" ? new HsTextNode(child) : child);
                }
            }
        }
        else {
            this.$children = [];
        }
        this.$style = style || null;
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
                if (child instanceof HsState) {
                    this.$children.push(new HsTextNode("{}", child));
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
        acc.concat(...stateCalls);
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
        let elementChildren = this.children();
        if (elementChildren.length == 0) {
            return element;
        }
        else {
            for (let child of elementChildren) {
                element.appendChild(child.element());
            }
            return element;
        }
    }
    selector(root, rootElement) {
        let selector = "";
        if (rootElement instanceof HsTextNode) {
            selector += `${root}`;
        }
        else if (rootElement instanceof HsHTMLElement) {
            let rootElementChildren = rootElement === null || rootElement === void 0 ? void 0 : rootElement.children();
            if (rootElementChildren.length == 0) {
                if (rootElement instanceof HsTextNode) {
                    selector += `${root}`;
                }
                else {
                    selector += `${root}>${this.name}`;
                }
            }
            else {
                for (let i = 0; i < rootElementChildren.length; i++) {
                    let child = rootElementChildren[i];
                    if (child == this) {
                        if (child instanceof HsTextNode) {
                            selector += `${root}>${rootElement.name}:nth-child(${i + 1})`;
                        }
                        else if (child instanceof HsHTMLElement) {
                            selector += `${root}>${rootElement.name}:nth-child(${i + 1})>${this.name}`;
                        }
                        break;
                    }
                    else {
                        if (child instanceof HsTextNode) {
                            selector += `${root}>${rootElement.name}:nth-child(${i + 1})`;
                        }
                        else if (child instanceof HsHTMLElement) {
                            let newRootSelector = `${root}>${child}:nth-child(${i + 1})`;
                            selector += `${root}>${child}:nth-child(${i + 1})>${child.selector(newRootSelector, rootElementChildren[i])}`;
                        }
                    }
                }
            }
        }
        return selector;
    }
}
