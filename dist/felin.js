class v {
  constructor(t) {
    this.priority = 1, this.args = t;
  }
  call() {
    for (let t of this.args.state.elements) {
      this.args.state();
      let n = this.args.document.selector(t), r = this.args.document.document.querySelector(n);
      r && r.replaceWith(t.element());
    }
  }
}
class A {
  constructor(t) {
    this.args = t, this.priority = 2;
  }
  call() {
    let t = this.args.fn(...this.args.states);
    this.args.value = t;
  }
}
class N {
  constructor(t) {
    this.args = t, this.priority = 3;
  }
  call() {
    this.args.effect();
  }
}
class M {
  constructor(t) {
    this.args = t, this.priority = 4;
  }
  call() {
    this.args.router.matchRoute(this.args.path);
    let t = this.args.router.active, n = this.args.router.previous;
    if (n.length > 0)
      for (let s of n) {
        let i = s.parent;
        i._children = i._children.filter((u) => u._id != s.element._id);
      }
    for (let s of t)
      s.parent._children.splice(s.index, 0, s.element);
    let r = t.map((s) => s.parent);
    for (let s of r)
      this.args.document.rerenderElement(s);
    this.args.document.window.history.pushState("", "", this.args.path);
  }
}
class R {
  constructor(t) {
    this.priority = 0, this.args = t;
  }
  call() {
    Felin.initEffectRegistry(this.args);
  }
}
class E {
  constructor(t) {
    this.priority = 0, this.args = t;
  }
  call() {
    Felin.initComputedRegistry(this.args);
  }
}
var g = /* @__PURE__ */ ((e) => (e[e.NUMBER = 0] = "NUMBER", e[e.STRING = 1] = "STRING", e[e.BOOLEAN = 2] = "BOOLEAN", e[e.OBJECT = 3] = "OBJECT", e[e.MAP = 4] = "MAP", e[e.SET = 5] = "SET", e[e.ARRAY = 6] = "ARRAY", e[e.ANY = 7] = "ANY", e))(g || {});
function x(e) {
  let t = "";
  for (let n of Object.keys(e)) {
    let r = n.split("").map((s, i) => n.charCodeAt(i) >= 65 && n.charCodeAt(i) <= 90 ? "-" + s.toLowerCase() : s);
    t += r.join("") + ": " + e[n] + ";";
  }
  return t;
}
function L(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t = e; Object.getPrototypeOf(t = Object.getPrototypeOf(t)) !== null; ) ;
  return Object.getPrototypeOf(e) === t;
}
function D(e) {
  return typeof e == "string" ? 1 : typeof e == "number" ? 0 : typeof e == "boolean" ? 2 : Array.isArray(e) ? 6 : L(e) ? 3 : 7;
}
function p(e) {
  let t = e.prototype;
  return Object.getOwnPropertyNames(t).filter((r) => typeof e[r] == "function" && r != "constructor");
}
function d(e, t) {
  if (t) {
    let n = 1, r = t.findIndex((i) => i._id == e._id) + n, s = null;
    for (; r < t.length; ) {
      if (s = t[r], s instanceof o || s instanceof l) {
        if (s._children.length != 0)
          return s = t[r], t = [...t, ...s._children], d(s, t);
        continue;
      }
      n++, r = t.findIndex((i) => i._id == e._id) + n;
    }
    return t;
  } else {
    let n = [];
    return e instanceof l || e instanceof o ? e._children.length > 0 ? (n = [e, ...e._children], d(e, n)) : (n = [e], n) : (n = [e], n);
  }
}
class k extends Function {
  constructor(t) {
    return super(), Object.setPrototypeOf(t, new.target.prototype);
  }
}
class a extends k {
  constructor(t, ...n) {
    super(() => (this.value = this.fn(...this.states), this.value)), this.elements = [], this.fn = t, this.states = n, this.value = t(...n), this._id = crypto.randomUUID(), Felin.registerComputed(this);
  }
  setElement(t) {
    this.elements.push(t);
  }
}
class f extends k {
  constructor(t, n) {
    switch (super(() => this.state.value), this.elements = [], this._id = crypto.randomUUID(), n && (this.parent = n), D(t)) {
      case g.OBJECT:
        this.state = new S(t), this.state.parent = this;
        break;
      case g.ARRAY:
        this.state = new C(t), this.state.parent = this;
        break;
      case g.NUMBER:
        this.state = new O(t), this.state.parent = this;
        break;
      case g.STRING:
        this.state = new U(t), this.state.parent = this;
        break;
      case g.BOOLEAN:
        this.state = new T(t), this.state.parent = this;
        break;
      case g.ANY:
        throw Error("Error: unsupported state data type.");
    }
    if (this.state instanceof S) {
      let r = {
        get: (s, i, u) => {
          if (i == "set")
            return this.set;
          if (p(s.state).includes(i))
            return s.state[i];
          if (Object.keys(s()).includes(i)) {
            let m = s.state[i];
            return new f(m, { state: this, key: i });
          } else
            return Reflect.get(s, i, u);
        }
      };
      return new Proxy(this, r);
    } else if (this.state instanceof C) {
      let r = {
        get: (s, i, u) => {
          if (i == "set")
            return this.set;
          if (p(s.state).includes(i))
            return s.state[i];
          if (Object.keys(s()).includes(i)) {
            let m = s.state[i];
            return new f(m, { state: this, key: i });
          } else
            return Reflect.get(s, i, u);
        }
      };
      return new Proxy(this, r);
    } else if (this.state instanceof O) {
      let r = {
        get: (s, i, u) => i == "set" ? s.set : p(s.state).includes(i) ? s.state[i] : Reflect.get(s, i, u)
      };
      return new Proxy(this, r);
    }
  }
  set(t, n) {
    let r = this.state.value;
    if (n)
      for (let s of Object.keys(this.state.value))
        s == n.parent.key && (r[s] = n.state.value);
    t && (typeof t == "function" ? r = t(this.state.value) : r = t, this.state.value = r), this.parent ? (this.state.value = r, this.parent.state.set(void 0, this)) : (this.state.value = r, Felin.registerStateUpdate(this));
  }
  setElement(t) {
    this.elements.push(t);
  }
}
class C {
  constructor(t) {
    this.value = t;
    let n = {
      get: (r, s, i) => p(r).includes(s) ? r[s] : Object.keys(r.value).includes(s) ? r.value[s] : Reflect.get(r, s, i)
    };
    return new Proxy(this, n);
  }
  map() {
  }
  filter() {
  }
  reduce() {
  }
  find() {
  }
  every() {
  }
  some() {
  }
}
class T {
  constructor(t) {
    this.value = t;
  }
}
class S {
  constructor(t) {
    this.value = t;
    let n = {
      get: (r, s, i) => Object.keys(r.value).includes(s) ? r.value[s] : Reflect.get(r, s, i)
    };
    return new Proxy(this, n);
  }
  keys() {
    return new a(() => Object.keys(this.value), this.parent);
  }
  values() {
    return new a(() => Object.values(this.value), this.parent);
  }
  has(t) {
    return new a(() => Object.keys(this.value).includes(t), this.parent);
  }
}
class U {
  constructor(t) {
    this.value = t;
  }
}
class O {
  constructor(t) {
    this.value = t;
  }
  gt(t) {
    return new a(() => this.value > t, this.parent);
  }
  gte(t) {
    return new a(() => this.value >= t, this.parent);
  }
  lt(t) {
    return new a(() => this.value < t, this.parent);
  }
  lte(t) {
    return new a(() => this.value <= t, this.parent);
  }
  eq(t) {
    return new a(() => this.value == t, this.parent);
  }
}
class F {
  constructor(...t) {
    this.routes = t, this.params = {}, this.previous = [], this.active = [];
  }
  matchRoute(t) {
    if (this.active.length > 0 && (this.previous = [...this.active], this.active = []), t == "/") {
      let s = this.routes.find((i) => i.path == "/");
      if (s) {
        this.active = [s];
        return;
      }
      return;
    }
    let n = t.split("/").filter((s) => s != "");
    console.log(n);
    let r;
    for (let s = 0; s < n.length; s++) {
      if (r) {
        r = void 0;
        for (let i of r.children) {
          let u = i.path.split("/");
          if (u[s].startsWith(":")) {
            this.params = { [u[s].slice(1)]: Number.isNaN(+n[s]) ? +n[s] : n[s] }, r = i;
            break;
          } else if (u[s] == n[s]) {
            r = i;
            break;
          }
        }
      } else
        for (let i of this.routes) {
          let u = i.path.split("/");
          if (n[s] == u[s]) {
            r = i;
            break;
          }
        }
      if (r != null) {
        this.active.push(r);
        continue;
      } else if (s == 0) {
        let i = this.routes.find((u) => u.path == "*");
        i != null && (this.active = [i]);
        break;
      } else if (this.active.length < s + 1)
        break;
    }
  }
  buildRouterTree() {
    for (let t of this.routes) {
      let n = t.element;
      if (n instanceof l) {
        if (n.register.router)
          throw Error("Cannot have nested routers inside the same element tree");
        if (n.register.routes && n.register.routes.length > 0)
          for (let r of n.register.routes)
            r.parentRoute = t, t.children.push(r);
      }
    }
    return this;
  }
}
class P {
  constructor(t, n) {
    this.children = [], this.path = t, this.element = n;
  }
}
class c {
  constructor(t, ...n) {
    if (this._id = crypto.randomUUID(), this.register = {}, n.length > 0)
      for (let r of n) {
        if (r instanceof f) {
          r.setElement(this), this.register.states || (this.register.states = []), this.register.states.push(r), t = t.replace("{}", r());
          continue;
        }
        t = t.replace("{}", r);
      }
    this.text = t.toString();
  }
  element() {
    let t = this.text;
    for (let n of this.register.states)
      t = t.replace("{}", n());
    return document.createTextNode(t);
  }
}
class l {
  constructor(t, n) {
    if (this._id = crypto.randomUUID(), this.name = t, this.register = {}, Array.isArray(n)) {
      this._children = [];
      for (let r = 0; r < n.length; r++) {
        let s = n[r];
        if (s instanceof f)
          this._children.push(new c("{}", s)), s.setElement(this), this.register.states || (this.register.states = []), this.register.states.push(s);
        else if (s instanceof a)
          this._children.push(new c("{}", s)), s.setElement(this), this.register.computed || (this.register.computed = []), this.register.computed.push(s);
        else if (s instanceof F) {
          if (this.register.router)
            throw Error("Cannot have multiple routers in the same element tree.");
          s.parent = this, s.index = r, this.register.router = s;
          for (let i of this.register.router.routes)
            i.parent = this, i.index = r;
        } else if (s instanceof P)
          s.parent = this, s.index = r, Array.isArray(this.register.routes) || (this.register.routes = []), this.register.routes.push(s);
        else if (s instanceof l || s instanceof o || s instanceof c)
          s.parent = this, this._children.push(s);
        else if (typeof s == "string" || typeof s == "number") {
          let i = new c(s.toString());
          this._children.push(i);
        }
      }
    } else
      this._children = [];
    this._style = null, this._listeners = /* @__PURE__ */ new Map(), this._attributes = {};
  }
  style(t) {
    return this._style = t, this;
  }
  children(t) {
    for (let n of t)
      if (n instanceof f || n instanceof a) {
        let r = new c("{}", n());
        r.parent = this, this._children.push(r);
      } else
        this._children.push(n);
    return this;
  }
  listener(t, n) {
    return this._listeners.has(t) || this._listeners.set(t, n), this;
  }
  element() {
    let t = document.createElement(this.name);
    for (let r of this._listeners.entries())
      t.addEventListener(r[0], r[1]);
    this._style && (t.style.cssText = x(this._style)), this._classname && t.classList.add(...this._classname.split(" "));
    for (let r of Object.keys(this._attributes))
      t.setAttribute(r, this._attributes[r]);
    let n = this._children;
    if (n.length == 0)
      return t;
    for (let r of n)
      t.appendChild(r.element());
    return t;
  }
  class(t) {
    this._classname = t;
  }
  attr(t, n) {
    this._attributes[t] = n;
  }
  attrs(t) {
    this._attributes = { ...this._attributes, ...t };
  }
}
class o {
  constructor(t, n) {
    this._id = crypto.randomUUID(), this.name = t, this.register = {}, this._children = [];
    for (let r of n)
      if (r instanceof f) {
        let s = new c("{}", r);
        s.parent = this, this._children.push(s), this.register.states || (this.register.states = []), this.register.states.push(r), this.register.states.push(r);
      } else if (r instanceof a) {
        let s = new c("{}", r);
        s.parent = this, this._children.push(s), this.register.computed || (this.register.computed = []), this.register.computed.push(r);
      } else
        this._children.push(typeof r == "string" ? new c(r) : r);
    this._style = null, this._listeners = /* @__PURE__ */ new Map(), this._attributes = {};
  }
  style(t) {
    return this._style = t, this;
  }
  children(t) {
    for (let n of t)
      n instanceof f ? this._children.push(new c("{}", n)) : this._children.push(n);
    return this;
  }
  listener(t, n) {
    return this._listeners.has(t) || this._listeners.set(t, n), this;
  }
  element(t) {
    t && (this.parent = t);
    let n = document.createElementNS("http://www.w3.org/2000/svg", this.name);
    for (let s of this._listeners.entries())
      n.addEventListener(s[0], s[1]);
    this._style && (n.style.cssText = x(this._style)), this._classname && n.classList.add(...this._classname.split(" "));
    for (let s of Object.keys(this._attributes))
      n.setAttribute(s, this._attributes[s]);
    let r = this._children;
    if (r.length == 0)
      return n;
    for (let s of r)
      n.appendChild(s.element(this));
    return n;
  }
  class(t) {
    this._classname = t;
  }
  attr(t, n) {
    this._attributes[t] = n;
  }
  attrs(t) {
    this._attributes = { ...this._attributes, ...t };
  }
}
function _(e) {
  if (e.length <= 1)
    return e;
  let t = e[0], n = [], r = [];
  for (let s = 1; s < e.length; s++)
    e[s].priority < t.priority ? n.push(e[s]) : r.push(e[s]);
  return _(n).concat(t, _(r));
}
class B {
  constructor() {
    this.tasks = [], this.running = !1;
  }
  pop() {
    if (this.tasks.length > 0) {
      let t = this.tasks[0];
      return this.tasks = this.tasks.slice(1), t;
    }
  }
  push(t) {
    this.tasks.push(t), this.tasks = _(this.tasks), this.running || this.run();
  }
  empty() {
    return this.tasks.length == 0;
  }
  run() {
    for (this.running || (this.running = !0); this.running; ) {
      if (this.empty()) {
        this.running = !1;
        break;
      }
      this.pop().call();
    }
  }
}
class I {
  constructor() {
    this.stack = new B(), this.register = {};
  }
  initEffectRegistry(t) {
    let n = Object.keys(this.register).find((r) => t.states.map((s) => s._id).some((s) => this.register[r].states.map((i) => i._id).includes(s)));
    n ? (this.register[n].effects || (this.register[n].effects = []), this.register[n].effects.push(t)) : this.stack.push(new R(t));
  }
  initComputedRegistry(t) {
    let n = Object.keys(this.register).find((r) => t.states.map((s) => s._id).some((s) => this.register[r].states.map((i) => i._id).includes(s)));
    n ? (this.register[n].computed || (this.register[n].computed = []), this.register[n].computed.push(t)) : this.stack.push(new E(t));
  }
  registerStates(t, n) {
    this.register[t].states = n;
  }
  registerStateUpdate(t) {
    let n = Object.keys(this.register).find((r) => this.register[r].states.some((s) => s._id == t._id));
    if (n) {
      let r = this.register[n].document, s = this.register[n].states.filter((m) => m._id == t._id);
      for (let m of s) {
        let h = m.elements;
        for (let w of h) {
          w instanceof c && (w = w.parent);
          let b = new v({ document: r, state: m });
          this.stack.push(b);
        }
      }
      let i = this.register[n].computed.find((m) => m.states.some((h) => h._id == t._id));
      if (i) {
        let m = new A(i);
        this.stack.push(m);
        let h = this.register[n].computed.filter((w) => w._id == i._id);
        for (let w of h) {
          let b = w.elements;
          for (let y of b) {
            y instanceof c && (y = y.parent);
            let j = new v({ document: r, state: w });
            this.stack.push(j);
          }
        }
      }
      let u = this.register[n].effects.find((m) => m.states.some((h) => h._id == t._id));
      if (u) {
        let m = new N(u);
        this.stack.push(m);
      }
    }
  }
  registerFlDocumentRoot(t, n) {
    Object.keys(this.register).includes(t) || (this.register[t] = {}), this.register[t].document = n;
  }
  run() {
    this.stack.run();
  }
  registerEffect(t) {
    let n = new R(t);
    setTimeout(() => {
      this.stack.push(n);
    }, 1e3);
  }
  registerComputed(t) {
    let n = new E(t);
    setTimeout(() => {
      this.stack.push(n);
    }, 1e3);
  }
  registerActiveRouter(t, n) {
    Object.keys(this.register).includes(t) || (this.register[t] = {}), this.register[t].router = n, this.registerRouteChange(window.location.href.slice(window.location.host.length + window.location.protocol.length + 2), t);
  }
  registerRouteChange(t, n) {
    let r = { path: t, router: this.register[n].router, document: this.register[n].document }, s = new M(r);
    this.stack.push(s);
  }
  getElementRootSelector(t, n) {
    let r, s = !1;
    if (n) {
      for (let i of n._children)
        i._id == t._id ? s = !0 : i instanceof l && (s = this.getElementRootSelector(t, i));
      return s;
    } else {
      for (let i of Object.keys(this.register)) {
        let u = this.register[i].document;
        for (let m of u.rootElement._children)
          (m._id == t._id || m instanceof l && this.getElementRootSelector(t, m) == !0) && (r = i);
      }
      return r;
    }
  }
  getRouterParams() {
    let t = Object.keys(this.register).map((r) => this.register[r].router), n = {};
    for (let r of t)
      r.active.length > 0 && (n = r.params);
    return n;
  }
}
const $ = new I();
class G {
  constructor(t, ...n) {
    this.effect = t, this.states = n, this._id = crypto.randomUUID(), Felin.registerEffect(this);
  }
}
class q {
  constructor(t, n, r) {
    this.condition = t, this._true = n, this._false = r;
  }
  element(t) {
    return t && (this.parent = t), this.condition() ? this._true.element() : this._false.element();
  }
}
class Y {
  constructor(t, n) {
    this.state = t, this.iteration = n;
  }
}
class W extends k {
  constructor(t) {
    super((n) => (this.props = n, this)), this.fn = t;
  }
  element(t) {
    return t && (this.parentNode = t), this.fn(this.props).element();
  }
}
const H = (...e) => new l("a", e = e), z = (...e) => new l("abbr", e = e), K = (...e) => new l("address", e = e), Q = (...e) => new l("area", e = e), X = (...e) => new l("article", e = e), Z = (...e) => new l("aside", e = e), V = (...e) => new l("audio", e = e), ee = (...e) => new l("b", e = e), te = (...e) => new l("base", e = e), ne = (...e) => new l("bdi", e = e), se = (...e) => new l("bdo", e = e), re = (...e) => new l("blockquote", e = e), le = (...e) => new l("body", e = e), ie = (...e) => new l("br", e = e), oe = (...e) => new l("button", e = e), ue = (...e) => new l("canvas", e = e), me = (...e) => new l("caption", e = e), ae = (...e) => new l("cite", e = e), ce = (...e) => new l("code", e = e), fe = (...e) => new l("col", e = e), he = (...e) => new l("colgroup", e = e), we = (...e) => new l("data", e = e), ge = (...e) => new l("datalist", e = e), pe = (...e) => new l("dd", e = e), de = (...e) => new l("del", e = e), be = (...e) => new l("details", e = e), ye = (...e) => new l("dfn", e = e), _e = (...e) => new l("dialog", e = e), ke = (...e) => new l("div", e = e), ve = (...e) => new l("dl", e = e), Re = (...e) => new l("dt", e = e), Ee = (...e) => new l("em", e = e), Ce = (...e) => new l("embed", e = e), Se = (...e) => new l("fieldset", e = e), Oe = (...e) => new l("figcaption", e = e), xe = (...e) => new l("figure", e = e), Fe = (...e) => new l("footer", e = e), Pe = (...e) => new l("form", e = e), je = (...e) => new l("h1", e = e), Ae = (...e) => new l("h2", e = e), Ne = (...e) => new l("h3", e = e), Me = (...e) => new l("h4", e = e), Le = (...e) => new l("h5", e = e), De = (...e) => new l("h6", e = e), Te = (...e) => new l("head", e = e), Ue = (...e) => new l("header", e = e), Be = (...e) => new l("hgroup", e = e), Ie = (...e) => new l("hr", e = e), $e = (...e) => new l("html", e = e), Ge = (...e) => new l("i", e = e), qe = (...e) => new l("iframe", e = e), Ye = (...e) => new l("img", e = e), Je = (...e) => new l("input", e = e), We = (...e) => new l("ins", e = e), He = (...e) => new l("kbd", e = e), ze = (...e) => new l("label", e = e), Ke = (...e) => new l("legend", e = e), Qe = (...e) => new l("li", e = e), Xe = (...e) => new l("link", e = e), Ze = (...e) => new l("main", e = e), Ve = (...e) => new l("map", e = e), et = (...e) => new l("mark", e = e), tt = (...e) => new l("menu", e = e), nt = (...e) => new l("meta", e = e), st = (...e) => new l("meter", e = e), rt = (...e) => new l("nav", e = e), lt = (...e) => new l("noscript", e = e), it = (...e) => new l("object", e = e), ot = (...e) => new l("ol", e = e), ut = (...e) => new l("optgroup", e = e), mt = (...e) => new l("option", e = e), at = (...e) => new l("output", e = e), ct = (...e) => new l("p", e = e), ft = (...e) => new l("picture", e = e), ht = (...e) => new l("pre", e = e), wt = (...e) => new l("progress", e = e), gt = (...e) => new l("q", e = e), pt = (...e) => new l("rp", e = e), dt = (...e) => new l("rt", e = e), bt = (...e) => new l("ruby", e = e), yt = (...e) => new l("s", e = e), _t = (...e) => new l("samp", e = e), kt = (...e) => new l("search", e = e), vt = (...e) => new l("section", e = e), Rt = (...e) => new l("select", e = e), Et = (...e) => new l("slot", e = e), Ct = (...e) => new l("small", e = e), St = (...e) => new l("source", e = e), Ot = (...e) => new l("span", e = e), xt = (...e) => new l("strong", e = e), Ft = (...e) => new l("sub", e = e), Pt = (...e) => new l("summary", e = e), jt = (...e) => new l("sup", e = e), At = (...e) => new l("table", e = e), Nt = (...e) => new l("tbody", e = e), Mt = (...e) => new l("td", e = e), Lt = (...e) => new l("template", e = e), Dt = (...e) => new l("textarea", e = e), Tt = (...e) => new l("tfoot", e = e), Ut = (...e) => new l("th", e = e), Bt = (...e) => new l("thead", e = e), It = (...e) => new l("time", e = e), $t = (...e) => new l("title", e = e), Gt = (...e) => new l("tr", e = e), qt = (...e) => new l("track", e = e), Yt = (...e) => new l("u", e = e), Jt = (...e) => new l("ul", e = e), Wt = (...e) => new l("var", e = e), Ht = (...e) => new l("video", e = e), zt = (...e) => new l("wbr", e = e), Kt = (...e) => new o("a", e = e), Qt = (...e) => new o("animate", e = e), Xt = (...e) => new o("animateMotion", e = e), Zt = (...e) => new o("animateTransform", e = e), Vt = (...e) => new o("circle", e = e), en = (...e) => new o("clipPath", e = e), tn = (...e) => new o("defs", e = e), nn = (...e) => new o("desc", e = e), sn = (...e) => new o("ellipse", e = e), rn = (...e) => new o("feBlend", e = e), ln = (...e) => new o("feColorMatrix", e = e), on = (...e) => new o("feComponentTransfer", e = e), un = (...e) => new o("feComposite", e = e), mn = (...e) => new o("feConvolveMatrix", e = e), an = (...e) => new o("feDiffuseLighting", e = e), cn = (...e) => new o("feDisplacementMap", e = e), fn = (...e) => new o("feDistantLight", e = e), hn = (...e) => new o("feDropShadow", e = e), wn = (...e) => new o("feFlood", e = e), gn = (...e) => new o("feFuncA", e = e), pn = (...e) => new o("feFuncB", e = e), dn = (...e) => new o("feFuncG", e = e), bn = (...e) => new o("feFuncR", e = e), yn = (...e) => new o("feGaussianBlur", e = e), _n = (...e) => new o("feImage", e = e), kn = (...e) => new o("feMerge", e = e), vn = (...e) => new o("feMergeNode", e = e), Rn = (...e) => new o("feMorphology", e = e), En = (...e) => new o("feOffset", e = e), Cn = (...e) => new o("fePointLight", e = e), Sn = (...e) => new o("feSpecularLighting", e = e), On = (...e) => new o("feSpotLight", e = e), xn = (...e) => new o("feTile", e = e), Fn = (...e) => new o("feTurbulence", e = e), Pn = (...e) => new o("filter", e = e), jn = (...e) => new o("foreignObject", e = e), An = (...e) => new o("g", e = e), Nn = (...e) => new o("image", e = e), Mn = (...e) => new o("line", e = e), Ln = (...e) => new o("linearGradient", e = e), Dn = (...e) => new o("marker", e = e), Tn = (...e) => new o("mask", e = e), Un = (...e) => new o("metadata", e = e), Bn = (...e) => new o("mpath", e = e), In = (...e) => new o("path", e = e), $n = (...e) => new o("pattern", e = e), Gn = (...e) => new o("polygon", e = e), qn = (...e) => new o("polyline", e = e), Yn = (...e) => new o("radialGradient", e = e), Jn = (...e) => new o("rect", e = e), Wn = (...e) => new o("set", e = e), Hn = (...e) => new o("stop", e = e), zn = (...e) => new o("svg", e = e), Kn = (...e) => new o("switch", e = e), Qn = (...e) => new o("symbol", e = e), Xn = (...e) => new o("text", e = e), Zn = (...e) => new o("textPath", e = e), Vn = (...e) => new o("title", e = e), es = (...e) => new o("tspan", e = e), ts = (...e) => new o("use", e = e), ns = (...e) => new o("view", e = e);
class J {
  constructor() {
    window && (this.window = window, this.document = document);
  }
  render(t, n) {
    if (this.document instanceof Document) {
      let r = this.document.querySelector(t);
      if (this.rootSelector = t, this.rootElement = n, r instanceof HTMLElement || n instanceof Node) {
        let s = this.hasRouter(n), i = n.element(), u = this.getStates(n);
        r.appendChild(i), Felin.registerFlDocumentRoot(t, this), Felin.registerStates(t, u), s && (s.buildRouterTree(), Felin.registerActiveRouter(this.rootSelector, s)), Felin.run();
      } else
        throw Error("FelinError: no element found with selector " + t);
    }
  }
  selector(t) {
    let n = [], r = t, s = `${this.rootSelector}>${this.rootElement.name}`;
    for (; r._id != this.rootElement._id; )
      (r instanceof l || r instanceof o) && n.push(r), r = r.parent;
    for (let i of n)
      s += `>${i.name}`;
    return s;
  }
  rerenderElement(t) {
    let n = this.selector(t);
    this.document.querySelector(n).replaceWith(t.element());
  }
  hasRouter(t) {
    let n = null;
    return d(t).forEach((s) => {
      s instanceof l && s.register.router && (n = s.register.router);
    }), n;
  }
  getStates(t) {
    let n = [], r = d(t);
    for (let i of r)
      n = [...n, ...i.register.states];
    return n = [...new Set(n.map((i) => i._id))].map((i) => n.find((u) => u._id == i)), n;
  }
}
function ss(e, ...t) {
  return new c(e, ...t);
}
function rs(e) {
  return new f(e);
}
function ls(e, ...t) {
  new G(e, ...t);
}
function is(e, ...t) {
  return new a(e, ...t);
}
function os(...e) {
  return new F(...e);
}
function us(e, t) {
  return new P(e, t);
}
function ms() {
  return Felin.getRouterParams();
}
function as() {
  return new J();
}
function cs(e, t) {
  let n = new l("a", [t]);
  return n.listener("click", (r) => {
    r.preventDefault();
    let s = Felin.getElementRootSelector(n);
    typeof s == "string" && Felin.registerRouteChange(e, s);
  }).style({
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer"
  });
}
function fs(e, t, n) {
  return new q(e, t, n);
}
function hs(e, t) {
  return new Y(e, t);
}
function ws(e) {
  return new f(e.length);
}
window.Felin = $;
export {
  is as $computed,
  as as $document,
  ls as $effect,
  hs as $for,
  fs as $if,
  ws as $length,
  cs as $link,
  ms as $params,
  us as $route,
  os as $router,
  rs as $state,
  ss as $text,
  W as Component,
  a as Computed,
  A as ComputedRefresh,
  q as Conditional,
  v as DOMUpdate,
  G as Effect,
  N as EffectCall,
  k as ExtensibleFunction,
  C as FArray,
  T as FBoolean,
  J as FDocument,
  l as FHTMLElement,
  O as FNumber,
  S as FObject,
  o as FSVGElement,
  U as FString,
  c as FText,
  $ as Felin,
  E as InitComputedRegistry,
  R as InitEffectRegistry,
  Y as Loop,
  I as Registry,
  P as Route,
  M as RouteChange,
  F as Router,
  B as Stack,
  f as State,
  g as ValueType,
  Kt as _a,
  Kn as _switch,
  Xn as _text,
  Vn as _title,
  Wt as _var,
  H as a,
  z as abbr,
  K as address,
  Qt as animate,
  Xt as animateMotion,
  Zt as animateTransform,
  Q as area,
  X as article,
  Z as aside,
  V as audio,
  ee as b,
  te as base,
  ne as bdi,
  se as bdo,
  re as blockquote,
  le as body,
  ie as br,
  oe as button,
  ue as canvas,
  me as caption,
  Vt as circle,
  ae as cite,
  en as clipPath,
  ce as code,
  fe as col,
  he as colgroup,
  we as data,
  ge as datalist,
  pe as dd,
  $ as default,
  tn as defs,
  de as del,
  nn as desc,
  be as details,
  D as determineValueType,
  ye as dfn,
  _e as dialog,
  ke as div,
  ve as dl,
  Re as dt,
  sn as ellipse,
  Ee as em,
  Ce as embed,
  rn as feBlend,
  ln as feColorMatrix,
  on as feComponentTransfer,
  un as feComposite,
  mn as feConvolveMatrix,
  an as feDiffuseLighting,
  cn as feDisplacementMap,
  fn as feDistantLight,
  hn as feDropShadow,
  wn as feFlood,
  gn as feFuncA,
  pn as feFuncB,
  dn as feFuncG,
  bn as feFuncR,
  yn as feGaussianBlur,
  _n as feImage,
  kn as feMerge,
  vn as feMergeNode,
  Rn as feMorphology,
  En as feOffset,
  Cn as fePointLight,
  Sn as feSpecularLighting,
  On as feSpotLight,
  xn as feTile,
  Fn as feTurbulence,
  Se as fieldset,
  Oe as figcaption,
  xe as figure,
  Pn as filter,
  d as flattenElementTree,
  Fe as footer,
  jn as foreignObject,
  Pe as form,
  An as g,
  p as getObjectMethods,
  je as h1,
  Ae as h2,
  Ne as h3,
  Me as h4,
  Le as h5,
  De as h6,
  Te as head,
  Ue as header,
  Be as hgroup,
  Ie as hr,
  $e as html,
  Ge as i,
  qe as iframe,
  Nn as image,
  Ye as img,
  Je as input,
  We as ins,
  He as kbd,
  ze as label,
  Ke as legend,
  Qe as li,
  Mn as line,
  Ln as linearGradient,
  Xe as link,
  Ze as main,
  Ve as map,
  et as mark,
  Dn as marker,
  Tn as mask,
  tt as menu,
  nt as meta,
  Un as metadata,
  st as meter,
  Bn as mpath,
  rt as nav,
  lt as noscript,
  it as object,
  ot as ol,
  ut as optgroup,
  mt as option,
  at as output,
  ct as p,
  In as path,
  $n as pattern,
  ft as picture,
  Gn as polygon,
  qn as polyline,
  ht as pre,
  wt as progress,
  gt as q,
  Yn as radialGradient,
  Jn as rect,
  pt as rp,
  dt as rt,
  bt as ruby,
  yt as s,
  _t as samp,
  kt as search,
  vt as section,
  Rt as select,
  Wn as set,
  Et as slot,
  Ct as small,
  St as source,
  Ot as span,
  Hn as stop,
  xt as strong,
  Ft as sub,
  Pt as summary,
  jt as sup,
  zn as svg,
  Qn as symbol,
  At as table,
  Nt as tbody,
  Mt as td,
  Lt as template,
  Zn as textPath,
  Dt as textarea,
  Tt as tfoot,
  Ut as th,
  Bt as thead,
  It as time,
  $t as title,
  x as toCssString,
  Gt as tr,
  qt as track,
  es as tspan,
  Yt as u,
  Jt as ul,
  ts as use,
  Ht as video,
  ns as view,
  zt as wbr
};
//# sourceMappingURL=felin.js.map
