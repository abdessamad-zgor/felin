var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/core.ts
var HsDOMUpdate = class {
  static {
    __name(this, "HsDOMUpdate");
  }
  constructor(args) {
    this.priority = 1;
    this.args = args;
  }
  call(args) {
    let newValue = this.args.state();
    let nodeSelector = this.args.element.selector(this.args.hsDocument.rootId, this.args.hsDocument.rootElement);
    let domElement = this.args.hsDocument.document.querySelector(nodeSelector);
    this.args.hsDocument.document.replaceChild(domElement, this.args.element.element());
  }
};
var HsComputedState = class {
  static {
    __name(this, "HsComputedState");
  }
  call(args) {
  }
};
var HsEffectCall = class {
  static {
    __name(this, "HsEffectCall");
  }
  call(args) {
  }
};
function quickSortByPriority(array) {
  if (array.length <= 1) {
    return array;
  }
  let pivot = array[0];
  let left = [];
  let right = [];
  for (let i2 = 1; i2 < array.length; i2++) {
    array[i2].priority < pivot.priority ? left.push(array[i2]) : right.push(array[i2]);
  }
  return quickSortByPriority(left).concat(pivot, quickSortByPriority(right));
}
__name(quickSortByPriority, "quickSortByPriority");
var HsStack = class {
  constructor() {
    this.tasks = [];
  }
  static {
    __name(this, "HsStack");
  }
  pop() {
    if (this.tasks.length > 0) {
      let highestPriorityTask = { ...this.tasks[0] };
      this.tasks = this.tasks.slice(1);
      return highestPriorityTask;
    }
  }
  push(task) {
    this.tasks.push(task);
    this.tasks = quickSortByPriority(this.tasks);
    console.log(this.tasks.map((t) => t.priority));
  }
  empty() {
    return this.tasks.length == 0;
  }
};
var HsRuntime = class {
  static {
    __name(this, "HsRuntime");
  }
  constructor() {
    this.stack = new HsStack();
    this.running = true;
  }
  run(documentMap, root) {
    while (true) {
      if (!this.stack.empty()) {
        let task = this.stack.pop();
        if (task instanceof HsDOMUpdate) {
          task.call(task.args);
        } else if (task instanceof HsComputedState) {
        } else if (task instanceof HsEffectCall) {
        }
      }
    }
  }
};
var HsRegistry = class {
  static {
    __name(this, "HsRegistry");
  }
  constructor() {
    this.runtime = new HsRuntime();
    this.documentRootsMap = {};
    this.documentStates = {};
  }
  register(task) {
    this.runtime.stack.push(task);
  }
  registerStateCalls(root, stateCalls) {
    this.documentStates[root] = stateCalls;
  }
  registerStateUpdate(state2) {
    let root = Object.keys(this.documentStates).find((r) => this.documentStates[r].some((s2) => s2.state.id == state2.id));
    if (root) {
      let hsDocument = this.documentRootsMap[root];
      let stateCalls = this.documentStates[root].filter((s2) => s2.state.id == state2.id);
      for (let stateCall of stateCalls) {
        this.runtime.stack.push(new HsDOMUpdate({ hsDocument, state: stateCall.state, element: stateCall.element }));
      }
    }
  }
  registerHsDocumentRoot(root, document2) {
    if (!Object.keys(this.documentRootsMap).includes(root)) {
      this.documentRootsMap[root] = document2;
    }
  }
  run(root) {
    this.runtime.run(this.documentRootsMap, root);
  }
};
var HSJS2 = new HsRegistry();

// src/state.ts
var ExtensibleFunction = class extends Function {
  static {
    __name(this, "ExtensibleFunction");
  }
  constructor(f) {
    super();
    return Object.setPrototypeOf(f, new.target.prototype);
  }
};
var HsState = class extends ExtensibleFunction {
  static {
    __name(this, "HsState");
  }
  constructor(value) {
    super(() => {
      return this.value;
    });
    this.id = crypto.randomUUID();
    this.value = value;
  }
  set(value) {
    let newValue;
    if (typeof value === "function") {
      newValue = value(this.value);
    } else {
      newValue = value;
    }
    if (newValue != this.value) {
      this.value = newValue;
      HSJS.registerStateUpdate(this);
    }
  }
};

// src/element.ts
var HsTextNode = class _HsTextNode {
  static {
    __name(this, "HsTextNode");
  }
  constructor(text2, ...args) {
    this.id = crypto.randomUUID();
    if (args.length > 0)
      for (let arg of args) {
        if (arg instanceof HsState) {
          text2 = text2.replace("{}", arg());
          this.stateCalls.push(arg);
        } else {
          text2 = text2.replace("{}", arg);
        }
      }
    this.text = text2;
  }
  element() {
    return document.createTextNode(this.text);
  }
  getStateCalls(accumulator) {
    let acc = accumulator || [];
    let stateCalls = this.stateCalls.map((sc) => ({ state: sc, element: this }));
    acc.concat(...stateCalls);
    return acc;
  }
  selector(root, rootElement) {
    let selector = "";
    if (rootElement) {
    }
    if (rootElement instanceof _HsTextNode) {
      selector += `${root}`;
    } else if (rootElement instanceof HsHTMLElement) {
      let rootElementChildren = rootElement?.children();
      if (rootElementChildren.length == 0) {
        if (rootElement instanceof _HsTextNode) {
          selector += `${root}`;
        } else {
          selector += `${root}>${rootElement.name}`;
        }
      } else {
        for (let i2 = 0; i2 < rootElementChildren.length; i2++) {
          let child = rootElementChildren[i2];
          if (child.id == this.id) {
            if (child instanceof _HsTextNode) {
              selector += `${root}>${rootElement.name}:nth-child(${i2 + 1})`;
            } else if (child instanceof HsHTMLElement) {
              selector += `${root}>${rootElement.name}:nth-child(${i2 + 1})>${child.name}`;
            }
            break;
          } else {
            if (child instanceof _HsTextNode) {
              selector += `${root}>${rootElement.name}:nth-child(${i2 + 1})`;
            } else if (child instanceof HsHTMLElement) {
              let newRootSelector = `${root}>${child}:nth-child(${i2 + 1})`;
              selector += `${root}>${child}:nth-child(${i2 + 1})>${child.selector(newRootSelector, rootElementChildren[i2])}`;
            }
          }
        }
      }
    }
    return selector;
  }
};
var HsHTMLElement = class _HsHTMLElement {
  static {
    __name(this, "HsHTMLElement");
  }
  constructor(name, children, style2) {
    this.id = crypto.randomUUID();
    this.name = name;
    if (typeof children == "string") {
      this.$children = [new HsTextNode(children)];
    } else if (Array.isArray(children)) {
      this.$children = [];
      for (let child of children) {
        if (child instanceof HsState) {
          this.$children.push(new HsTextNode("{}", child));
          this.stateCalls.push(child);
        } else {
          this.$children.push(typeof child == "string" ? new HsTextNode(child) : child);
        }
      }
    } else {
      this.$children = [];
    }
    this.$style = style2 || null;
  }
  style(style2) {
    this.$style = style2;
    return this;
  }
  children(children) {
    if (!children)
      return this.$children;
    else {
      for (let child of children) {
        if (child instanceof HsState) {
          this.$children.push(new HsTextNode("{}", child));
        } else {
          this.$children.push(child);
        }
      }
      return this;
    }
  }
  getStateCalls(accumulator) {
    let acc = accumulator || [];
    let stateCalls = this.stateCalls.map((sc) => ({ state: sc, element: this }));
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
    let elementChildren = this.children();
    if (elementChildren.length == 0) {
      return element;
    } else {
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
    } else if (rootElement instanceof _HsHTMLElement) {
      let rootElementChildren = rootElement?.children();
      if (rootElementChildren.length == 0) {
        if (rootElement instanceof HsTextNode) {
          selector += `${root}`;
        } else {
          selector += `${root}>${this.name}`;
        }
      } else {
        for (let i2 = 0; i2 < rootElementChildren.length; i2++) {
          let child = rootElementChildren[i2];
          if (child == this) {
            if (child instanceof HsTextNode) {
              selector += `${root}>${rootElement.name}:nth-child(${i2 + 1})`;
            } else if (child instanceof _HsHTMLElement) {
              selector += `${root}>${rootElement.name}:nth-child(${i2 + 1})>${this.name}`;
            }
            break;
          } else {
            if (child instanceof HsTextNode) {
              selector += `${root}>${rootElement.name}:nth-child(${i2 + 1})`;
            } else if (child instanceof _HsHTMLElement) {
              let newRootSelector = `${root}>${child}:nth-child(${i2 + 1})`;
              selector += `${root}>${child}:nth-child(${i2 + 1})>${child.selector(newRootSelector, rootElementChildren[i2])}`;
            }
          }
        }
      }
    }
    return selector;
  }
};

// src/elements.ts
var a = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("a", children = children);
  return element;
}, "a");
var abbr = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("abbr", children = children);
  return element;
}, "abbr");
var address = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("address", children = children);
  return element;
}, "address");
var area = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("area", children = children);
  return element;
}, "area");
var article = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("article", children = children);
  return element;
}, "article");
var aside = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("aside", children = children);
  return element;
}, "aside");
var audio = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("audio", children = children);
  return element;
}, "audio");
var b = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("b", children = children);
  return element;
}, "b");
var base = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("base", children = children);
  return element;
}, "base");
var bdi = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("bdi", children = children);
  return element;
}, "bdi");
var bdo = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("bdo", children = children);
  return element;
}, "bdo");
var blockquote = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("blockquote", children = children);
  return element;
}, "blockquote");
var body = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("body", children = children);
  return element;
}, "body");
var br = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("br", children = children);
  return element;
}, "br");
var button = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("button", children = children);
  return element;
}, "button");
var canvas = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("canvas", children = children);
  return element;
}, "canvas");
var caption = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("caption", children = children);
  return element;
}, "caption");
var cite = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("cite", children = children);
  return element;
}, "cite");
var code = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("code", children = children);
  return element;
}, "code");
var col = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("col", children = children);
  return element;
}, "col");
var colgroup = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("colgroup", children = children);
  return element;
}, "colgroup");
var data = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("data", children = children);
  return element;
}, "data");
var datalist = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("datalist", children = children);
  return element;
}, "datalist");
var dd = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("dd", children = children);
  return element;
}, "dd");
var del = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("del", children = children);
  return element;
}, "del");
var details = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("details", children = children);
  return element;
}, "details");
var dfn = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("dfn", children = children);
  return element;
}, "dfn");
var dialog = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("dialog", children = children);
  return element;
}, "dialog");
var div = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("div", children = children);
  return element;
}, "div");
var dl = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("dl", children = children);
  return element;
}, "dl");
var dt = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("dt", children = children);
  return element;
}, "dt");
var em = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("em", children = children);
  return element;
}, "em");
var embed = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("embed", children = children);
  return element;
}, "embed");
var fieldset = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("fieldset", children = children);
  return element;
}, "fieldset");
var figcaption = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("figcaption", children = children);
  return element;
}, "figcaption");
var figure = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("figure", children = children);
  return element;
}, "figure");
var footer = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("footer", children = children);
  return element;
}, "footer");
var form = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("form", children = children);
  return element;
}, "form");
var h1 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("h1", children = children);
  return element;
}, "h1");
var h2 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("h2", children = children);
  return element;
}, "h2");
var h3 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("h3", children = children);
  return element;
}, "h3");
var h4 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("h4", children = children);
  return element;
}, "h4");
var h5 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("h5", children = children);
  return element;
}, "h5");
var h6 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("h6", children = children);
  return element;
}, "h6");
var head = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("head", children = children);
  return element;
}, "head");
var header = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("header", children = children);
  return element;
}, "header");
var hgroup = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("hgroup", children = children);
  return element;
}, "hgroup");
var hr = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("hr", children = children);
  return element;
}, "hr");
var html = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("html", children = children);
  return element;
}, "html");
var i = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("i", children = children);
  return element;
}, "i");
var iframe = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("iframe", children = children);
  return element;
}, "iframe");
var img = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("img", children = children);
  return element;
}, "img");
var input = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("input", children = children);
  return element;
}, "input");
var ins = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("ins", children = children);
  return element;
}, "ins");
var kbd = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("kbd", children = children);
  return element;
}, "kbd");
var label = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("label", children = children);
  return element;
}, "label");
var legend = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("legend", children = children);
  return element;
}, "legend");
var li = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("li", children = children);
  return element;
}, "li");
var link = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("link", children = children);
  return element;
}, "link");
var main = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("main", children = children);
  return element;
}, "main");
var map = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("map", children = children);
  return element;
}, "map");
var mark = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("mark", children = children);
  return element;
}, "mark");
var menu = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("menu", children = children);
  return element;
}, "menu");
var meta = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("meta", children = children);
  return element;
}, "meta");
var meter = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("meter", children = children);
  return element;
}, "meter");
var nav = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("nav", children = children);
  return element;
}, "nav");
var noscript = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("noscript", children = children);
  return element;
}, "noscript");
var object = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("object", children = children);
  return element;
}, "object");
var ol = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("ol", children = children);
  return element;
}, "ol");
var optgroup = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("optgroup", children = children);
  return element;
}, "optgroup");
var option = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("option", children = children);
  return element;
}, "option");
var output = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("output", children = children);
  return element;
}, "output");
var p = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("p", children = children);
  return element;
}, "p");
var picture = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("picture", children = children);
  return element;
}, "picture");
var pre = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("pre", children = children);
  return element;
}, "pre");
var progress = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("progress", children = children);
  return element;
}, "progress");
var q = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("q", children = children);
  return element;
}, "q");
var rp = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("rp", children = children);
  return element;
}, "rp");
var rt = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("rt", children = children);
  return element;
}, "rt");
var ruby = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("ruby", children = children);
  return element;
}, "ruby");
var s = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("s", children = children);
  return element;
}, "s");
var samp = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("samp", children = children);
  return element;
}, "samp");
var script = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("script", children = children);
  return element;
}, "script");
var search = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("search", children = children);
  return element;
}, "search");
var section = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("section", children = children);
  return element;
}, "section");
var select = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("select", children = children);
  return element;
}, "select");
var slot = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("slot", children = children);
  return element;
}, "slot");
var small = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("small", children = children);
  return element;
}, "small");
var source = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("source", children = children);
  return element;
}, "source");
var span = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("span", children = children);
  return element;
}, "span");
var strong = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("strong", children = children);
  return element;
}, "strong");
var style = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("style", children = children);
  return element;
}, "style");
var sub = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("sub", children = children);
  return element;
}, "sub");
var summary = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("summary", children = children);
  return element;
}, "summary");
var sup = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("sup", children = children);
  return element;
}, "sup");
var table = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("table", children = children);
  return element;
}, "table");
var tbody = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("tbody", children = children);
  return element;
}, "tbody");
var td = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("td", children = children);
  return element;
}, "td");
var template = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("template", children = children);
  return element;
}, "template");
var textarea = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("textarea", children = children);
  return element;
}, "textarea");
var tfoot = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("tfoot", children = children);
  return element;
}, "tfoot");
var th = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("th", children = children);
  return element;
}, "th");
var thead = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("thead", children = children);
  return element;
}, "thead");
var time = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("time", children = children);
  return element;
}, "time");
var title = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("title", children = children);
  return element;
}, "title");
var tr = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("tr", children = children);
  return element;
}, "tr");
var track = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("track", children = children);
  return element;
}, "track");
var u = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("u", children = children);
  return element;
}, "u");
var ul = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("ul", children = children);
  return element;
}, "ul");
var $var = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("var", children = children);
  return element;
}, "$var");
var video = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("video", children = children);
  return element;
}, "video");
var wbr = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement("wbr", children = children);
  return element;
}, "wbr");

// src/document.ts
var HsDocument = class {
  static {
    __name(this, "HsDocument");
  }
  constructor() {
    if (window) {
      this.window = window;
      this.document = document;
    }
  }
  render(id, element) {
    if (this.document instanceof Document) {
      let target = this.document.getElementById(id);
      if (target instanceof HTMLElement || element instanceof Node) {
        let domElementRoot = element.element();
        target.appendChild(domElementRoot);
        this.rootId = id;
        this.rootElement = element;
        let stateCalls = element.getStateCalls();
        HSJS.registerHsDocumentRoot(id, this);
        HSJS.registerStateCalls(id, stateCalls);
        HSJS.run(id);
      } else
        throw Error("HsJsError: no element found with id " + id);
    }
  }
};

// src/helpers.ts
function text(text2, ...args) {
  return new HsTextNode(text2, ...args);
}
__name(text, "text");
function state(value) {
  return new HsState(value);
}
__name(state, "state");

// src/hsjs.ts
window.HSJS = HSJS2;
export {
  $var,
  HSJS2 as HSJS,
  HsComputedState,
  HsDOMUpdate,
  HsDocument,
  HsEffectCall,
  HsHTMLElement,
  HsRegistry,
  HsRuntime,
  HsStack,
  HsState,
  HsTextNode,
  a,
  abbr,
  address,
  area,
  article,
  aside,
  audio,
  b,
  base,
  bdi,
  bdo,
  blockquote,
  body,
  br,
  button,
  canvas,
  caption,
  cite,
  code,
  col,
  colgroup,
  data,
  datalist,
  dd,
  del,
  details,
  dfn,
  dialog,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  head,
  header,
  hgroup,
  hr,
  html,
  i,
  iframe,
  img,
  input,
  ins,
  kbd,
  label,
  legend,
  li,
  link,
  main,
  map,
  mark,
  menu,
  meta,
  meter,
  nav,
  noscript,
  object,
  ol,
  optgroup,
  option,
  output,
  p,
  picture,
  pre,
  progress,
  q,
  rp,
  rt,
  ruby,
  s,
  samp,
  script,
  search,
  section,
  select,
  slot,
  small,
  source,
  span,
  state,
  strong,
  style,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  template,
  text,
  textarea,
  tfoot,
  th,
  thead,
  time,
  title,
  tr,
  track,
  u,
  ul,
  video,
  wbr
};
