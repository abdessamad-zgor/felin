// src/core.js
var HsTextNode = class {
  /**@type {string}*/
  text;
  constructor(text) {
    this.text = text;
  }
  element() {
    return document.createTextNode(this.text);
  }
};
var HsHTMLElement = class _HsHTMLElement {
  /** @type {import('./types').HTMLElementTagNames} name*/
  name;
  /** @type {HsElement[]} children*/
  $children;
  /** @type {CssStyle|null} style*/
  $style;
  /**
   * Create a new Hot Sticky Element
   *
   * @param {import('./types').HTMLElementTagNames} name
   * @param {HsElement[] | string | undefined} children
   * @param {CssStyle | undefined} style
   * */
  constructor(name2, children, style2) {
    this.name = name2;
    if (typeof children == "string") {
      this.$children = [new HsTextNode(children)];
    } else if (Array.isArray(children)) {
      this.$children = [];
      for (let child of children)
        this.$children.push(typeof child == "string" ? new HsTextNode(child) : child);
    } else {
      this.$children = [];
    }
    this.$style = style2;
  }
  /**
   * @param {CssStyle} style
   * */
  style(style2) {
    this.$style = style2;
    return this;
  }
  /**
   * @param {HsElement[]|undefined} children
   * @returns {HsElement[]|HsElement} 
   * */
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
  /**
   * @param {string} name
   * @param {HsListener} callback
   * */
  listen(name2, callback) {
    return this;
  }
  element() {
    let element = document.createElement(this.name);
    if (this.children().length == 0) {
      return element;
    } else {
      for (let child of this.children()) {
        if (child instanceof HsTextNode) {
          console.log(child);
          element.appendChild(child.element());
        } else if (child instanceof _HsHTMLElement) {
          element.appendChild(child.element());
        }
      }
      return element;
    }
  }
};
var Stack = class {
  /**@type {HsTask[]}*/
  tasks = [];
  constructor() {
  }
  /**
   * returns the task with the highest priority (with the highest being equal to 1)
   *
   * @returns {HsTask}
   * */
  pop() {
    return this.tasks[0];
  }
};

// src/elements.js
var a = (children) => {
  let element = new HsHTMLElement(name = "a", children = children);
  return element;
};
var abbr = (children) => {
  let element = new HsHTMLElement(name = "abbr", children = children);
  return element;
};
var address = (children) => {
  let element = new HsHTMLElement(name = "address", children = children);
  return element;
};
var area = (children) => {
  let element = new HsHTMLElement(name = "area", children = children);
  return element;
};
var article = (children) => {
  let element = new HsHTMLElement(name = "article", children = children);
  return element;
};
var aside = (children) => {
  let element = new HsHTMLElement(name = "aside", children = children);
  return element;
};
var audio = (children) => {
  let element = new HsHTMLElement(name = "audio", children = children);
  return element;
};
var b = (children) => {
  let element = new HsHTMLElement(name = "b", children = children);
  return element;
};
var base = (children) => {
  let element = new HsHTMLElement(name = "base", children = children);
  return element;
};
var bdi = (children) => {
  let element = new HsHTMLElement(name = "bdi", children = children);
  return element;
};
var bdo = (children) => {
  let element = new HsHTMLElement(name = "bdo", children = children);
  return element;
};
var blockquote = (children) => {
  let element = new HsHTMLElement(name = "blockquote", children = children);
  return element;
};
var body = (children) => {
  let element = new HsHTMLElement(name = "body", children = children);
  return element;
};
var br = (children) => {
  let element = new HsHTMLElement(name = "br", children = children);
  return element;
};
var button = (children) => {
  let element = new HsHTMLElement(name = "button", children = children);
  return element;
};
var canvas = (children) => {
  let element = new HsHTMLElement(name = "canvas", children = children);
  return element;
};
var caption = (children) => {
  let element = new HsHTMLElement(name = "caption", children = children);
  return element;
};
var cite = (children) => {
  let element = new HsHTMLElement(name = "cite", children = children);
  return element;
};
var code = (children) => {
  let element = new HsHTMLElement(name = "code", children = children);
  return element;
};
var col = (children) => {
  let element = new HsHTMLElement(name = "col", children = children);
  return element;
};
var colgroup = (children) => {
  let element = new HsHTMLElement(name = "colgroup", children = children);
  return element;
};
var data = (children) => {
  let element = new HsHTMLElement(name = "data", children = children);
  return element;
};
var datalist = (children) => {
  let element = new HsHTMLElement(name = "datalist", children = children);
  return element;
};
var dd = (children) => {
  let element = new HsHTMLElement(name = "dd", children = children);
  return element;
};
var del = (children) => {
  let element = new HsHTMLElement(name = "del", children = children);
  return element;
};
var details = (children) => {
  let element = new HsHTMLElement(name = "details", children = children);
  return element;
};
var dfn = (children) => {
  let element = new HsHTMLElement(name = "dfn", children = children);
  return element;
};
var dialog = (children) => {
  let element = new HsHTMLElement(name = "dialog", children = children);
  return element;
};
var div = (children) => {
  let element = new HsHTMLElement(name = "div", children = children);
  return element;
};
var dl = (children) => {
  let element = new HsHTMLElement(name = "dl", children = children);
  return element;
};
var dt = (children) => {
  let element = new HsHTMLElement(name = "dt", children = children);
  return element;
};
var em = (children) => {
  let element = new HsHTMLElement(name = "em", children = children);
  return element;
};
var embed = (children) => {
  let element = new HsHTMLElement(name = "embed", children = children);
  return element;
};
var fieldset = (children) => {
  let element = new HsHTMLElement(name = "fieldset", children = children);
  return element;
};
var figcaption = (children) => {
  let element = new HsHTMLElement(name = "figcaption", children = children);
  return element;
};
var figure = (children) => {
  let element = new HsHTMLElement(name = "figure", children = children);
  return element;
};
var footer = (children) => {
  let element = new HsHTMLElement(name = "footer", children = children);
  return element;
};
var form = (children) => {
  let element = new HsHTMLElement(name = "form", children = children);
  return element;
};
var h1 = (children) => {
  let element = new HsHTMLElement(name = "h1", children = children);
  return element;
};
var h2 = (children) => {
  let element = new HsHTMLElement(name = "h2", children = children);
  return element;
};
var h3 = (children) => {
  let element = new HsHTMLElement(name = "h3", children = children);
  return element;
};
var h4 = (children) => {
  let element = new HsHTMLElement(name = "h4", children = children);
  return element;
};
var h5 = (children) => {
  let element = new HsHTMLElement(name = "h5", children = children);
  return element;
};
var h6 = (children) => {
  let element = new HsHTMLElement(name = "h6", children = children);
  return element;
};
var head = (children) => {
  let element = new HsHTMLElement(name = "head", children = children);
  return element;
};
var header = (children) => {
  let element = new HsHTMLElement(name = "header", children = children);
  return element;
};
var hgroup = (children) => {
  let element = new HsHTMLElement(name = "hgroup", children = children);
  return element;
};
var hr = (children) => {
  let element = new HsHTMLElement(name = "hr", children = children);
  return element;
};
var html = (children) => {
  let element = new HsHTMLElement(name = "html", children = children);
  return element;
};
var i = (children) => {
  let element = new HsHTMLElement(name = "i", children = children);
  return element;
};
var iframe = (children) => {
  let element = new HsHTMLElement(name = "iframe", children = children);
  return element;
};
var img = (children) => {
  let element = new HsHTMLElement(name = "img", children = children);
  return element;
};
var input = (children) => {
  let element = new HsHTMLElement(name = "input", children = children);
  return element;
};
var ins = (children) => {
  let element = new HsHTMLElement(name = "ins", children = children);
  return element;
};
var kbd = (children) => {
  let element = new HsHTMLElement(name = "kbd", children = children);
  return element;
};
var label = (children) => {
  let element = new HsHTMLElement(name = "label", children = children);
  return element;
};
var legend = (children) => {
  let element = new HsHTMLElement(name = "legend", children = children);
  return element;
};
var li = (children) => {
  let element = new HsHTMLElement(name = "li", children = children);
  return element;
};
var link = (children) => {
  let element = new HsHTMLElement(name = "link", children = children);
  return element;
};
var main = (children) => {
  let element = new HsHTMLElement(name = "main", children = children);
  return element;
};
var map = (children) => {
  let element = new HsHTMLElement(name = "map", children = children);
  return element;
};
var mark = (children) => {
  let element = new HsHTMLElement(name = "mark", children = children);
  return element;
};
var menu = (children) => {
  let element = new HsHTMLElement(name = "menu", children = children);
  return element;
};
var meta = (children) => {
  let element = new HsHTMLElement(name = "meta", children = children);
  return element;
};
var meter = (children) => {
  let element = new HsHTMLElement(name = "meter", children = children);
  return element;
};
var nav = (children) => {
  let element = new HsHTMLElement(name = "nav", children = children);
  return element;
};
var noscript = (children) => {
  let element = new HsHTMLElement(name = "noscript", children = children);
  return element;
};
var object = (children) => {
  let element = new HsHTMLElement(name = "object", children = children);
  return element;
};
var ol = (children) => {
  let element = new HsHTMLElement(name = "ol", children = children);
  return element;
};
var optgroup = (children) => {
  let element = new HsHTMLElement(name = "optgroup", children = children);
  return element;
};
var option = (children) => {
  let element = new HsHTMLElement(name = "option", children = children);
  return element;
};
var output = (children) => {
  let element = new HsHTMLElement(name = "output", children = children);
  return element;
};
var p = (children) => {
  let element = new HsHTMLElement(name = "p", children = children);
  return element;
};
var picture = (children) => {
  let element = new HsHTMLElement(name = "picture", children = children);
  return element;
};
var pre = (children) => {
  let element = new HsHTMLElement(name = "pre", children = children);
  return element;
};
var progress = (children) => {
  let element = new HsHTMLElement(name = "progress", children = children);
  return element;
};
var q = (children) => {
  let element = new HsHTMLElement(name = "q", children = children);
  return element;
};
var rp = (children) => {
  let element = new HsHTMLElement(name = "rp", children = children);
  return element;
};
var rt = (children) => {
  let element = new HsHTMLElement(name = "rt", children = children);
  return element;
};
var ruby = (children) => {
  let element = new HsHTMLElement(name = "ruby", children = children);
  return element;
};
var s = (children) => {
  let element = new HsHTMLElement(name = "s", children = children);
  return element;
};
var samp = (children) => {
  let element = new HsHTMLElement(name = "samp", children = children);
  return element;
};
var script = (children) => {
  let element = new HsHTMLElement(name = "script", children = children);
  return element;
};
var search = (children) => {
  let element = new HsHTMLElement(name = "search", children = children);
  return element;
};
var section = (children) => {
  let element = new HsHTMLElement(name = "section", children = children);
  return element;
};
var select = (children) => {
  let element = new HsHTMLElement(name = "select", children = children);
  return element;
};
var slot = (children) => {
  let element = new HsHTMLElement(name = "slot", children = children);
  return element;
};
var small = (children) => {
  let element = new HsHTMLElement(name = "small", children = children);
  return element;
};
var source = (children) => {
  let element = new HsHTMLElement(name = "source", children = children);
  return element;
};
var span = (children) => {
  let element = new HsHTMLElement(name = "span", children = children);
  return element;
};
var strong = (children) => {
  let element = new HsHTMLElement(name = "strong", children = children);
  return element;
};
var style = (children) => {
  let element = new HsHTMLElement(name = "style", children = children);
  return element;
};
var sub = (children) => {
  let element = new HsHTMLElement(name = "sub", children = children);
  return element;
};
var summary = (children) => {
  let element = new HsHTMLElement(name = "summary", children = children);
  return element;
};
var sup = (children) => {
  let element = new HsHTMLElement(name = "sup", children = children);
  return element;
};
var table = (children) => {
  let element = new HsHTMLElement(name = "table", children = children);
  return element;
};
var tbody = (children) => {
  let element = new HsHTMLElement(name = "tbody", children = children);
  return element;
};
var td = (children) => {
  let element = new HsHTMLElement(name = "td", children = children);
  return element;
};
var template = (children) => {
  let element = new HsHTMLElement(name = "template", children = children);
  return element;
};
var textarea = (children) => {
  let element = new HsHTMLElement(name = "textarea", children = children);
  return element;
};
var tfoot = (children) => {
  let element = new HsHTMLElement(name = "tfoot", children = children);
  return element;
};
var th = (children) => {
  let element = new HsHTMLElement(name = "th", children = children);
  return element;
};
var thead = (children) => {
  let element = new HsHTMLElement(name = "thead", children = children);
  return element;
};
var time = (children) => {
  let element = new HsHTMLElement(name = "time", children = children);
  return element;
};
var title = (children) => {
  let element = new HsHTMLElement(name = "title", children = children);
  return element;
};
var tr = (children) => {
  let element = new HsHTMLElement(name = "tr", children = children);
  return element;
};
var track = (children) => {
  let element = new HsHTMLElement(name = "track", children = children);
  return element;
};
var u = (children) => {
  let element = new HsHTMLElement(name = "u", children = children);
  return element;
};
var ul = (children) => {
  let element = new HsHTMLElement(name = "ul", children = children);
  return element;
};
var $var = (children) => {
  let element = new HsHTMLElement(name = "var", children = children);
  return element;
};
var video = (children) => {
  let element = new HsHTMLElement(name = "video", children = children);
  return element;
};
var wbr = (children) => {
  let element = new HsHTMLElement(name = "wbr", children = children);
  return element;
};

// src/document.js
var HsDocument = class {
  /**@type {Document | {}} */
  document = window ? document : {};
  constructor() {
  }
  /**
   * @method 
   * @param {string} id
   * @param {HsElement} element
   * @returns {void}
   * */
  render(id, element) {
    if (this.document != {}) {
      let target = this.document.getElementById(id);
      if (target instanceof HTMLElement || element instanceof Node) {
        let domElementRoot = element.element();
        target.appendChild(domElementRoot);
      } else
        throw Error("HsJsError: no element found with id " + id);
    }
  }
};
export {
  $var,
  HsDocument,
  HsHTMLElement,
  HsTextNode,
  Stack,
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
  strong,
  style,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  template,
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
