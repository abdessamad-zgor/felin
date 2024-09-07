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
class T {
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
class U {
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
var g = /* @__PURE__ */ ((e) => (e[e.NUMBER = 0] = "NUMBER", e[e.STRING = 1] = "STRING", e[e.BOOLEAN = 2] = "BOOLEAN", e[e.OBJECT = 3] = "OBJECT", e[e.MAP = 4] = "MAP", e[e.SET = 5] = "SET", e[e.ARRAY = 6] = "ARRAY", e[e.PROMISE = 7] = "PROMISE", e[e.ANY = 8] = "ANY", e))(g || {});
function M(e) {
  let t = "";
  for (let n of Object.keys(e)) {
    let r = n.split("").map((s, i) => n.charCodeAt(i) >= 65 && n.charCodeAt(i) <= 90 ? "-" + s.toLowerCase() : s);
    t += r.join("") + ": " + e[n] + ";";
  }
  return t;
}
function $(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t = e; Object.getPrototypeOf(t = Object.getPrototypeOf(t)) !== null; ) ;
  return Object.getPrototypeOf(e) === t;
}
function C(e) {
  return typeof e == "string" ? 1 : typeof e == "number" ? 0 : typeof e == "boolean" ? 2 : Array.isArray(e) ? 6 : $(e) ? 3 : e && typeof e.then == "function" ? 7 : 8;
}
function d(e) {
  console.log(e);
  let t = e.__proto__;
  return Object.getOwnPropertyNames(t).filter((r) => typeof e[r] == "function" && r != "constructor");
}
function b(e, t) {
  if (t) {
    let n = 1, r = t.findIndex((i) => i._id == e._id) + n, s = null;
    for (; r < t.length; ) {
      if (s = t[r], s instanceof o || s instanceof l) {
        if (s._children.length != 0)
          return s = t[r], t = [...t, ...s._children], b(s, t);
        continue;
      }
      n++, r = t.findIndex((i) => i._id == e._id) + n;
    }
    return t;
  } else {
    let n = [];
    return e instanceof l || e instanceof o ? e._children.length > 0 ? (n = [e, ...e._children], b(e, n)) : (n = [e], n) : (n = [e], n);
  }
}
class y extends Function {
  constructor(t) {
    return super(), Object.setPrototypeOf(t, new.target.prototype);
  }
}
const I = (e, t) => {
  let n = "";
  for (let r = 0; r < e.length; r++) {
    let s = r >= t.length ? t[r] : "";
    n += `${e[r]}${s}`;
  }
  return n;
}, O = /* @__PURE__ */ new Map([
  ["error", (e) => I`Unexpected error ${e}`]
]);
class q {
  constructor(t, n, ...r) {
    if (this.code = t, n)
      this.message = n;
    else if (O.has(t)) {
      let s = O.get(t);
      typeof s == "function" ? this.message = s(...r) : this.message = n;
    }
  }
  toString() {
    return `FelinError: ${this.code}: ${this.message}`;
  }
  throw() {
    throw new Error(this.toString());
  }
}
class p extends y {
  constructor(t, n) {
    super(
      (r, ...s) => {
        if (r)
          console.log(this.message || "Assertion successful");
        else {
          let i = new q(this.code);
          for (let u of s)
            console.log(u);
          i.throw();
        }
      }
    ), this.message = n, this.code = t;
  }
  static assert(t) {
    return new p(t);
  }
  static expect(t) {
    let n = new G(t), r = new p();
    return n.assertion = r, n;
  }
  static debug(t) {
    console.trace(t);
  }
}
class G {
  constructor(t) {
    this.value = t;
  }
  toBe(t) {
    if (typeof t != "number" && !t.toString().includes("."))
      this.assertion.message = "succesfull match.", this.assertion.code = "error", this.assertion(Object.is(this.value, t) == !0, this.value, t);
    else
      throw new Error("floating point numbers cannot be matched with toBe consider using toBeCloseTo.");
  }
  toEqual(t) {
    if (typeof t != "number" && !t.toString().includes("."))
      this.assertion.message = "succesfull match.", this.assertion.code = "error", typeof t == "object" && typeof this.value == "object" ? this.assertion(A(this.value, t), this.value, t) : typeof t != typeof this.value ? (this.assertion.code = "type", this.assertion(!1, this.value, t)) : this.assertion(Object.is(this.value, t) == !0, this.value, t);
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
class m extends y {
  constructor(t, ...n) {
    super(() => (this.value = this.fn(...this.states), this.value)), this.elements = [], this.fn = t, this.states = n, this.value = t(...n), this._id = crypto.randomUUID(), Felin.registerComputed(this);
  }
  setElement(t) {
    this.elements.push(t);
  }
}
class f extends y {
  constructor(t, n) {
    super(() => this.state.value), this.elements = [], this._id = crypto.randomUUID(), n && (this.parent = n);
    let r = C(t);
    switch (p.debug(t), p.debug(r), C(t)) {
      case g.OBJECT:
        this.state = new F(t), this.state.parent = this;
        break;
      case g.ARRAY:
        this.state = new x(t), this.state.parent = this;
        break;
      case g.NUMBER:
        this.state = new j(t), this.state.parent = this;
        break;
      case g.STRING:
        this.state = new J(t), this.state.parent = this;
        break;
      case g.BOOLEAN:
        this.state = new Y(t), this.state.parent = this;
        break;
      case g.PROMISE:
        p.assert("block reached")(r, t), this.state = new P(t), this.state.parent = this;
        break;
      case g.ANY:
        throw Error("Error: unsupported state data type.");
    }
    if (this.state instanceof F) {
      let s = {
        get: (i, u, a) => {
          if (d(i.state).includes(u))
            return i.state[u];
          if (Object.keys(i.state.value).includes(u)) {
            let c = i.state[u];
            return new f(c, { state: this, key: u });
          } else
            return Reflect.get(i, u, a);
        }
      };
      return new Proxy(this, s);
    } else if (this.state instanceof x) {
      let s = {
        get: (i, u, a) => {
          if (u == "set")
            return this.set;
          if (d(i.state).includes(u))
            return i.state[u];
          if (Object.keys(i.state.value).includes(u)) {
            let c = i.state[u];
            return new f(c, { state: this, key: u });
          } else
            return Reflect.get(i, u, a);
        }
      };
      return new Proxy(this, s);
    } else if (this.state instanceof j) {
      let s = {
        get: (i, u, a) => d(i.state).includes(u) ? i.state[u] : Reflect.get(i, u, a)
      };
      return new Proxy(this, s);
    } else if (this.state instanceof P) {
      let s = {
        get: (i, u, a) => {
          if (p.assert("value to exist")(i.state), i.state.value && Object.keys(i.state.value).includes(u)) {
            let c = i.state[u];
            return new f(c, { state: this, key: u });
          } else return d(i.state).includes(u) ? i.state[u] : Reflect.get(i, u, a);
        }
      };
      return new Proxy(this, s);
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
class Y {
  constructor(t) {
    this.value = t;
  }
}
class F {
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
class J {
  constructor(t) {
    this.value = t;
  }
}
class j {
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
class P {
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
class N {
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
class B {
  constructor(t, n) {
    this.children = [], this.path = t, this.element = n;
  }
}
class h {
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
          this._children.push(new h("{}", s)), s.setElement(this), this.register.states || (this.register.states = []), this.register.states.push(s);
        else if (s instanceof m)
          this._children.push(new h("{}", s)), s.setElement(this), this.register.computed || (this.register.computed = []), this.register.computed.push(s);
        else if (s instanceof N) {
          if (this.register.router)
            throw Error("Cannot have multiple routers in the same element tree.");
          s.parent = this, s.index = r, this.register.router = s;
          for (let i of this.register.router.routes)
            i.parent = this, i.index = r;
        } else if (s instanceof B)
          s.parent = this, s.index = r, Array.isArray(this.register.routes) || (this.register.routes = []), this.register.routes.push(s);
        else if (s instanceof l || s instanceof o || s instanceof h)
          s.parent = this, this._children.push(s);
        else if (typeof s == "string" || typeof s == "number") {
          let i = new h(s.toString());
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
        let r = new h("{}", n());
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
    this._style && (t.style.cssText = M(this._style)), this._classname && t.classList.add(...this._classname.split(" "));
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
        let s = new h("{}", r);
        s.parent = this, this._children.push(s), this.register.states || (this.register.states = []), this.register.states.push(r), this.register.states.push(r);
      } else if (r instanceof m) {
        let s = new h("{}", r);
        s.parent = this, this._children.push(s), this.register.computed || (this.register.computed = []), this.register.computed.push(r);
      } else
        this._children.push(typeof r == "string" ? new h(r) : r);
    this._style = null, this._listeners = /* @__PURE__ */ new Map(), this._attributes = {};
  }
  style(t) {
    return this._style = t, this;
  }
  children(t) {
    for (let n of t)
      n instanceof f ? this._children.push(new h("{}", n)) : this._children.push(n);
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
    this._style && (n.style.cssText = M(this._style)), this._classname && n.classList.add(...this._classname.split(" "));
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
class W {
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
class H {
  constructor() {
    this.stack = new W(), this.register = {};
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
        let c = a.elements;
        for (let w of c) {
          w instanceof h && (w = w.parent);
          let _ = new E({ document: r, state: a });
          this.stack.push(_);
        }
      }
      let i = this.register[n].computed.find((a) => a.states.some((c) => c._id == t._id));
      if (i) {
        let a = new T(i);
        this.stack.push(a);
        let c = this.register[n].computed.filter((w) => w._id == i._id);
        for (let w of c) {
          let _ = w.elements;
          for (let k of _) {
            k instanceof h && (k = k.parent);
            let L = new E({ document: r, state: w });
            this.stack.push(L);
          }
        }
      }
      let u = this.register[n].effects.find((a) => a.states.some((c) => c._id == t._id));
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
    let r = { path: t, router: this.register[n].router, document: this.register[n].document }, s = new U(r);
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
const z = new H();
class K {
  constructor(t, ...n) {
    this.effect = t, this.states = n, this._id = crypto.randomUUID(), Felin.registerEffect(this);
  }
}
class Q {
  constructor(t, n, r) {
    this.condition = t, this._true = n, this._false = r;
  }
  element(t) {
    return t && (this.parent = t), this.condition() ? this._true.element() : this._false.element();
  }
}
class X {
  constructor(t, n) {
    this.state = t, this.iteration = n;
  }
}
class V extends y {
  constructor(t) {
    super((n) => (this.props = n, this)), this.fn = t;
  }
  element(t) {
    return t && (this.parentNode = t), this.fn(this.props).element();
  }
}
const ee = (...e) => new l("a", e = e), te = (...e) => new l("abbr", e = e), ne = (...e) => new l("address", e = e), se = (...e) => new l("area", e = e), re = (...e) => new l("article", e = e), le = (...e) => new l("aside", e = e), ie = (...e) => new l("audio", e = e), oe = (...e) => new l("b", e = e), ue = (...e) => new l("base", e = e), ae = (...e) => new l("bdi", e = e), me = (...e) => new l("bdo", e = e), ce = (...e) => new l("blockquote", e = e), he = (...e) => new l("body", e = e), fe = (...e) => new l("br", e = e), we = (...e) => new l("button", e = e), ge = (...e) => new l("canvas", e = e), pe = (...e) => new l("caption", e = e), de = (...e) => new l("cite", e = e), be = (...e) => new l("code", e = e), ye = (...e) => new l("col", e = e), _e = (...e) => new l("colgroup", e = e), ke = (...e) => new l("data", e = e), ve = (...e) => new l("datalist", e = e), Ee = (...e) => new l("dd", e = e), Re = (...e) => new l("del", e = e), Se = (...e) => new l("details", e = e), Ce = (...e) => new l("dfn", e = e), Oe = (...e) => new l("dialog", e = e), xe = (...e) => new l("div", e = e), Fe = (...e) => new l("dl", e = e), je = (...e) => new l("dt", e = e), Pe = (...e) => new l("em", e = e), Me = (...e) => new l("embed", e = e), Ae = (...e) => new l("fieldset", e = e), Ne = (...e) => new l("figcaption", e = e), Be = (...e) => new l("figure", e = e), Le = (...e) => new l("footer", e = e), Te = (...e) => new l("form", e = e), De = (...e) => new l("h1", e = e), Ue = (...e) => new l("h2", e = e), $e = (...e) => new l("h3", e = e), Ie = (...e) => new l("h4", e = e), qe = (...e) => new l("h5", e = e), Ge = (...e) => new l("h6", e = e), Ye = (...e) => new l("head", e = e), Je = (...e) => new l("header", e = e), We = (...e) => new l("hgroup", e = e), He = (...e) => new l("hr", e = e), ze = (...e) => new l("html", e = e), Ke = (...e) => new l("i", e = e), Qe = (...e) => new l("iframe", e = e), Xe = (...e) => new l("img", e = e), Ze = (...e) => new l("input", e = e), Ve = (...e) => new l("ins", e = e), et = (...e) => new l("kbd", e = e), tt = (...e) => new l("label", e = e), nt = (...e) => new l("legend", e = e), st = (...e) => new l("li", e = e), rt = (...e) => new l("link", e = e), lt = (...e) => new l("main", e = e), it = (...e) => new l("map", e = e), ot = (...e) => new l("mark", e = e), ut = (...e) => new l("menu", e = e), at = (...e) => new l("meta", e = e), mt = (...e) => new l("meter", e = e), ct = (...e) => new l("nav", e = e), ht = (...e) => new l("noscript", e = e), ft = (...e) => new l("object", e = e), wt = (...e) => new l("ol", e = e), gt = (...e) => new l("optgroup", e = e), pt = (...e) => new l("option", e = e), dt = (...e) => new l("output", e = e), bt = (...e) => new l("p", e = e), yt = (...e) => new l("picture", e = e), _t = (...e) => new l("pre", e = e), kt = (...e) => new l("progress", e = e), vt = (...e) => new l("q", e = e), Et = (...e) => new l("rp", e = e), Rt = (...e) => new l("rt", e = e), St = (...e) => new l("ruby", e = e), Ct = (...e) => new l("s", e = e), Ot = (...e) => new l("samp", e = e), xt = (...e) => new l("search", e = e), Ft = (...e) => new l("section", e = e), jt = (...e) => new l("select", e = e), Pt = (...e) => new l("slot", e = e), Mt = (...e) => new l("small", e = e), At = (...e) => new l("source", e = e), Nt = (...e) => new l("span", e = e), Bt = (...e) => new l("strong", e = e), Lt = (...e) => new l("sub", e = e), Tt = (...e) => new l("summary", e = e), Dt = (...e) => new l("sup", e = e), Ut = (...e) => new l("table", e = e), $t = (...e) => new l("tbody", e = e), It = (...e) => new l("td", e = e), qt = (...e) => new l("template", e = e), Gt = (...e) => new l("textarea", e = e), Yt = (...e) => new l("tfoot", e = e), Jt = (...e) => new l("th", e = e), Wt = (...e) => new l("thead", e = e), Ht = (...e) => new l("time", e = e), zt = (...e) => new l("title", e = e), Kt = (...e) => new l("tr", e = e), Qt = (...e) => new l("track", e = e), Xt = (...e) => new l("u", e = e), Zt = (...e) => new l("ul", e = e), Vt = (...e) => new l("var", e = e), en = (...e) => new l("video", e = e), tn = (...e) => new l("wbr", e = e), nn = (...e) => new o("a", e = e), sn = (...e) => new o("animate", e = e), rn = (...e) => new o("animateMotion", e = e), ln = (...e) => new o("animateTransform", e = e), on = (...e) => new o("circle", e = e), un = (...e) => new o("clipPath", e = e), an = (...e) => new o("defs", e = e), mn = (...e) => new o("desc", e = e), cn = (...e) => new o("ellipse", e = e), hn = (...e) => new o("feBlend", e = e), fn = (...e) => new o("feColorMatrix", e = e), wn = (...e) => new o("feComponentTransfer", e = e), gn = (...e) => new o("feComposite", e = e), pn = (...e) => new o("feConvolveMatrix", e = e), dn = (...e) => new o("feDiffuseLighting", e = e), bn = (...e) => new o("feDisplacementMap", e = e), yn = (...e) => new o("feDistantLight", e = e), _n = (...e) => new o("feDropShadow", e = e), kn = (...e) => new o("feFlood", e = e), vn = (...e) => new o("feFuncA", e = e), En = (...e) => new o("feFuncB", e = e), Rn = (...e) => new o("feFuncG", e = e), Sn = (...e) => new o("feFuncR", e = e), Cn = (...e) => new o("feGaussianBlur", e = e), On = (...e) => new o("feImage", e = e), xn = (...e) => new o("feMerge", e = e), Fn = (...e) => new o("feMergeNode", e = e), jn = (...e) => new o("feMorphology", e = e), Pn = (...e) => new o("feOffset", e = e), Mn = (...e) => new o("fePointLight", e = e), An = (...e) => new o("feSpecularLighting", e = e), Nn = (...e) => new o("feSpotLight", e = e), Bn = (...e) => new o("feTile", e = e), Ln = (...e) => new o("feTurbulence", e = e), Tn = (...e) => new o("filter", e = e), Dn = (...e) => new o("foreignObject", e = e), Un = (...e) => new o("g", e = e), $n = (...e) => new o("image", e = e), In = (...e) => new o("line", e = e), qn = (...e) => new o("linearGradient", e = e), Gn = (...e) => new o("marker", e = e), Yn = (...e) => new o("mask", e = e), Jn = (...e) => new o("metadata", e = e), Wn = (...e) => new o("mpath", e = e), Hn = (...e) => new o("path", e = e), zn = (...e) => new o("pattern", e = e), Kn = (...e) => new o("polygon", e = e), Qn = (...e) => new o("polyline", e = e), Xn = (...e) => new o("radialGradient", e = e), Zn = (...e) => new o("rect", e = e), Vn = (...e) => new o("set", e = e), es = (...e) => new o("stop", e = e), ts = (...e) => new o("svg", e = e), ns = (...e) => new o("switch", e = e), ss = (...e) => new o("symbol", e = e), rs = (...e) => new o("text", e = e), ls = (...e) => new o("textPath", e = e), is = (...e) => new o("title", e = e), os = (...e) => new o("tspan", e = e), us = (...e) => new o("use", e = e), as = (...e) => new o("view", e = e);
class Z {
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
    return b(t).forEach((s) => {
      s instanceof l && s.register.router && (n = s.register.router);
    }), n;
  }
  getStates(t) {
    let n = [], r = b(t);
    for (let i of r)
      i.register.states && (n = [...n, ...i.register.states]);
    return n = [...new Set(n.map((i) => i._id))].map((i) => n.find((u) => u._id == i)), n;
  }
}
function ms(e, ...t) {
  return new h(e, ...t);
}
function cs(e) {
  return new f(e);
}
function hs(e, ...t) {
  new K(e, ...t);
}
function fs(e, ...t) {
  return new m(e, ...t);
}
function ws(...e) {
  return new N(...e);
}
function gs(e, t) {
  return new B(e, t);
}
function ps() {
  return Felin.getRouterParams();
}
function ds() {
  return new Z();
}
function bs(e, t) {
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
function ys(e, t, n) {
  return new Q(e, t, n);
}
function _s(e, t) {
  return new X(e, t);
}
function ks(e) {
  return new f(e.length);
}
window && (window.Felin = z);
export {
  fs as $computed,
  ds as $document,
  hs as $effect,
  _s as $for,
  ys as $if,
  ks as $length,
  bs as $link,
  ps as $params,
  gs as $route,
  ws as $router,
  cs as $state,
  ms as $text,
  V as Component,
  m as Computed,
  T as ComputedRefresh,
  Q as Conditional,
  E as DOMUpdate,
  K as Effect,
  D as EffectCall,
  y as ExtensibleFunction,
  x as FArray,
  Y as FBoolean,
  Z as FDocument,
  l as FHTMLElement,
  j as FNumber,
  F as FObject,
  P as FPromise,
  o as FSVGElement,
  J as FString,
  h as FText,
  z as Felin,
  S as InitComputedRegistry,
  R as InitEffectRegistry,
  X as Loop,
  H as Registry,
  B as Route,
  U as RouteChange,
  N as Router,
  W as Stack,
  f as State,
  g as ValueType,
  nn as _a,
  ns as _switch,
  rs as _text,
  is as _title,
  Vt as _var,
  ee as a,
  te as abbr,
  ne as address,
  sn as animate,
  rn as animateMotion,
  ln as animateTransform,
  se as area,
  re as article,
  le as aside,
  ie as audio,
  oe as b,
  ue as base,
  ae as bdi,
  me as bdo,
  ce as blockquote,
  he as body,
  fe as br,
  we as button,
  ge as canvas,
  pe as caption,
  on as circle,
  de as cite,
  un as clipPath,
  be as code,
  ye as col,
  _e as colgroup,
  ke as data,
  ve as datalist,
  Ee as dd,
  z as default,
  an as defs,
  Re as del,
  mn as desc,
  Se as details,
  C as determineValueType,
  Ce as dfn,
  Oe as dialog,
  xe as div,
  Fe as dl,
  je as dt,
  cn as ellipse,
  Pe as em,
  Me as embed,
  hn as feBlend,
  fn as feColorMatrix,
  wn as feComponentTransfer,
  gn as feComposite,
  pn as feConvolveMatrix,
  dn as feDiffuseLighting,
  bn as feDisplacementMap,
  yn as feDistantLight,
  _n as feDropShadow,
  kn as feFlood,
  vn as feFuncA,
  En as feFuncB,
  Rn as feFuncG,
  Sn as feFuncR,
  Cn as feGaussianBlur,
  On as feImage,
  xn as feMerge,
  Fn as feMergeNode,
  jn as feMorphology,
  Pn as feOffset,
  Mn as fePointLight,
  An as feSpecularLighting,
  Nn as feSpotLight,
  Bn as feTile,
  Ln as feTurbulence,
  Ae as fieldset,
  Ne as figcaption,
  Be as figure,
  Tn as filter,
  b as flattenElementTree,
  Le as footer,
  Dn as foreignObject,
  Te as form,
  Un as g,
  d as getObjectMethods,
  De as h1,
  Ue as h2,
  $e as h3,
  Ie as h4,
  qe as h5,
  Ge as h6,
  Ye as head,
  Je as header,
  We as hgroup,
  He as hr,
  ze as html,
  Ke as i,
  Qe as iframe,
  $n as image,
  Xe as img,
  Ze as input,
  Ve as ins,
  et as kbd,
  tt as label,
  nt as legend,
  st as li,
  In as line,
  qn as linearGradient,
  rt as link,
  lt as main,
  it as map,
  ot as mark,
  Gn as marker,
  Yn as mask,
  ut as menu,
  at as meta,
  Jn as metadata,
  mt as meter,
  Wn as mpath,
  ct as nav,
  ht as noscript,
  ft as object,
  wt as ol,
  gt as optgroup,
  pt as option,
  dt as output,
  bt as p,
  Hn as path,
  zn as pattern,
  yt as picture,
  Kn as polygon,
  Qn as polyline,
  _t as pre,
  kt as progress,
  vt as q,
  Xn as radialGradient,
  Zn as rect,
  Et as rp,
  Rt as rt,
  St as ruby,
  Ct as s,
  Ot as samp,
  xt as search,
  Ft as section,
  jt as select,
  Vn as set,
  Pt as slot,
  Mt as small,
  At as source,
  Nt as span,
  es as stop,
  Bt as strong,
  Lt as sub,
  Tt as summary,
  Dt as sup,
  ts as svg,
  ss as symbol,
  Ut as table,
  $t as tbody,
  It as td,
  qt as template,
  ls as textPath,
  Gt as textarea,
  Yt as tfoot,
  Jt as th,
  Wt as thead,
  Ht as time,
  zt as title,
  M as toCssString,
  Kt as tr,
  Qt as track,
  os as tspan,
  Xt as u,
  Zt as ul,
  us as use,
  en as video,
  as as view,
  tn as wbr
};
//# sourceMappingURL=felin.js.map
