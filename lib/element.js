export class HsTextNode {
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
// TODO: MAKE `element()` ACCEPT AN `HsDocument`
export class HsHTMLElement {
    constructor(name, children, style) {
        this.stateCalls = [];
        this.id = crypto.randomUUID();
        this.name = name;
        if (typeof children == "string") {
            this.$children = [new HsTextNode(children)];
        }
        else if (Array.isArray(children)) {
            this.$children = [];
            for (let child of children) {
                if (child instanceof Function) {
                    this.$children.push(new HsTextNode("{}", child));
                    //@ts-ignore
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
        this.$listeners = new Map();
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
        let element = document.createElement(this.name);
        //element.style.cssText = toCssString(this.$style)
        for (let entry of this.$listeners.entries()) {
            element.addEventListener(entry[0], entry[1]);
        }
        let elementChildren = this.children();
        if (elementChildren.length == 0) {
            return element;
        }
        else {
            for (let child of elementChildren) {
                element.appendChild(child.element(this));
            }
            return element;
        }
    }
}
