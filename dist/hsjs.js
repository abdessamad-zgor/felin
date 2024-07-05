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
    console.log(newValue);
    let nodeSelector = this.args.hsDocument.selector(this.args.element);
    console.log(nodeSelector);
    let domElement = this.args.hsDocument.document.querySelector(nodeSelector);
    console.log(nodeSelector);
    if (domElement) {
      console.log(domElement);
      console.log(this.args.element.element());
      domElement.replaceWith(this.args.element.element());
    }
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
      let highestPriorityTask = this.tasks[0];
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
  run() {
    if (!this.running) this.running = true;
    while (this.running) {
      if (this.stack.empty()) {
        this.running = false;
        break;
      }
      let task = this.stack.pop();
      console.log(task);
      if (task instanceof HsDOMUpdate) {
        console.log(task);
        task.call(task.args);
      } else if (task instanceof HsComputedState) {
      } else if (task instanceof HsEffectCall) {
      }
    }
  }
  pushTask(task) {
    this.stack.push(task);
    if (!this.running) this.run();
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
    this.runtime.pushTask(task);
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
        let targetElement = stateCall.element;
        if (stateCall.element instanceof HsTextNode) {
          targetElement = stateCall.element.parentNode;
        }
        let domUpdate = new HsDOMUpdate({ hsDocument, state: stateCall.state, element: targetElement });
        this.runtime.pushTask(domUpdate);
      }
    }
  }
  registerHsDocumentRoot(root, document2) {
    if (!Object.keys(this.documentRootsMap).includes(root)) {
      this.documentRootsMap[root] = document2;
    }
  }
  run(root) {
    this.runtime.run();
  }
};
var HSJS2 = new HsRegistry();

// src/element.ts
var HsTextNode = class {
  constructor(text2, ...args) {
    this.stateCalls = [];
    this.id = crypto.randomUUID();
    if (args.length > 0)
      for (let arg of args) {
        if (arg instanceof Function) {
          this.stateCalls.push(arg);
        } else {
          text2 = text2.replace("{}", arg);
        }
      }
    this.text = text2;
  }
  static {
    __name(this, "HsTextNode");
  }
  element(parent) {
    if (parent) {
      this.parentNode = parent;
    }
    let textContent = this.text;
    for (let state2 of this.stateCalls) {
      textContent = textContent.replace("{}", state2());
    }
    return document.createTextNode(textContent);
  }
  getStateCalls(accumulator) {
    let acc = accumulator || [];
    let stateCalls = this.stateCalls.map((sc) => ({ state: sc, element: this }));
    acc = acc.concat(...stateCalls);
    return acc;
  }
};
var HsHTMLElement2 = class {
  constructor(name, children, style2) {
    this.stateCalls = [];
    this.id = crypto.randomUUID();
    this.name = name;
    if (typeof children == "string") {
      this.$children = [new HsTextNode(children)];
    } else if (Array.isArray(children)) {
      this.$children = [];
      for (let child of children) {
        if (child instanceof Function) {
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
    this.$listeners = /* @__PURE__ */ new Map();
  }
  static {
    __name(this, "HsHTMLElement");
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
        if (child instanceof Function) {
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
    for (let entry of this.$listeners.entries()) {
      element.addEventListener(entry[0], entry[1]);
    }
    let elementChildren = this.children();
    if (elementChildren.length == 0) {
      return element;
    } else {
      for (let child of elementChildren) {
        element.appendChild(child.element(this));
      }
      return element;
    }
  }
};

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
var HsString = class extends ExtensibleFunction {
  static {
    __name(this, "HsString");
  }
  constructor(value, parent) {
    super(() => {
      return this.value;
    });
    this.id = crypto.randomUUID();
    this.value = value;
    this.parent = parent;
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
      this.parent?.update(this);
      HSJS.registerStateUpdate(this);
    }
  }
};
var HsNumber = class extends ExtensibleFunction {
  static {
    __name(this, "HsNumber");
  }
  constructor(value, parent) {
    super(() => {
      return this.value;
    });
    this.id = crypto.randomUUID();
    this.value = value;
    this.parent = parent;
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
      this.parent?.update(this);
      HSJS.registerStateUpdate(this);
    }
  }
};
var HsMappedObject = class extends ExtensibleFunction {
  static {
    __name(this, "HsMappedObject");
  }
  constructor(value, parent) {
    super(() => {
      return this.value;
    });
    this.id = crypto.randomUUID();
    this.value = value;
    this.parent = parent;
    for (let key of Object.keys(value)) {
      this[key] = createState(value[key], this);
    }
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
      this.parent?.update(this);
      HSJS.registerStateUpdate(this);
    }
  }
  update(child) {
    for (let key of Object.keys(this)) {
      if (Object.keys(this.value).includes(key) && this[key].id == child.id) {
        this.value[key] = child.value;
      }
    }
    if (this.parent) {
      this.parent.update(this);
    }
  }
};
var HsArray = class extends ExtensibleFunction {
  static {
    __name(this, "HsArray");
  }
  constructor(value, parent) {
    super(() => {
      return this.value;
    });
    this.id = crypto.randomUUID();
    this.value = value;
    this.parent = parent;
    for (let key of Object.keys(value)) {
      this[key] = createState(value[key], this);
    }
    Object.defineProperty(this, "length", {
      get() {
        return this.value.length;
      }
    });
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
      this.parent?.update(this);
      HSJS.registerStateUpdate(this);
    }
  }
  update(child) {
    for (let key of Object.keys(this)) {
      if (Object.keys(this.value).includes(key) && this[key].id == child.id) {
        this.value[key] = child.value;
      }
    }
    if (this.parent) {
      this.parent.update(this);
    }
  }
  get length() {
    let length = this.value.length;
    return length;
  }
};
function createState(value, parent) {
  let typeofValue = typeof value;
  if (typeofValue == "string") {
    return new HsString(value, parent);
  } else if (typeofValue == "number") {
    return new HsNumber(value, parent);
  } else if (Array.isArray(value)) {
    return new HsArray(value, parent);
  } else if (typeofValue == "object") {
    return new HsMappedObject(value, parent);
  }
}
__name(createState, "createState");

// src/elements.ts
var a = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("a", children = children);
  return element;
}, "a");
var abbr = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("abbr", children = children);
  return element;
}, "abbr");
var address = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("address", children = children);
  return element;
}, "address");
var area = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("area", children = children);
  return element;
}, "area");
var article = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("article", children = children);
  return element;
}, "article");
var aside = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("aside", children = children);
  return element;
}, "aside");
var audio = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("audio", children = children);
  return element;
}, "audio");
var b = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("b", children = children);
  return element;
}, "b");
var base = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("base", children = children);
  return element;
}, "base");
var bdi = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("bdi", children = children);
  return element;
}, "bdi");
var bdo = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("bdo", children = children);
  return element;
}, "bdo");
var blockquote = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("blockquote", children = children);
  return element;
}, "blockquote");
var body = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("body", children = children);
  return element;
}, "body");
var br = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("br", children = children);
  return element;
}, "br");
var button = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("button", children = children);
  return element;
}, "button");
var canvas = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("canvas", children = children);
  return element;
}, "canvas");
var caption = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("caption", children = children);
  return element;
}, "caption");
var cite = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("cite", children = children);
  return element;
}, "cite");
var code = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("code", children = children);
  return element;
}, "code");
var col = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("col", children = children);
  return element;
}, "col");
var colgroup = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("colgroup", children = children);
  return element;
}, "colgroup");
var data = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("data", children = children);
  return element;
}, "data");
var datalist = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("datalist", children = children);
  return element;
}, "datalist");
var dd = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("dd", children = children);
  return element;
}, "dd");
var del = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("del", children = children);
  return element;
}, "del");
var details = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("details", children = children);
  return element;
}, "details");
var dfn = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("dfn", children = children);
  return element;
}, "dfn");
var dialog = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("dialog", children = children);
  return element;
}, "dialog");
var div = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("div", children = children);
  return element;
}, "div");
var dl = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("dl", children = children);
  return element;
}, "dl");
var dt = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("dt", children = children);
  return element;
}, "dt");
var em = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("em", children = children);
  return element;
}, "em");
var embed = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("embed", children = children);
  return element;
}, "embed");
var fieldset = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("fieldset", children = children);
  return element;
}, "fieldset");
var figcaption = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("figcaption", children = children);
  return element;
}, "figcaption");
var figure = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("figure", children = children);
  return element;
}, "figure");
var footer = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("footer", children = children);
  return element;
}, "footer");
var form = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("form", children = children);
  return element;
}, "form");
var h1 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("h1", children = children);
  return element;
}, "h1");
var h2 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("h2", children = children);
  return element;
}, "h2");
var h3 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("h3", children = children);
  return element;
}, "h3");
var h4 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("h4", children = children);
  return element;
}, "h4");
var h5 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("h5", children = children);
  return element;
}, "h5");
var h6 = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("h6", children = children);
  return element;
}, "h6");
var head = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("head", children = children);
  return element;
}, "head");
var header = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("header", children = children);
  return element;
}, "header");
var hgroup = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("hgroup", children = children);
  return element;
}, "hgroup");
var hr = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("hr", children = children);
  return element;
}, "hr");
var html = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("html", children = children);
  return element;
}, "html");
var i = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("i", children = children);
  return element;
}, "i");
var iframe = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("iframe", children = children);
  return element;
}, "iframe");
var img = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("img", children = children);
  return element;
}, "img");
var input = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("input", children = children);
  return element;
}, "input");
var ins = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("ins", children = children);
  return element;
}, "ins");
var kbd = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("kbd", children = children);
  return element;
}, "kbd");
var label = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("label", children = children);
  return element;
}, "label");
var legend = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("legend", children = children);
  return element;
}, "legend");
var li = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("li", children = children);
  return element;
}, "li");
var link = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("link", children = children);
  return element;
}, "link");
var main = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("main", children = children);
  return element;
}, "main");
var map = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("map", children = children);
  return element;
}, "map");
var mark = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("mark", children = children);
  return element;
}, "mark");
var menu = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("menu", children = children);
  return element;
}, "menu");
var meta = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("meta", children = children);
  return element;
}, "meta");
var meter = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("meter", children = children);
  return element;
}, "meter");
var nav = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("nav", children = children);
  return element;
}, "nav");
var noscript = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("noscript", children = children);
  return element;
}, "noscript");
var object = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("object", children = children);
  return element;
}, "object");
var ol = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("ol", children = children);
  return element;
}, "ol");
var optgroup = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("optgroup", children = children);
  return element;
}, "optgroup");
var option = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("option", children = children);
  return element;
}, "option");
var output = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("output", children = children);
  return element;
}, "output");
var p = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("p", children = children);
  return element;
}, "p");
var picture = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("picture", children = children);
  return element;
}, "picture");
var pre = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("pre", children = children);
  return element;
}, "pre");
var progress = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("progress", children = children);
  return element;
}, "progress");
var q = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("q", children = children);
  return element;
}, "q");
var rp = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("rp", children = children);
  return element;
}, "rp");
var rt = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("rt", children = children);
  return element;
}, "rt");
var ruby = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("ruby", children = children);
  return element;
}, "ruby");
var s = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("s", children = children);
  return element;
}, "s");
var samp = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("samp", children = children);
  return element;
}, "samp");
var script = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("script", children = children);
  return element;
}, "script");
var search = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("search", children = children);
  return element;
}, "search");
var section = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("section", children = children);
  return element;
}, "section");
var select = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("select", children = children);
  return element;
}, "select");
var slot = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("slot", children = children);
  return element;
}, "slot");
var small = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("small", children = children);
  return element;
}, "small");
var source = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("source", children = children);
  return element;
}, "source");
var span = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("span", children = children);
  return element;
}, "span");
var strong = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("strong", children = children);
  return element;
}, "strong");
var style = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("style", children = children);
  return element;
}, "style");
var sub = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("sub", children = children);
  return element;
}, "sub");
var summary = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("summary", children = children);
  return element;
}, "summary");
var sup = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("sup", children = children);
  return element;
}, "sup");
var table = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("table", children = children);
  return element;
}, "table");
var tbody = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("tbody", children = children);
  return element;
}, "tbody");
var td = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("td", children = children);
  return element;
}, "td");
var template = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("template", children = children);
  return element;
}, "template");
var textarea = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("textarea", children = children);
  return element;
}, "textarea");
var tfoot = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("tfoot", children = children);
  return element;
}, "tfoot");
var th = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("th", children = children);
  return element;
}, "th");
var thead = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("thead", children = children);
  return element;
}, "thead");
var time = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("time", children = children);
  return element;
}, "time");
var title = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("title", children = children);
  return element;
}, "title");
var tr = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("tr", children = children);
  return element;
}, "tr");
var track = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("track", children = children);
  return element;
}, "track");
var u = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("u", children = children);
  return element;
}, "u");
var ul = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("ul", children = children);
  return element;
}, "ul");
var $var = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("var", children = children);
  return element;
}, "$var");
var video = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("video", children = children);
  return element;
}, "video");
var wbr = /* @__PURE__ */ __name((children) => {
  let element = new HsHTMLElement2("wbr", children = children);
  return element;
}, "wbr");

// src/document.ts
var HsDocument2 = class {
  static {
    __name(this, "HsDocument");
  }
  constructor() {
    if (window) {
      this.window = window;
      this.document = document;
    }
  }
  render(selector, element) {
    if (this.document instanceof Document) {
      let target = this.document.querySelector(selector);
      if (target instanceof HTMLElement || element instanceof Node) {
        let domElementRoot = element.element();
        target.appendChild(domElementRoot);
        this.rootSelector = selector;
        this.rootElement = element;
        let stateCalls = element.getStateCalls();
        HSJS.registerHsDocumentRoot(selector, this);
        HSJS.registerStateCalls(selector, stateCalls);
        HSJS.run(selector);
      } else
        throw Error("HsJsError: no element found with selector " + selector);
    }
  }
  selector(element) {
    let elementPath = [];
    let currentElement = element;
    console.log(currentElement);
    let selector = `${this.rootSelector}>${this.rootElement.name}`;
    while (currentElement.id != this.rootElement.id) {
      if (currentElement instanceof HsHTMLElement2) {
        elementPath.push(currentElement);
      }
      currentElement = currentElement.parentNode;
    }
    for (let pathElement of elementPath) {
      selector += `>${pathElement.name}`;
    }
    return selector;
  }
};

// src/helpers.ts
function text(text2, ...args) {
  return new HsTextNode(text2, ...args);
}
__name(text, "text");
function state(value) {
  return createState(value);
}
__name(state, "state");

// src/hsjs.ts
window.HSJS = HSJS2;
export {
  $var,
  HSJS2 as HSJS,
  HsArray,
  HsComputedState,
  HsDOMUpdate,
  HsDocument2 as HsDocument,
  HsEffectCall,
  HsHTMLElement2 as HsHTMLElement,
  HsMappedObject,
  HsNumber,
  HsRegistry,
  HsRuntime,
  HsStack,
  HsString,
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
  createState,
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
