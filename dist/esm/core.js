export class HsTextNode {
    constructor(text) {
        this.text = text || "";
    }
    element() {
        return document.createTextNode(this.text);
    }
}
// TODO: MAKE `element()` ACCEPT AN `HsDocument`
export class HsHTMLElement {
    constructor(name, children, style) {
        this.name = name;
        if (typeof children == "string") {
            this.$children = [new HsTextNode(children)];
        }
        else if (Array.isArray(children)) {
            this.$children = [];
            for (let child of children)
                this.$children.push(typeof child == "string" ? new HsTextNode(child) : child);
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
            this.$children = children;
            return this;
        }
    }
    child() {
        return this;
    }
    listen(name, callback) {
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
                if (child instanceof HsTextNode) {
                    element.appendChild(child.element());
                }
                else if (child instanceof HsHTMLElement) {
                    element.appendChild(child.element());
                }
            }
            return element;
        }
    }
}
class ExtensibleFunction extends Function {
    constructor(f) {
        super();
        return Object.setPrototypeOf(f, new.target.prototype);
    }
}
export class HsState extends ExtensibleFunction {
    constructor(value) {
        super(function () { return this.value; });
        this.value = value;
    }
    set(value) {
        if (typeof value === "function") {
            this.value = value(this.value);
        }
        else {
            this.value = value;
        }
    }
}
export class HsTask {
    constructor(fn, args, priority) {
        this.fn = fn;
        this.args = args;
        this.priority = priority;
    }
    static updateDom(element, state) {
        let updateFunction = (s) => {
            let newValue = s();
            return newValue;
        };
        let task = new HsTask(updateFunction, state, 1);
        return task;
    }
}
function quickSortByPriority(array) {
    if (array.length <= 1) {
        return array;
    }
    let pivot = array[0];
    let left = [];
    let right = [];
    for (let i = 1; i < array.length; i++) {
        array[i].priority < pivot.priority ? left.push(array[i]) : right.push(array[i]);
    }
    return quickSortByPriority(left).concat(pivot, quickSortByPriority(right));
}
;
export class HsStack {
    constructor() {
        this.tasks = [];
    }
    pop() {
        if (this.tasks.length > 0)
            return this.tasks[0];
    }
    push(task) {
        this.tasks.push(task);
        this.tasks = quickSortByPriority(this.tasks);
        console.log(this.tasks.map(t => t.priority));
    }
}
export class HsRenderer {
}
export class HsRegistry {
    register(task) {
        this.stack.push(task);
    }
    registerHsDocumentRoot(root, document) {
        if (!Object.keys(this.docementRootsMap).includes(root)) {
            this.docementRootsMap[root] = document;
            console.log(this.docementRootsMap);
        }
    }
}
/**Don't ever mutate this variable directly*/
var HSJS = new HsRegistry();
