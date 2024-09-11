class E {
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
class L {
  constructor(t) {
    this.args = t, this.priority = 2;
  }
  call() {
    let t = this.args.fn(...this.args.states);
    this.args.value = t;
  }
}
class D {
  constructor(t) {
    this.args = t, this.priority = 3;
  }
  call() {
    this.args.effect();
  }
}
class T {
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
class S {
  constructor(t) {
    this.priority = 0, this.args = t;
  }
  call() {
    Felin.initComputedRegistry(this.args);
  }
}
var p = /* @__PURE__ */ ((e) => (e[e.NUMBER = 0] = "NUMBER", e[e.STRING = 1] = "STRING", e[e.BOOLEAN = 2] = "BOOLEAN", e[e.OBJECT = 3] = "OBJECT", e[e.MAP = 4] = "MAP", e[e.SET = 5] = "SET", e[e.ARRAY = 6] = "ARRAY", e[e.PROMISE = 7] = "PROMISE", e[e.ANY = 8] = "ANY", e))(p || {});
function P(e) {
  let t = "";
  for (let n of Object.keys(e)) {
    let r = n.split("").map((s, i) => n.charCodeAt(i) >= 65 && n.charCodeAt(i) <= 90 ? "-" + s.toLowerCase() : s);
    t += r.join("") + ": " + e[n] + ";";
  }
  return t;
}
function U(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t = e; Object.getPrototypeOf(t = Object.getPrototypeOf(t)) !== null; ) ;
  return Object.getPrototypeOf(e) === t;
}
function C(e) {
  return typeof e == "string" ? 1 : typeof e == "number" ? 0 : typeof e == "boolean" ? 2 : Array.isArray(e) ? 6 : U(e) ? 3 : e && typeof e.then == "function" ? 7 : 8;
}
function g(e) {
  let t = e.__proto__;
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
class _ extends Function {
  constructor(t) {
    return super(), Object.setPrototypeOf(t, new.target.prototype);
  }
}
class b extends _ {
  constructor(t, n, r) {
    super(
      (s, ...i) => {
        if (s) {
          console.info(this._success);
          for (let u of i) console.info(u);
        } else {
          console.error(this._error);
          for (let u of i) console.error(u);
        }
      }
    ), this._success = "Assertion successful", this._error = "Assertion failed", this._success = n, this._error = r, this.code = t;
  }
  static assert(t, n, r) {
    return new b(t, n, r);
  }
  static expect(t) {
    let n = new I(t), r = new b();
    return n.assertion = r, n;
  }
  static debug(t) {
    console.trace(t);
  }
}
class I {
  constructor(t) {
    this.value = t;
  }
  toBe(t) {
    if (typeof t != "number" && !t.toString().includes("."))
      this.assertion._success = "succesfull match.", this.assertion.code = "error", this.assertion(Object.is(this.value, t) == !0, this.value, t);
    else
      throw new Error("floating point numbers cannot be matched with toBe consider using toBeCloseTo.");
  }
  toEqual(t) {
    if (typeof t != "number" && !t.toString().includes("."))
      this.assertion._success = "succesfull match.", this.assertion.code = "error", typeof t == "object" && typeof this.value == "object" ? this.assertion(A(this.value, t), this.value, t) : typeof t != typeof this.value ? (this.assertion.code = "type", this.assertion(!1, this.value, t)) : this.assertion(Object.is(this.value, t) == !0, this.value, t);
    else
      throw new Error("floating point numbers cannot be matched with toBe consider using toBeCloseTo.");
  }
  toBeCloseTo(t, n = 1) {
    if (typeof this.value == typeof t)
      this.assertion(t.toFixed(n) == this.value.toString(), this.value, t);
    else
      throw new Error("toBeCloseTo matcher is exclusive to floating point numbers consider using toBe or toEqual.");
  }
}
function A(e, t) {
  let n = !0;
  for (let r in e) {
    if (typeof e[r] == "object" && typeof t[r] == "object") n = A(e[r], t[r]);
    else return !1;
    if (e[r] != t[r] && (n = !1), !n) return n;
  }
  return n;
}
class m extends _ {
  constructor(t, ...n) {
    super(() => (this.value = this.fn(...this.states), this.value)), this.elements = [], this.fn = t, this.states = n, this.value = t(...n), this._id = crypto.randomUUID(), Felin.registerComputed(this);
  }
  setElement(t) {
    this.elements.push(t);
  }
}
class f extends _ {
  constructor(t, n) {
    switch (super(() => this.state.value), this.elements = [], this._id = crypto.randomUUID(), n && (this.parent = n), C(t), C(t)) {
      case p.OBJECT:
        this.state = new O(t), this.state.parent = this;
        break;
      case p.ARRAY:
        this.state = new x(t), this.state.parent = this;
        break;
      case p.NUMBER:
        this.state = new F(t), this.state.parent = this;
        break;
      case p.STRING:
        this.state = new q(t), this.state.parent = this;
        break;
      case p.BOOLEAN:
        this.state = new $(t), this.state.parent = this;
        break;
      case p.PROMISE:
        this.state = new j(t), this.state.parent = this;
        break;
      case p.ANY:
        throw Error("Error: unsupported state data type.");
    }
    if (this.state instanceof O) {
      let r = {
        get: (s, i, u) => {
          if (g(s.state).includes(i))
            return s.state[i];
          if (Object.keys(s.state.value).includes(i)) {
            let a = s.state.value[i];
            return b.assert("value-exists", "value exists", "value does not exist")(a != null, a, s), new f(a, { state: this, key: i });
          } else
            return Reflect.get(s, i, u);
        }
      };
      return new Proxy(this, r);
    } else if (this.state instanceof x) {
      let r = {
        get: (s, i, u) => {
          if (g(s.state).includes(i))
            return s.state[i];
          if (Object.keys(s.state.value).includes(i)) {
            let a = s.state.value[i];
            return new f(a, { state: this, key: i });
          } else
            return Reflect.get(s, i, u);
        }
      };
      return new Proxy(this, r);
    } else if (this.state instanceof F) {
      let r = {
        get: (s, i, u) => g(s.state).includes(i) ? s.state[i] : Reflect.get(s, i, u)
      };
      return new Proxy(this, r);
    } else if (this.state instanceof j) {
      let r = {
        get: (s, i, u) => {
          if (s.state.value && Object.keys(s.state.value).includes(i)) {
            let a = s.state.value[i];
            return new f(a, { state: this, key: i });
          } else return g(s.state).includes(i) ? s.state[i] : Reflect.get(s, i, u);
        }
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
class x {
  constructor(t) {
    this.value = t;
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
class $ {
  constructor(t) {
    this.value = t;
  }
}
class O {
  constructor(t) {
    this.value = t;
  }
  keys() {
    return new m(() => Object.keys(this.value), this.parent);
  }
  values() {
    return new m(() => Object.values(this.value), this.parent);
  }
  has(t) {
    return new m(() => Object.keys(this.value).includes(t), this.parent);
  }
}
class q {
  constructor(t) {
    this.value = t;
  }
}
class F {
  constructor(t) {
    this.value = t;
  }
  gt(t) {
    return new m(() => this.value > t, this.parent);
  }
  gte(t) {
    return new m(() => this.value >= t, this.parent);
  }
  lt(t) {
    return new m(() => this.value < t, this.parent);
  }
  lte(t) {
    return new m(() => this.value <= t, this.parent);
  }
  eq(t) {
    return new m(() => this.value == t, this.parent);
  }
}
class j {
  constructor(t) {
    this._error = null, this.value = null, this.status = new f("pending"), t.then((n) => {
      this.value = n, this.status.set("resolved");
    }).catch((n) => {
      this._error = n, this.status.set("rejected");
    });
  }
  pending() {
    return new m(() => this.status() == "pending", this.status);
  }
  resolved() {
    return new m(() => this.status() == "resolved", this.status);
  }
  rejected() {
    return new m(() => this.status() == "rejected", this.status);
  }
  error() {
    return new m(() => this.status() == "rejected" ? this._error : null, this.status);
  }
}
class M {
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
    let n = t.split("/").filter((s) => s != ""), r;
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
class N {
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
    if (this.register.states && this.register.states.length)
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
        else if (s instanceof m)
          this._children.push(new c("{}", s)), s.setElement(this), this.register.computed || (this.register.computed = []), this.register.computed.push(s);
        else if (s instanceof M) {
          if (this.register.router)
            throw Error("Cannot have multiple routers in the same element tree.");
          s.parent = this, s.index = r, this.register.router = s;
          for (let i of this.register.router.routes)
            i.parent = this, i.index = r;
        } else if (s instanceof N)
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
      if (n instanceof f || n instanceof m) {
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
    this._style && (t.style.cssText = P(this._style)), this._classname && t.classList.add(...this._classname.split(" "));
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
      } else if (r instanceof m) {
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
    this._style && (n.style.cssText = P(this._style)), this._classname && n.classList.add(...this._classname.split(" "));
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
function v(e) {
  if (e.length <= 1)
    return e;
  let t = e[0], n = [], r = [];
  for (let s = 1; s < e.length; s++)
    e[s].priority < t.priority ? n.push(e[s]) : r.push(e[s]);
  return v(n).concat(t, v(r));
}
class G {
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
    this.tasks.push(t), this.tasks = v(this.tasks), this.running || this.run();
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
class Y {
  constructor() {
    this.stack = new G(), this.register = {};
  }
  initEffectRegistry(t) {
    let n = Object.keys(this.register).find((r) => t.states.map((s) => s._id).some((s) => this.register[r].states.map((i) => i._id).includes(s)));
    n ? (this.register[n].effects || (this.register[n].effects = []), this.register[n].effects.push(t)) : this.stack.push(new R(t));
  }
  initComputedRegistry(t) {
    let n = Object.keys(this.register).find((r) => t.states.map((s) => s._id).some((s) => this.register[r].states.map((i) => i._id).includes(s)));
    n ? (this.register[n].computed || (this.register[n].computed = []), this.register[n].computed.push(t)) : this.stack.push(new S(t));
  }
  registerStates(t, n) {
    this.register[t].states = n;
  }
  registerStateUpdate(t) {
    let n = Object.keys(this.register).find((r) => this.register[r].states.some((s) => s._id == t._id));
    if (n) {
      let r = this.register[n].document, s = this.register[n].states.filter((a) => a._id == t._id);
      for (let a of s) {
        let h = a.elements;
        for (let w of h) {
          w instanceof c && (w = w.parent);
          let y = new E({ document: r, state: a });
          this.stack.push(y);
        }
      }
      let i = this.register[n].computed.find((a) => a.states.some((h) => h._id == t._id));
      if (i) {
        let a = new L(i);
        this.stack.push(a);
        let h = this.register[n].computed.filter((w) => w._id == i._id);
        for (let w of h) {
          let y = w.elements;
          for (let k of y) {
            k instanceof c && (k = k.parent);
            let B = new E({ document: r, state: w });
            this.stack.push(B);
          }
        }
      }
      let u = this.register[n].effects.find((a) => a.states.some((h) => h._id == t._id));
      if (u) {
        let a = new D(u);
        this.stack.push(a);
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
    let n = new S(t);
    setTimeout(() => {
      this.stack.push(n);
    }, 1e3);
  }
  registerActiveRouter(t, n) {
    Object.keys(this.register).includes(t) || (this.register[t] = {}), this.register[t].router = n, this.registerRouteChange(window.location.href.slice(window.location.host.length + window.location.protocol.length + 2), t);
  }
  registerRouteChange(t, n) {
    let r = { path: t, router: this.register[n].router, document: this.register[n].document }, s = new T(r);
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
        for (let a of u.rootElement._children)
          (a._id == t._id || a instanceof l && this.getElementRootSelector(t, a) == !0) && (r = i);
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
const J = new Y();
class W {
  constructor(t, ...n) {
    this.effect = t, this.states = n, this._id = crypto.randomUUID(), Felin.registerEffect(this);
  }
}
class H {
  constructor(t, n, r) {
    this.condition = t, this._true = n, this._false = r;
  }
  element(t) {
    return t && (this.parent = t), this.condition() ? this._true.element() : this._false.element();
  }
}
class z {
  constructor(t, n) {
    this.state = t, this.iteration = n;
  }
}
class Q extends _ {
  constructor(t) {
    super((n) => (this.props = n, this)), this.fn = t;
  }
  element(t) {
    return t && (this.parentNode = t), this.fn(this.props).element();
  }
}
const X = (...e) => new l("a", e = e), Z = (...e) => new l("abbr", e = e), V = (...e) => new l("address", e = e), ee = (...e) => new l("area", e = e), te = (...e) => new l("article", e = e), ne = (...e) => new l("aside", e = e), se = (...e) => new l("audio", e = e), re = (...e) => new l("b", e = e), le = (...e) => new l("base", e = e), ie = (...e) => new l("bdi", e = e), oe = (...e) => new l("bdo", e = e), ue = (...e) => new l("blockquote", e = e), ae = (...e) => new l("body", e = e), me = (...e) => new l("br", e = e), ce = (...e) => new l("button", e = e), fe = (...e) => new l("canvas", e = e), he = (...e) => new l("caption", e = e), we = (...e) => new l("cite", e = e), pe = (...e) => new l("code", e = e), ge = (...e) => new l("col", e = e), de = (...e) => new l("colgroup", e = e), be = (...e) => new l("data", e = e), _e = (...e) => new l("datalist", e = e), ye = (...e) => new l("dd", e = e), ke = (...e) => new l("del", e = e), ve = (...e) => new l("details", e = e), Ee = (...e) => new l("dfn", e = e), Re = (...e) => new l("dialog", e = e), Se = (...e) => new l("div", e = e), Ce = (...e) => new l("dl", e = e), xe = (...e) => new l("dt", e = e), Oe = (...e) => new l("em", e = e), Fe = (...e) => new l("embed", e = e), je = (...e) => new l("fieldset", e = e), Pe = (...e) => new l("figcaption", e = e), Ae = (...e) => new l("figure", e = e), Me = (...e) => new l("footer", e = e), Ne = (...e) => new l("form", e = e), Be = (...e) => new l("h1", e = e), Le = (...e) => new l("h2", e = e), De = (...e) => new l("h3", e = e), Te = (...e) => new l("h4", e = e), Ue = (...e) => new l("h5", e = e), Ie = (...e) => new l("h6", e = e), $e = (...e) => new l("head", e = e), qe = (...e) => new l("header", e = e), Ge = (...e) => new l("hgroup", e = e), Ye = (...e) => new l("hr", e = e), Je = (...e) => new l("html", e = e), We = (...e) => new l("i", e = e), He = (...e) => new l("iframe", e = e), ze = (...e) => new l("img", e = e), Ke = (...e) => new l("input", e = e), Qe = (...e) => new l("ins", e = e), Xe = (...e) => new l("kbd", e = e), Ze = (...e) => new l("label", e = e), Ve = (...e) => new l("legend", e = e), et = (...e) => new l("li", e = e), tt = (...e) => new l("link", e = e), nt = (...e) => new l("main", e = e), st = (...e) => new l("map", e = e), rt = (...e) => new l("mark", e = e), lt = (...e) => new l("menu", e = e), it = (...e) => new l("meta", e = e), ot = (...e) => new l("meter", e = e), ut = (...e) => new l("nav", e = e), at = (...e) => new l("noscript", e = e), mt = (...e) => new l("object", e = e), ct = (...e) => new l("ol", e = e), ft = (...e) => new l("optgroup", e = e), ht = (...e) => new l("option", e = e), wt = (...e) => new l("output", e = e), pt = (...e) => new l("p", e = e), gt = (...e) => new l("picture", e = e), dt = (...e) => new l("pre", e = e), bt = (...e) => new l("progress", e = e), _t = (...e) => new l("q", e = e), yt = (...e) => new l("rp", e = e), kt = (...e) => new l("rt", e = e), vt = (...e) => new l("ruby", e = e), Et = (...e) => new l("s", e = e), Rt = (...e) => new l("samp", e = e), St = (...e) => new l("search", e = e), Ct = (...e) => new l("section", e = e), xt = (...e) => new l("select", e = e), Ot = (...e) => new l("slot", e = e), Ft = (...e) => new l("small", e = e), jt = (...e) => new l("source", e = e), Pt = (...e) => new l("span", e = e), At = (...e) => new l("strong", e = e), Mt = (...e) => new l("sub", e = e), Nt = (...e) => new l("summary", e = e), Bt = (...e) => new l("sup", e = e), Lt = (...e) => new l("table", e = e), Dt = (...e) => new l("tbody", e = e), Tt = (...e) => new l("td", e = e), Ut = (...e) => new l("template", e = e), It = (...e) => new l("textarea", e = e), $t = (...e) => new l("tfoot", e = e), qt = (...e) => new l("th", e = e), Gt = (...e) => new l("thead", e = e), Yt = (...e) => new l("time", e = e), Jt = (...e) => new l("title", e = e), Wt = (...e) => new l("tr", e = e), Ht = (...e) => new l("track", e = e), zt = (...e) => new l("u", e = e), Kt = (...e) => new l("ul", e = e), Qt = (...e) => new l("var", e = e), Xt = (...e) => new l("video", e = e), Zt = (...e) => new l("wbr", e = e), Vt = (...e) => new o("a", e = e), en = (...e) => new o("animate", e = e), tn = (...e) => new o("animateMotion", e = e), nn = (...e) => new o("animateTransform", e = e), sn = (...e) => new o("circle", e = e), rn = (...e) => new o("clipPath", e = e), ln = (...e) => new o("defs", e = e), on = (...e) => new o("desc", e = e), un = (...e) => new o("ellipse", e = e), an = (...e) => new o("feBlend", e = e), mn = (...e) => new o("feColorMatrix", e = e), cn = (...e) => new o("feComponentTransfer", e = e), fn = (...e) => new o("feComposite", e = e), hn = (...e) => new o("feConvolveMatrix", e = e), wn = (...e) => new o("feDiffuseLighting", e = e), pn = (...e) => new o("feDisplacementMap", e = e), gn = (...e) => new o("feDistantLight", e = e), dn = (...e) => new o("feDropShadow", e = e), bn = (...e) => new o("feFlood", e = e), _n = (...e) => new o("feFuncA", e = e), yn = (...e) => new o("feFuncB", e = e), kn = (...e) => new o("feFuncG", e = e), vn = (...e) => new o("feFuncR", e = e), En = (...e) => new o("feGaussianBlur", e = e), Rn = (...e) => new o("feImage", e = e), Sn = (...e) => new o("feMerge", e = e), Cn = (...e) => new o("feMergeNode", e = e), xn = (...e) => new o("feMorphology", e = e), On = (...e) => new o("feOffset", e = e), Fn = (...e) => new o("fePointLight", e = e), jn = (...e) => new o("feSpecularLighting", e = e), Pn = (...e) => new o("feSpotLight", e = e), An = (...e) => new o("feTile", e = e), Mn = (...e) => new o("feTurbulence", e = e), Nn = (...e) => new o("filter", e = e), Bn = (...e) => new o("foreignObject", e = e), Ln = (...e) => new o("g", e = e), Dn = (...e) => new o("image", e = e), Tn = (...e) => new o("line", e = e), Un = (...e) => new o("linearGradient", e = e), In = (...e) => new o("marker", e = e), $n = (...e) => new o("mask", e = e), qn = (...e) => new o("metadata", e = e), Gn = (...e) => new o("mpath", e = e), Yn = (...e) => new o("path", e = e), Jn = (...e) => new o("pattern", e = e), Wn = (...e) => new o("polygon", e = e), Hn = (...e) => new o("polyline", e = e), zn = (...e) => new o("radialGradient", e = e), Kn = (...e) => new o("rect", e = e), Qn = (...e) => new o("set", e = e), Xn = (...e) => new o("stop", e = e), Zn = (...e) => new o("svg", e = e), Vn = (...e) => new o("switch", e = e), es = (...e) => new o("symbol", e = e), ts = (...e) => new o("text", e = e), ns = (...e) => new o("textPath", e = e), ss = (...e) => new o("title", e = e), rs = (...e) => new o("tspan", e = e), ls = (...e) => new o("use", e = e), is = (...e) => new o("view", e = e);
class K {
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
      i.register.states && (n = [...n, ...i.register.states]);
    return n = [...new Set(n.map((i) => i._id))].map((i) => n.find((u) => u._id == i)), n;
  }
}
function os(e, ...t) {
  return new c(e, ...t);
}
function us(e) {
  return new f(e);
}
function as(e, ...t) {
  new W(e, ...t);
}
function ms(e, ...t) {
  return new m(e, ...t);
}
function cs(...e) {
  return new M(...e);
}
function fs(e, t) {
  return new N(e, t);
}
function hs() {
  return Felin.getRouterParams();
}
function ws() {
  return new K();
}
function ps(e, t) {
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
function gs(e, t, n) {
  return new H(e, t, n);
}
function ds(e, t) {
  return new z(e, t);
}
function bs(e) {
  return new f(e.length);
}
window && (window.Felin = J);
export {
  ms as $computed,
  ws as $document,
  as as $effect,
  ds as $for,
  gs as $if,
  bs as $length,
  ps as $link,
  hs as $params,
  fs as $route,
  cs as $router,
  us as $state,
  os as $text,
  Q as Component,
  m as Computed,
  L as ComputedRefresh,
  H as Conditional,
  E as DOMUpdate,
  W as Effect,
  D as EffectCall,
  _ as ExtensibleFunction,
  x as FArray,
  $ as FBoolean,
  K as FDocument,
  l as FHTMLElement,
  F as FNumber,
  O as FObject,
  j as FPromise,
  o as FSVGElement,
  q as FString,
  c as FText,
  J as Felin,
  S as InitComputedRegistry,
  R as InitEffectRegistry,
  z as Loop,
  Y as Registry,
  N as Route,
  T as RouteChange,
  M as Router,
  G as Stack,
  f as State,
  p as ValueType,
  Vt as _a,
  Vn as _switch,
  ts as _text,
  ss as _title,
  Qt as _var,
  X as a,
  Z as abbr,
  V as address,
  en as animate,
  tn as animateMotion,
  nn as animateTransform,
  ee as area,
  te as article,
  ne as aside,
  se as audio,
  re as b,
  le as base,
  ie as bdi,
  oe as bdo,
  ue as blockquote,
  ae as body,
  me as br,
  ce as button,
  fe as canvas,
  he as caption,
  sn as circle,
  we as cite,
  rn as clipPath,
  pe as code,
  ge as col,
  de as colgroup,
  be as data,
  _e as datalist,
  ye as dd,
  J as default,
  ln as defs,
  ke as del,
  on as desc,
  ve as details,
  C as determineValueType,
  Ee as dfn,
  Re as dialog,
  Se as div,
  Ce as dl,
  xe as dt,
  un as ellipse,
  Oe as em,
  Fe as embed,
  an as feBlend,
  mn as feColorMatrix,
  cn as feComponentTransfer,
  fn as feComposite,
  hn as feConvolveMatrix,
  wn as feDiffuseLighting,
  pn as feDisplacementMap,
  gn as feDistantLight,
  dn as feDropShadow,
  bn as feFlood,
  _n as feFuncA,
  yn as feFuncB,
  kn as feFuncG,
  vn as feFuncR,
  En as feGaussianBlur,
  Rn as feImage,
  Sn as feMerge,
  Cn as feMergeNode,
  xn as feMorphology,
  On as feOffset,
  Fn as fePointLight,
  jn as feSpecularLighting,
  Pn as feSpotLight,
  An as feTile,
  Mn as feTurbulence,
  je as fieldset,
  Pe as figcaption,
  Ae as figure,
  Nn as filter,
  d as flattenElementTree,
  Me as footer,
  Bn as foreignObject,
  Ne as form,
  Ln as g,
  g as getObjectMethods,
  Be as h1,
  Le as h2,
  De as h3,
  Te as h4,
  Ue as h5,
  Ie as h6,
  $e as head,
  qe as header,
  Ge as hgroup,
  Ye as hr,
  Je as html,
  We as i,
  He as iframe,
  Dn as image,
  ze as img,
  Ke as input,
  Qe as ins,
  Xe as kbd,
  Ze as label,
  Ve as legend,
  et as li,
  Tn as line,
  Un as linearGradient,
  tt as link,
  nt as main,
  st as map,
  rt as mark,
  In as marker,
  $n as mask,
  lt as menu,
  it as meta,
  qn as metadata,
  ot as meter,
  Gn as mpath,
  ut as nav,
  at as noscript,
  mt as object,
  ct as ol,
  ft as optgroup,
  ht as option,
  wt as output,
  pt as p,
  Yn as path,
  Jn as pattern,
  gt as picture,
  Wn as polygon,
  Hn as polyline,
  dt as pre,
  bt as progress,
  _t as q,
  zn as radialGradient,
  Kn as rect,
  yt as rp,
  kt as rt,
  vt as ruby,
  Et as s,
  Rt as samp,
  St as search,
  Ct as section,
  xt as select,
  Qn as set,
  Ot as slot,
  Ft as small,
  jt as source,
  Pt as span,
  Xn as stop,
  At as strong,
  Mt as sub,
  Nt as summary,
  Bt as sup,
  Zn as svg,
  es as symbol,
  Lt as table,
  Dt as tbody,
  Tt as td,
  Ut as template,
  ns as textPath,
  It as textarea,
  $t as tfoot,
  qt as th,
  Gt as thead,
  Yt as time,
  Jt as title,
  P as toCssString,
  Wt as tr,
  Ht as track,
  rs as tspan,
  zt as u,
  Kt as ul,
  ls as use,
  Xt as video,
  is as view,
  Zt as wbr
};
//# sourceMappingURL=felin.js.map
