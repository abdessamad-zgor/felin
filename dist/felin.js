
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
var $b9742d79d7b0a03e$exports = {};

$parcel$export($b9742d79d7b0a03e$exports, "Registry", () => $b9742d79d7b0a03e$export$4d9facee29974f3);
$parcel$export($b9742d79d7b0a03e$exports, "Felin", () => $b9742d79d7b0a03e$export$76fb3b11e24d7138);
var $2bb0b494aaead7bf$exports = {};

$parcel$export($2bb0b494aaead7bf$exports, "DOMUpdate", () => $2bb0b494aaead7bf$export$5555872daa4f06f9);
$parcel$export($2bb0b494aaead7bf$exports, "ComputedRefresh", () => $2bb0b494aaead7bf$export$c52e4155f62af1ea);
$parcel$export($2bb0b494aaead7bf$exports, "EffectCall", () => $2bb0b494aaead7bf$export$5828e9a0e553cd23);
$parcel$export($2bb0b494aaead7bf$exports, "RouteChange", () => $2bb0b494aaead7bf$export$45d7d895b4aac00a);
$parcel$export($2bb0b494aaead7bf$exports, "InitEffectRegistry", () => $2bb0b494aaead7bf$export$56ff9fe5a7beeb12);
$parcel$export($2bb0b494aaead7bf$exports, "InitComputedRegistry", () => $2bb0b494aaead7bf$export$fea67a6c7e2368c7);
class $2bb0b494aaead7bf$export$5555872daa4f06f9 {
    constructor(args){
        this.priority = 1;
        this.args = args;
    }
    call() {
        for (let element of this.args.state.elements){
            let newValue = this.args.state();
            let nodeSelector = this.args.document.selector(element);
            let domElement = this.args.document.document.querySelector(nodeSelector);
            if (domElement) domElement.replaceWith(element.element());
        }
    }
}
class $2bb0b494aaead7bf$export$c52e4155f62af1ea {
    constructor(args){
        this.args = args;
        this.priority = 2;
    }
    call() {
        let newValue = this.args.fn(...this.args.states);
        this.args.value = newValue;
    }
}
class $2bb0b494aaead7bf$export$5828e9a0e553cd23 {
    constructor(args){
        this.args = args;
        this.priority = 3;
    }
    call() {
        this.args.effect();
    }
}
class $2bb0b494aaead7bf$export$45d7d895b4aac00a {
    constructor(args){
        this.args = args;
        this.priority = 4;
    }
    call() {
        this.args.router.matchRoute(this.args.path);
        let activeRoutes = this.args.router.active;
        let previousRoutes = this.args.router.previous;
        if (previousRoutes.length > 0) for (let previousRoute of previousRoutes){
            let routeParent = previousRoute.parent;
            routeParent._children = routeParent._children.filter((child)=>child._id != previousRoute.element._id);
        }
        for (let activeRoute of activeRoutes){
            let routeParent = activeRoute.parent;
            routeParent._children.splice(activeRoute.index, 0, activeRoute.element);
        }
        let routesParentNodes = activeRoutes.map((route)=>route.parent);
        for (let targetNode of routesParentNodes)this.args.document.rerenderElement(targetNode);
        this.args.document.window.history.pushState("", "", this.args.path);
    }
}
class $2bb0b494aaead7bf$export$56ff9fe5a7beeb12 {
    constructor(args){
        this.priority = 0;
        this.args = args;
    }
    call() {
        Felin.initEffectRegistry(this.args);
    }
}
class $2bb0b494aaead7bf$export$fea67a6c7e2368c7 {
    constructor(args){
        this.priority = 0;
        this.args = args;
    }
    call() {
        Felin.initComputedRegistry(this.args);
    }
}


var $07accdd0f6e0276a$exports = {};

$parcel$export($07accdd0f6e0276a$exports, "FText", () => $07accdd0f6e0276a$export$44155b4e60576956);
$parcel$export($07accdd0f6e0276a$exports, "FHTMLElement", () => $07accdd0f6e0276a$export$5aca75b6aace7423);
$parcel$export($07accdd0f6e0276a$exports, "FSVGElement", () => $07accdd0f6e0276a$export$5290f40031d29a0b);
var $ac765eb06d4b9acd$exports = {};

$parcel$export($ac765eb06d4b9acd$exports, "State", () => $ac765eb06d4b9acd$export$7254cc27399e90bd);
$parcel$export($ac765eb06d4b9acd$exports, "FObject", () => $ac765eb06d4b9acd$export$d5e80676d91e78a1);
$parcel$export($ac765eb06d4b9acd$exports, "FArray", () => $ac765eb06d4b9acd$export$822d777b86fe0aa4);
$parcel$export($ac765eb06d4b9acd$exports, "FNumber", () => $ac765eb06d4b9acd$export$9dbc5f74ee206e8e);
$parcel$export($ac765eb06d4b9acd$exports, "FString", () => $ac765eb06d4b9acd$export$7247fc7dfedd58fa);
$parcel$export($ac765eb06d4b9acd$exports, "FBoolean", () => $ac765eb06d4b9acd$export$636e063718929b4a);
var $fab42eb3dee39b5b$exports = {};

$parcel$export($fab42eb3dee39b5b$exports, "ValueType", () => $fab42eb3dee39b5b$export$f1921b45c66f982c);
$parcel$export($fab42eb3dee39b5b$exports, "toCssString", () => $fab42eb3dee39b5b$export$b108bf477f1767a9);
$parcel$export($fab42eb3dee39b5b$exports, "determineValueType", () => $fab42eb3dee39b5b$export$aaa51b9a4e209041);
$parcel$export($fab42eb3dee39b5b$exports, "getObjectMethods", () => $fab42eb3dee39b5b$export$7360f1dcbbc79d37);
$parcel$export($fab42eb3dee39b5b$exports, "flattenElementTree", () => $fab42eb3dee39b5b$export$8c9c8540fba163fe);
$parcel$export($fab42eb3dee39b5b$exports, "ExtensibleFunction", () => $fab42eb3dee39b5b$export$f38f450dbc1e989);

var $fab42eb3dee39b5b$export$f1921b45c66f982c;
(function(ValueType) {
    ValueType[ValueType["NUMBER"] = 0] = "NUMBER";
    ValueType[ValueType["STRING"] = 1] = "STRING";
    ValueType[ValueType["BOOLEAN"] = 2] = "BOOLEAN";
    ValueType[ValueType["OBJECT"] = 3] = "OBJECT";
    ValueType[ValueType["MAP"] = 4] = "MAP";
    ValueType[ValueType["SET"] = 5] = "SET";
    ValueType[ValueType["ARRAY"] = 6] = "ARRAY";
    ValueType[ValueType["ANY"] = 7] = "ANY";
})($fab42eb3dee39b5b$export$f1921b45c66f982c || ($fab42eb3dee39b5b$export$f1921b45c66f982c = {}));
function $fab42eb3dee39b5b$export$b108bf477f1767a9(style) {
    let styleString = "";
    for (let property of Object.keys(style)){
        let key = property.split("").map((char, i)=>{
            if (property.charCodeAt(i) >= 65 && property.charCodeAt(i) <= 90) return "-" + char.toLowerCase();
            return char;
        });
        styleString += key.join("") + ": " + style[property] + ";";
    }
    return styleString;
}
function $fab42eb3dee39b5b$var$isObjectLiteral(obj) {
    if (typeof obj !== "object" || obj === null) return false;
    var hasOwnProp = Object.prototype.hasOwnProperty, ObjProto = obj;
    // get obj's Object constructor's prototype
    while(Object.getPrototypeOf(ObjProto = Object.getPrototypeOf(ObjProto)) !== null);
    return Object.getPrototypeOf(obj) === ObjProto;
}
function $fab42eb3dee39b5b$export$aaa51b9a4e209041(value) {
    if (typeof value == "string") return 1;
    else if (typeof value == "number") return 0;
    else if (typeof value == "boolean") return 2;
    else if (Array.isArray(value)) return 6;
    else if ($fab42eb3dee39b5b$var$isObjectLiteral(value)) return 3;
    else return 7;
}
function $fab42eb3dee39b5b$export$7360f1dcbbc79d37(obj) {
    let objectPrototype = obj.prototype;
    let methods = Object.getOwnPropertyNames(objectPrototype).filter((k)=>typeof obj[k] == "function" && k != "constructor");
    return methods;
}
function $fab42eb3dee39b5b$export$8c9c8540fba163fe(element, acc) {
    if (acc) {
        let lastElementParent = element;
        let i = 1;
        let nextElementParentIndex = acc.findIndex((e)=>e._id == element._id) + i;
        let nextElementParent = null;
        while(nextElementParentIndex < acc.length){
            nextElementParent = acc[nextElementParentIndex];
            if (nextElementParent instanceof (0, $07accdd0f6e0276a$export$5290f40031d29a0b) || nextElementParent instanceof (0, $07accdd0f6e0276a$export$5aca75b6aace7423)) {
                if (nextElementParent._children.length != 0) {
                    nextElementParent = acc[nextElementParentIndex];
                    acc = [
                        ...acc,
                        ...nextElementParent._children
                    ];
                    return $fab42eb3dee39b5b$export$8c9c8540fba163fe(nextElementParent, acc);
                } else continue;
            }
            i++;
            nextElementParentIndex = acc.findIndex((e)=>e._id == element._id) + i;
        }
        return acc;
    } else {
        let accumulator = [];
        if (element instanceof (0, $07accdd0f6e0276a$export$5aca75b6aace7423) || element instanceof (0, $07accdd0f6e0276a$export$5290f40031d29a0b)) {
            if (element._children.length > 0) {
                accumulator = [
                    element,
                    ...element._children
                ];
                return $fab42eb3dee39b5b$export$8c9c8540fba163fe(element, accumulator);
            } else {
                accumulator = [
                    element
                ];
                return accumulator;
            }
        } else {
            accumulator = [
                element
            ];
            return accumulator;
        }
    }
    return [];
}
class $fab42eb3dee39b5b$export$f38f450dbc1e989 extends Function {
    constructor(f){
        super();
        return Object.setPrototypeOf(f, new.target.prototype);
    }
}


var $af4ecce1f27713e1$exports = {};

$parcel$export($af4ecce1f27713e1$exports, "Computed", () => $af4ecce1f27713e1$export$836eee5a40e84ba8);

class $af4ecce1f27713e1$export$836eee5a40e84ba8 extends (0, $fab42eb3dee39b5b$export$f38f450dbc1e989) {
    constructor(fn, ...states){
        super(()=>{
            this.value = this.fn(...this.states);
            return this.value;
        });
        this.elements = [];
        this.fn = fn;
        this.states = states;
        this.value = fn(...states);
        this._id = crypto.randomUUID();
        Felin.registerComputed(this);
    }
    setElement(element) {
        this.elements.push(element);
    }
}


class $ac765eb06d4b9acd$export$7254cc27399e90bd extends (0, $fab42eb3dee39b5b$export$f38f450dbc1e989) {
    constructor(value, parent){
        super(()=>this.state.value);
        this.elements = [];
        this._id = crypto.randomUUID();
        if (parent) this.parent = parent;
        switch((0, $fab42eb3dee39b5b$export$aaa51b9a4e209041)(value)){
            case (0, $fab42eb3dee39b5b$export$f1921b45c66f982c).OBJECT:
                this.state = new $ac765eb06d4b9acd$export$d5e80676d91e78a1(value);
                this.state.parent = this;
                break;
            case (0, $fab42eb3dee39b5b$export$f1921b45c66f982c).ARRAY:
                this.state = new $ac765eb06d4b9acd$export$822d777b86fe0aa4(value);
                this.state.parent = this;
                break;
            case (0, $fab42eb3dee39b5b$export$f1921b45c66f982c).NUMBER:
                this.state = new $ac765eb06d4b9acd$export$9dbc5f74ee206e8e(value);
                this.state.parent = this;
                break;
            case (0, $fab42eb3dee39b5b$export$f1921b45c66f982c).STRING:
                this.state = new $ac765eb06d4b9acd$export$7247fc7dfedd58fa(value);
                this.state.parent = this;
                break;
            case (0, $fab42eb3dee39b5b$export$f1921b45c66f982c).BOOLEAN:
                this.state = new $ac765eb06d4b9acd$export$636e063718929b4a(value);
                this.state.parent = this;
                break;
            case (0, $fab42eb3dee39b5b$export$f1921b45c66f982c).ANY:
                throw Error("Error: unsupported state data type.");
            default:
                break;
        }
        if (this.state instanceof $ac765eb06d4b9acd$export$d5e80676d91e78a1) {
            let handler = {
                get: (target, prop, reciever)=>{
                    if (prop == "set") return this.set;
                    else if ((0, $fab42eb3dee39b5b$export$7360f1dcbbc79d37)(target.state).includes(prop)) return target.state[prop];
                    else if (!Object.keys(target()).includes(prop)) return Reflect.get(target, prop, reciever);
                    else {
                        let value = target.state[prop];
                        let childState = new $ac765eb06d4b9acd$export$7254cc27399e90bd(value, {
                            state: this,
                            key: prop
                        });
                        return childState;
                    }
                }
            };
            return new Proxy(this, handler);
        } else if (this.state instanceof $ac765eb06d4b9acd$export$822d777b86fe0aa4) {
            let handler = {
                get: (target, prop, reciever)=>{
                    if (prop == "set") return this.set;
                    else if ((0, $fab42eb3dee39b5b$export$7360f1dcbbc79d37)(target.state).includes(prop)) return target.state[prop];
                    else if (!Object.keys(target()).includes(prop)) return Reflect.get(target, prop, reciever);
                    else {
                        let value = target.state[prop];
                        let childState = new $ac765eb06d4b9acd$export$7254cc27399e90bd(value, {
                            state: this,
                            key: prop
                        });
                        return childState;
                    }
                }
            };
            return new Proxy(this, handler);
        } else if (this.state instanceof $ac765eb06d4b9acd$export$9dbc5f74ee206e8e) {
            let handler = {
                get: (target, prop, reciever)=>{
                    if (prop == "set") return target.set;
                    else if ((0, $fab42eb3dee39b5b$export$7360f1dcbbc79d37)(target.state).includes(prop)) return target.state[prop];
                    else return Reflect.get(target, prop, reciever);
                }
            };
            return new Proxy(this, handler);
        }
    }
    set(fnOrState, child) {
        let newValue = this.state.value;
        if (child) {
            for (let key of Object.keys(this.state.value))if (key == child.parent.key) newValue[key] = child.state.value;
        }
        if (fnOrState) {
            if (typeof fnOrState === "function") newValue = fnOrState(this.state.value);
            else newValue = fnOrState;
            this.state.value = newValue;
        }
        if (this.parent) {
            this.state.value = newValue;
            this.parent.state.set(undefined, this);
        } else {
            this.state.value = newValue;
            Felin.registerStateUpdate(this);
        }
    }
    setElement(element) {
        this.elements.push(element);
    }
}
class $ac765eb06d4b9acd$export$822d777b86fe0aa4 {
    constructor(value){
        this.value = value;
        let handler = {
            get: (target, prop, reciever)=>{
                if ((0, $fab42eb3dee39b5b$export$7360f1dcbbc79d37)(target).includes(prop)) return target[prop];
                else if (Object.keys(target.value).includes(prop)) {
                    let value = target.value[prop];
                    return value;
                } else return Reflect.get(target, prop, reciever);
            }
        };
        return new Proxy(this, handler);
    }
    map() {}
    filter() {}
    reduce() {}
    find() {}
    every() {}
    some() {}
}
class $ac765eb06d4b9acd$export$636e063718929b4a {
    constructor(value){
        this.value = value;
    }
}
class $ac765eb06d4b9acd$export$d5e80676d91e78a1 {
    constructor(value){
        this.value = value;
        let handler = {
            get: (target, prop, reciever)=>{
                if (!Object.keys(target.value).includes(prop)) return Reflect.get(target, prop, reciever);
                else {
                    let value = target.value[prop];
                    return value;
                }
            }
        };
        return new Proxy(this, handler);
    }
    keys() {
        return new (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)(()=>Object.keys(this.value), this.parent);
    }
    values() {
        return new (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)(()=>Object.values(this.value), this.parent);
    }
    has(key) {
        return new (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)(()=>Object.keys(this.value).includes(key), this.parent);
    }
}
class $ac765eb06d4b9acd$export$7247fc7dfedd58fa {
    constructor(value){
        this.value = value;
    }
}
class $ac765eb06d4b9acd$export$9dbc5f74ee206e8e {
    constructor(value){
        this.value = value;
    }
    gt(cmp) {
        return new (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)(()=>this.value > cmp, this.parent);
    }
    gte(cmp) {
        return new (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)(()=>this.value >= cmp, this.parent);
    }
    lt(cmp) {
        return new (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)(()=>this.value < cmp, this.parent);
    }
    lte(cmp) {
        return new (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)(()=>this.value <= cmp, this.parent);
    }
    eq(cmp) {
        return new (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)(()=>this.value == cmp, this.parent);
    }
}



var $6dd8eba6afe36dea$exports = {};

$parcel$export($6dd8eba6afe36dea$exports, "Router", () => $6dd8eba6afe36dea$export$55185c17a0fcbe46);
$parcel$export($6dd8eba6afe36dea$exports, "Route", () => $6dd8eba6afe36dea$export$e7b0ac011bb776c6);

class $6dd8eba6afe36dea$export$55185c17a0fcbe46 {
    constructor(...routes){
        this.routes = routes;
        this.params = {};
        this.previous = [];
        this.active = [];
    }
    matchRoute(path) {
        if (this.active.length > 0) {
            this.previous = [
                ...this.active
            ];
            this.active = [];
        }
        if (path == "/") {
            let homeRoute = this.routes.find((r)=>r.path == "/");
            if (homeRoute) {
                this.active = [
                    homeRoute
                ];
                return;
            }
            return;
        }
        let pathSegments = path.split("/").filter((s)=>s != "");
        console.log(pathSegments);
        let foundMatch = undefined;
        for(let i = 0; i < pathSegments.length; i++){
            if (!foundMatch) for (let route of this.routes){
                let routeSegments = route.path.split("/");
                if (pathSegments[i] == routeSegments[i]) {
                    foundMatch = route;
                    break;
                }
            }
            else {
                foundMatch = undefined;
                for (let matchChildRoute of foundMatch.children){
                    let routeSegments = matchChildRoute.path.split("/");
                    if (routeSegments[i].startsWith(":")) {
                        this.params = {
                            [routeSegments[i].slice(1)]: Number.isNaN(+pathSegments[i]) ? +pathSegments[i] : pathSegments[i]
                        };
                        foundMatch = matchChildRoute;
                        break;
                    } else if (routeSegments[i] == pathSegments[i]) {
                        foundMatch = matchChildRoute;
                        break;
                    }
                }
            }
            if (foundMatch != undefined) {
                this.active.push(foundMatch);
                continue;
            } else if (i == 0) {
                let catchAll = this.routes.find((r)=>r.path == "*");
                if (catchAll != undefined) this.active = [
                    catchAll
                ];
                break;
            } else if (this.active.length < i + 1) break;
        }
    }
    buildRouterTree() {
        for (let route of this.routes){
            let element = route.element;
            if (element instanceof (0, $07accdd0f6e0276a$export$5aca75b6aace7423)) {
                if (element.register.router) throw Error("Cannot have nested routers inside the same element tree");
                else {
                    if (element.register.routes && element.register.routes.length > 0) for (let childRoute of element.register.routes){
                        childRoute.parentRoute = route;
                        route.children.push(childRoute);
                    }
                }
            }
        }
        return this;
    }
}
class $6dd8eba6afe36dea$export$e7b0ac011bb776c6 {
    constructor(path, element){
        this.children = [];
        this.path = path;
        this.element = element;
    }
}



class $07accdd0f6e0276a$export$44155b4e60576956 {
    constructor(text, ...args){
        this._id = crypto.randomUUID();
        this.register = {};
        if (args.length > 0) for (let arg of args){
            if (arg instanceof (0, $ac765eb06d4b9acd$export$7254cc27399e90bd)) {
                arg.setElement(this);
                if (!this.register.states) this.register.states = [];
                this.register.states.push(arg);
                text = text.replace("{}", arg());
                continue;
            }
            text = text.replace("{}", arg);
        }
        this.text = text.toString();
    }
    element() {
        let textContent = this.text;
        for (let state of this.register.states)textContent = textContent.replace("{}", state());
        return document.createTextNode(textContent);
    }
}
class $07accdd0f6e0276a$export$5aca75b6aace7423 {
    constructor(name, children){
        this._id = crypto.randomUUID();
        this.name = name;
        this.register = {};
        if (Array.isArray(children)) {
            this._children = [];
            for(let i = 0; i < children.length; i++){
                let child = children[i];
                if (child instanceof (0, $ac765eb06d4b9acd$export$7254cc27399e90bd)) {
                    this._children.push(new $07accdd0f6e0276a$export$44155b4e60576956("{}", child));
                    child.setElement(this);
                    if (!this.register.states) this.register.states = [];
                    this.register.states.push(child);
                } else if (child instanceof (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)) {
                    this._children.push(new $07accdd0f6e0276a$export$44155b4e60576956("{}", child));
                    child.setElement(this);
                    if (!this.register.computed) this.register.computed = [];
                    this.register.computed.push(child);
                } else if (child instanceof (0, $6dd8eba6afe36dea$export$55185c17a0fcbe46)) {
                    if (this.register.router) throw Error("Cannot have multiple routers in the same element tree.");
                    else {
                        child.parent = this;
                        child.index = i;
                        this.register.router = child;
                        for (let route of this.register.router.routes){
                            route.parent = this;
                            route.index = i;
                        }
                    }
                } else if (child instanceof (0, $6dd8eba6afe36dea$export$e7b0ac011bb776c6)) {
                    child.parent = this;
                    child.index = i;
                    if (!Array.isArray(this.register.routes)) this.register.routes = [];
                    this.register.routes.push(child);
                } else if (child instanceof $07accdd0f6e0276a$export$5aca75b6aace7423 || child instanceof $07accdd0f6e0276a$export$5290f40031d29a0b || child instanceof $07accdd0f6e0276a$export$44155b4e60576956) {
                    child.parent = this;
                    this._children.push(child);
                } else if (typeof child == "string" || typeof child == "number") {
                    let textContent = new $07accdd0f6e0276a$export$44155b4e60576956(child.toString());
                    this._children.push(textContent);
                }
            }
        } else this._children = [];
        this._style = null;
        this._listeners = new Map();
        this._attributes = {};
    }
    style(style) {
        this._style = style;
        return this;
    }
    children(children) {
        for (let child of children)if (child instanceof (0, $ac765eb06d4b9acd$export$7254cc27399e90bd) || child instanceof (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)) {
            let textContent = new $07accdd0f6e0276a$export$44155b4e60576956("{}", child());
            textContent.parent = this;
            this._children.push(textContent);
        } else this._children.push(child);
        return this;
    }
    listener(eventname, callback) {
        if (!this._listeners.has(eventname)) this._listeners.set(eventname, callback);
        return this;
    }
    element() {
        let element = document.createElement(this.name);
        for (let entry of this._listeners.entries())element.addEventListener(entry[0], entry[1]);
        if (this._style) element.style.cssText = (0, $fab42eb3dee39b5b$export$b108bf477f1767a9)(this._style);
        if (this._classname) element.classList.add(...this._classname.split(" "));
        for (let key of Object.keys(this._attributes))element.setAttribute(key, this._attributes[key]);
        let elementChildren = this._children;
        if (elementChildren.length == 0) return element;
        else {
            for (let child of elementChildren)element.appendChild(child.element());
            return element;
        }
    }
    class(classname) {
        this._classname = classname;
    }
    attr(name, value) {
        this._attributes[name] = value;
    }
    attrs(attrs) {
        this._attributes = {
            ...this._attributes,
            ...attrs
        };
    }
}
class $07accdd0f6e0276a$export$5290f40031d29a0b {
    constructor(name, children){
        this._id = crypto.randomUUID();
        this.name = name;
        this.register = {};
        this._children = [];
        for (let child of children){
            if (child instanceof (0, $ac765eb06d4b9acd$export$7254cc27399e90bd)) {
                let textContent = new $07accdd0f6e0276a$export$44155b4e60576956("{}", child);
                textContent.parent = this;
                this._children.push(textContent);
                if (!this.register.states) this.register.states = [];
                this.register.states.push(child);
                this.register.states.push(child);
            } else if (child instanceof (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)) {
                let textContent = new $07accdd0f6e0276a$export$44155b4e60576956("{}", child);
                textContent.parent = this;
                this._children.push(textContent);
                if (!this.register.computed) this.register.computed = [];
                this.register.computed.push(child);
            } else this._children.push(typeof child == "string" ? new $07accdd0f6e0276a$export$44155b4e60576956(child) : child);
        }
        this._style = null;
        this._listeners = new Map();
        this._attributes = {};
    }
    style(style) {
        this._style = style;
        return this;
    }
    children(children) {
        for (let child of children)if (child instanceof (0, $ac765eb06d4b9acd$export$7254cc27399e90bd)) this._children.push(new $07accdd0f6e0276a$export$44155b4e60576956("{}", child));
        else this._children.push(child);
        return this;
    }
    listener(eventname, callback) {
        if (!this._listeners.has(eventname)) this._listeners.set(eventname, callback);
        return this;
    }
    element(parent) {
        if (parent) this.parent = parent;
        let element = document.createElementNS("http://www.w3.org/2000/svg", this.name);
        //element.style.cssText = toCssString(this._style)
        for (let entry of this._listeners.entries())element.addEventListener(entry[0], entry[1]);
        if (this._style) element.style.cssText = (0, $fab42eb3dee39b5b$export$b108bf477f1767a9)(this._style);
        if (this._classname) element.classList.add(...this._classname.split(" "));
        for (let key of Object.keys(this._attributes))element.setAttribute(key, this._attributes[key]);
        let elementChildren = this._children;
        if (elementChildren.length == 0) return element;
        else {
            for (let child of elementChildren)//@ts-ignore
            element.appendChild(child.element(this));
            return element;
        }
    }
    class(classname) {
        this._classname = classname;
    }
    attr(name, value) {
        this._attributes[name] = value;
    }
    attrs(attrs) {
        this._attributes = {
            ...this._attributes,
            ...attrs
        };
    }
}


var $0b8665cef9b4a99e$exports = {};

$parcel$export($0b8665cef9b4a99e$exports, "Stack", () => $0b8665cef9b4a99e$export$694e0d28c7ffc90c);
function $0b8665cef9b4a99e$var$quickSortByPriority(array) {
    if (array.length <= 1) return array;
    let pivot = array[0];
    let left = [];
    let right = [];
    for(let i = 1; i < array.length; i++)array[i].priority < pivot.priority ? left.push(array[i]) : right.push(array[i]);
    return $0b8665cef9b4a99e$var$quickSortByPriority(left).concat(pivot, $0b8665cef9b4a99e$var$quickSortByPriority(right));
}
class $0b8665cef9b4a99e$export$694e0d28c7ffc90c {
    constructor(){
        this.tasks = [];
        this.running = false;
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
        this.tasks = $0b8665cef9b4a99e$var$quickSortByPriority(this.tasks);
        if (!this.running) this.run();
    }
    empty() {
        return this.tasks.length == 0;
    }
    run() {
        if (!this.running) this.running = true;
        while(this.running){
            if (this.empty()) {
                this.running = false;
                break;
            }
            let task = this.pop();
            task.call();
        }
    }
}


class $b9742d79d7b0a03e$export$4d9facee29974f3 {
    constructor(){
        this.stack = new (0, $0b8665cef9b4a99e$export$694e0d28c7ffc90c)();
        this.register = {};
    }
    initEffectRegistry(effect) {
        let root = Object.keys(this.register).find((r)=>effect.states.map((s)=>s._id).some((s_id)=>this.register[r].states.map((s)=>s._id).includes(s_id)));
        if (root) {
            if (!this.register[root].effects) this.register[root].effects = [];
            this.register[root].effects.push(effect);
        } else this.stack.push(new (0, $2bb0b494aaead7bf$export$56ff9fe5a7beeb12)(effect));
    }
    initComputedRegistry(computed) {
        let root = Object.keys(this.register).find((r)=>computed.states.map((s)=>s._id).some((s_id)=>this.register[r].states.map((s)=>s._id).includes(s_id)));
        if (root) {
            if (!this.register[root].computed) this.register[root].computed = [];
            this.register[root].computed.push(computed);
        } else this.stack.push(new (0, $2bb0b494aaead7bf$export$fea67a6c7e2368c7)(computed));
    }
    registerStates(root, states) {
        this.register[root].states = states;
    }
    registerStateUpdate(state) {
        let root = Object.keys(this.register).find((r)=>this.register[r].states.some((s)=>s._id == state._id));
        if (root) {
            let fdocument = this.register[root].document;
            let states = this.register[root].states.filter((s)=>s._id == state._id);
            for (let state of states){
                let targets = state.elements;
                for (let target of targets){
                    if (target instanceof (0, $07accdd0f6e0276a$export$44155b4e60576956)) target = target.parent;
                    let domUpdate = new (0, $2bb0b494aaead7bf$export$5555872daa4f06f9)({
                        document: fdocument,
                        state: state
                    });
                    this.stack.push(domUpdate);
                }
            }
            let computed = this.register[root].computed.find((e)=>e.states.some((s)=>s._id == state._id));
            if (computed) {
                let computedRefresh = new (0, $2bb0b494aaead7bf$export$c52e4155f62af1ea)(computed);
                this.stack.push(computedRefresh);
                let cStates = this.register[root].computed.filter((s)=>s._id == computed._id);
                for (let cState of cStates){
                    let cTargets = cState.elements;
                    for (let cTarget of cTargets){
                        if (cTarget instanceof (0, $07accdd0f6e0276a$export$44155b4e60576956)) cTarget = cTarget.parent;
                        let computedDomUpdate = new (0, $2bb0b494aaead7bf$export$5555872daa4f06f9)({
                            document: fdocument,
                            state: cState
                        });
                        this.stack.push(computedDomUpdate);
                    }
                }
            }
            let effect = this.register[root].effects.find((e)=>e.states.some((s)=>s._id == state._id));
            if (effect) {
                let effectCall = new (0, $2bb0b494aaead7bf$export$5828e9a0e553cd23)(effect);
                this.stack.push(effectCall);
            }
        }
    }
    registerFlDocumentRoot(root, document) {
        if (!Object.keys(this.register).includes(root)) this.register[root] = {};
        this.register[root].document = document;
    }
    run() {
        this.stack.run();
    }
    registerEffect(effect) {
        let initTask = new (0, $2bb0b494aaead7bf$export$56ff9fe5a7beeb12)(effect);
        setTimeout(()=>{
            this.stack.push(initTask);
        }, 1000);
    }
    registerComputed(computed) {
        let initTask = new (0, $2bb0b494aaead7bf$export$fea67a6c7e2368c7)(computed);
        setTimeout(()=>{
            this.stack.push(initTask);
        }, 1000);
    }
    registerActiveRouter(rootSelector, router) {
        if (!Object.keys(this.register).includes(rootSelector)) this.register[rootSelector] = {};
        this.register[rootSelector].router = router;
        this.registerRouteChange(window.location.href.slice(window.location.host.length + window.location.protocol.length + 2), rootSelector);
    }
    registerRouteChange(path, rootSelector) {
        let args = {
            path: path,
            router: this.register[rootSelector].router,
            document: this.register[rootSelector].document
        };
        let routeChangeTask = new (0, $2bb0b494aaead7bf$export$45d7d895b4aac00a)(args);
        this.stack.push(routeChangeTask);
    }
    getElementRootSelector(element, parent) {
        let rootSelector;
        let doesHaveChild = false;
        if (parent) {
            for (let child of parent._children){
                if (child._id == element._id) doesHaveChild = true;
                else if (child instanceof (0, $07accdd0f6e0276a$export$5aca75b6aace7423)) doesHaveChild = this.getElementRootSelector(element, child);
            }
            return doesHaveChild;
        } else {
            for (let selector of Object.keys(this.register)){
                let selectedDocument = this.register[selector].document;
                for (let child of selectedDocument.rootElement._children)if (child._id == element._id) rootSelector = selector;
                else {
                    if (child instanceof (0, $07accdd0f6e0276a$export$5aca75b6aace7423)) {
                        if (this.getElementRootSelector(element, child) == true) rootSelector = selector;
                    }
                }
            }
            return rootSelector;
        }
    }
    getRouterParams() {
        let routers = Object.keys(this.register).map((selector)=>this.register[selector].router);
        let params = {};
        for (let router of routers)if (router.active.length > 0) params = router.params;
        return params;
    }
}
const $b9742d79d7b0a03e$export$76fb3b11e24d7138 = new $b9742d79d7b0a03e$export$4d9facee29974f3();


var $e739bdd81ae7e1f8$exports = {};

var $e02ab9edca31aa60$exports = {};

$parcel$export($e02ab9edca31aa60$exports, "Effect", () => $e02ab9edca31aa60$export$a32b0b1c1ac59d04);
class $e02ab9edca31aa60$export$a32b0b1c1ac59d04 {
    constructor(fn, ...states){
        this.effect = fn;
        this.states = states;
        this._id = crypto.randomUUID();
        Felin.registerEffect(this);
    }
}


var $d5b2a6f33979457b$exports = {};

$parcel$export($d5b2a6f33979457b$exports, "Conditional", () => $d5b2a6f33979457b$export$2073789870570c87);
$parcel$export($d5b2a6f33979457b$exports, "Loop", () => $d5b2a6f33979457b$export$550acbd06a1f5a6a);
class $d5b2a6f33979457b$export$2073789870570c87 {
    constructor(condition, _true, _false){
        this.condition = condition;
        this._true = _true;
        this._false = _false;
    }
    element(parent) {
        if (parent) this.parent = parent;
        let result = this.condition();
        if (result) return this._true.element();
        else return this._false.element();
    }
}
class $d5b2a6f33979457b$export$550acbd06a1f5a6a {
    constructor(state, iteration){
        this.state = state;
        this.iteration = iteration;
    }
}



$parcel$exportWildcard($e739bdd81ae7e1f8$exports, $ac765eb06d4b9acd$exports);
$parcel$exportWildcard($e739bdd81ae7e1f8$exports, $e02ab9edca31aa60$exports);
$parcel$exportWildcard($e739bdd81ae7e1f8$exports, $d5b2a6f33979457b$exports);
$parcel$exportWildcard($e739bdd81ae7e1f8$exports, $af4ecce1f27713e1$exports);


var $8e8dbc49627405cc$exports = {};
var $5828278ff3f63a5f$exports = {};

$parcel$export($5828278ff3f63a5f$exports, "Component", () => $5828278ff3f63a5f$export$16fa2f45be04daa8);

class $5828278ff3f63a5f$export$16fa2f45be04daa8 extends (0, $fab42eb3dee39b5b$export$f38f450dbc1e989) {
    constructor(fn){
        super((props)=>{
            this.props = props;
            return this;
        });
        this.fn = fn;
    }
    element(parent) {
        if (parent) this.parentNode = parent;
        let element = this.fn(this.props);
        return element.element();
    }
}



var $d8604e77328e28ad$exports = {};

$parcel$export($d8604e77328e28ad$exports, "a", () => $d8604e77328e28ad$export$407448d2b89b1813);
$parcel$export($d8604e77328e28ad$exports, "abbr", () => $d8604e77328e28ad$export$2bcb785951133fe5);
$parcel$export($d8604e77328e28ad$exports, "address", () => $d8604e77328e28ad$export$f7d3c097ceca6c15);
$parcel$export($d8604e77328e28ad$exports, "area", () => $d8604e77328e28ad$export$bb3edc44842b5f2e);
$parcel$export($d8604e77328e28ad$exports, "article", () => $d8604e77328e28ad$export$bba2aacf8566461b);
$parcel$export($d8604e77328e28ad$exports, "aside", () => $d8604e77328e28ad$export$64a02cd6422b91be);
$parcel$export($d8604e77328e28ad$exports, "audio", () => $d8604e77328e28ad$export$592b77e6034db746);
$parcel$export($d8604e77328e28ad$exports, "b", () => $d8604e77328e28ad$export$8b22cf2602fb60ce);
$parcel$export($d8604e77328e28ad$exports, "base", () => $d8604e77328e28ad$export$e2253033e6e1df16);
$parcel$export($d8604e77328e28ad$exports, "bdi", () => $d8604e77328e28ad$export$2d20a4e9df674436);
$parcel$export($d8604e77328e28ad$exports, "bdo", () => $d8604e77328e28ad$export$fae0db89ef70aab2);
$parcel$export($d8604e77328e28ad$exports, "blockquote", () => $d8604e77328e28ad$export$67dc04e652a298ca);
$parcel$export($d8604e77328e28ad$exports, "body", () => $d8604e77328e28ad$export$32180ef41b15b513);
$parcel$export($d8604e77328e28ad$exports, "br", () => $d8604e77328e28ad$export$479ac0420f53ed26);
$parcel$export($d8604e77328e28ad$exports, "button", () => $d8604e77328e28ad$export$2ba01fb71ed41cb6);
$parcel$export($d8604e77328e28ad$exports, "canvas", () => $d8604e77328e28ad$export$67ea982130081db);
$parcel$export($d8604e77328e28ad$exports, "caption", () => $d8604e77328e28ad$export$8e3c2dfdc4f0453d);
$parcel$export($d8604e77328e28ad$exports, "cite", () => $d8604e77328e28ad$export$3035df57df42c31a);
$parcel$export($d8604e77328e28ad$exports, "code", () => $d8604e77328e28ad$export$6565f9f03506010b);
$parcel$export($d8604e77328e28ad$exports, "col", () => $d8604e77328e28ad$export$aba86695643891f5);
$parcel$export($d8604e77328e28ad$exports, "colgroup", () => $d8604e77328e28ad$export$3db318dd257cd653);
$parcel$export($d8604e77328e28ad$exports, "data", () => $d8604e77328e28ad$export$4051a07651545597);
$parcel$export($d8604e77328e28ad$exports, "datalist", () => $d8604e77328e28ad$export$d6956b5f6d5ee87d);
$parcel$export($d8604e77328e28ad$exports, "dd", () => $d8604e77328e28ad$export$eaaeafa904fe3ddf);
$parcel$export($d8604e77328e28ad$exports, "del", () => $d8604e77328e28ad$export$1d2f21e549771e67);
$parcel$export($d8604e77328e28ad$exports, "details", () => $d8604e77328e28ad$export$41ee12f6f6f05843);
$parcel$export($d8604e77328e28ad$exports, "dfn", () => $d8604e77328e28ad$export$771f54d1a902afc9);
$parcel$export($d8604e77328e28ad$exports, "dialog", () => $d8604e77328e28ad$export$518824cf31321346);
$parcel$export($d8604e77328e28ad$exports, "div", () => $d8604e77328e28ad$export$159d9494db57879b);
$parcel$export($d8604e77328e28ad$exports, "dl", () => $d8604e77328e28ad$export$53d26b7a9a23d594);
$parcel$export($d8604e77328e28ad$exports, "dt", () => $d8604e77328e28ad$export$9198f9466fc833e);
$parcel$export($d8604e77328e28ad$exports, "em", () => $d8604e77328e28ad$export$c63c6f932822f543);
$parcel$export($d8604e77328e28ad$exports, "embed", () => $d8604e77328e28ad$export$2be46bb7e96db87f);
$parcel$export($d8604e77328e28ad$exports, "fieldset", () => $d8604e77328e28ad$export$a38812d1aa1302d9);
$parcel$export($d8604e77328e28ad$exports, "figcaption", () => $d8604e77328e28ad$export$b75acb72a9c69c26);
$parcel$export($d8604e77328e28ad$exports, "figure", () => $d8604e77328e28ad$export$991dc94f816a1d48);
$parcel$export($d8604e77328e28ad$exports, "footer", () => $d8604e77328e28ad$export$adb608be33961c98);
$parcel$export($d8604e77328e28ad$exports, "form", () => $d8604e77328e28ad$export$6210fa4921d2a466);
$parcel$export($d8604e77328e28ad$exports, "h1", () => $d8604e77328e28ad$export$448e4850cad7c7b0);
$parcel$export($d8604e77328e28ad$exports, "h2", () => $d8604e77328e28ad$export$a943aa9a0fca3f0b);
$parcel$export($d8604e77328e28ad$exports, "h3", () => $d8604e77328e28ad$export$7edd4a21fac8ce55);
$parcel$export($d8604e77328e28ad$exports, "h4", () => $d8604e77328e28ad$export$51a85cc1b68f452c);
$parcel$export($d8604e77328e28ad$exports, "h5", () => $d8604e77328e28ad$export$f44841a11990acb2);
$parcel$export($d8604e77328e28ad$exports, "h6", () => $d8604e77328e28ad$export$c9ccd321d64f47e3);
$parcel$export($d8604e77328e28ad$exports, "head", () => $d8604e77328e28ad$export$5fd5031fecdacec3);
$parcel$export($d8604e77328e28ad$exports, "header", () => $d8604e77328e28ad$export$38e42c68cf43b5d4);
$parcel$export($d8604e77328e28ad$exports, "hgroup", () => $d8604e77328e28ad$export$e7c17d6cef8bd1c);
$parcel$export($d8604e77328e28ad$exports, "hr", () => $d8604e77328e28ad$export$b4adb3f464574dcf);
$parcel$export($d8604e77328e28ad$exports, "html", () => $d8604e77328e28ad$export$c0bb0b647f701bb5);
$parcel$export($d8604e77328e28ad$exports, "i", () => $d8604e77328e28ad$export$23f2a1d2818174ef);
$parcel$export($d8604e77328e28ad$exports, "iframe", () => $d8604e77328e28ad$export$8cde213409fd6377);
$parcel$export($d8604e77328e28ad$exports, "img", () => $d8604e77328e28ad$export$463b44d9bf3628be);
$parcel$export($d8604e77328e28ad$exports, "input", () => $d8604e77328e28ad$export$b7e3ae3d7c15e42e);
$parcel$export($d8604e77328e28ad$exports, "ins", () => $d8604e77328e28ad$export$27a48efc044c200a);
$parcel$export($d8604e77328e28ad$exports, "kbd", () => $d8604e77328e28ad$export$1ed45b69d23c052b);
$parcel$export($d8604e77328e28ad$exports, "label", () => $d8604e77328e28ad$export$1237798dc640739a);
$parcel$export($d8604e77328e28ad$exports, "legend", () => $d8604e77328e28ad$export$9a9b59e08de24cef);
$parcel$export($d8604e77328e28ad$exports, "li", () => $d8604e77328e28ad$export$19caeaf7d9d84644);
$parcel$export($d8604e77328e28ad$exports, "link", () => $d8604e77328e28ad$export$9c30223ca0a664fb);
$parcel$export($d8604e77328e28ad$exports, "main", () => $d8604e77328e28ad$export$f22da7240b7add18);
$parcel$export($d8604e77328e28ad$exports, "map", () => $d8604e77328e28ad$export$871de8747c9eaa88);
$parcel$export($d8604e77328e28ad$exports, "mark", () => $d8604e77328e28ad$export$bf7f2fce5c1cf636);
$parcel$export($d8604e77328e28ad$exports, "menu", () => $d8604e77328e28ad$export$b1e5508a851be14d);
$parcel$export($d8604e77328e28ad$exports, "meta", () => $d8604e77328e28ad$export$6990040ee07315);
$parcel$export($d8604e77328e28ad$exports, "meter", () => $d8604e77328e28ad$export$82334bbdfcebb57);
$parcel$export($d8604e77328e28ad$exports, "nav", () => $d8604e77328e28ad$export$80e4b313e5e6b30d);
$parcel$export($d8604e77328e28ad$exports, "noscript", () => $d8604e77328e28ad$export$528ba0e6da49e146);
$parcel$export($d8604e77328e28ad$exports, "object", () => $d8604e77328e28ad$export$be5493f9613cbbe);
$parcel$export($d8604e77328e28ad$exports, "ol", () => $d8604e77328e28ad$export$b2235297ee22a6fe);
$parcel$export($d8604e77328e28ad$exports, "optgroup", () => $d8604e77328e28ad$export$b9d336f245a516e8);
$parcel$export($d8604e77328e28ad$exports, "option", () => $d8604e77328e28ad$export$a75d1723e6bda2ec);
$parcel$export($d8604e77328e28ad$exports, "output", () => $d8604e77328e28ad$export$c789db2c85949867);
$parcel$export($d8604e77328e28ad$exports, "p", () => $d8604e77328e28ad$export$ffb5f4729a158638);
$parcel$export($d8604e77328e28ad$exports, "picture", () => $d8604e77328e28ad$export$1188214e9d38144e);
$parcel$export($d8604e77328e28ad$exports, "pre", () => $d8604e77328e28ad$export$2af2ac64526e2aa9);
$parcel$export($d8604e77328e28ad$exports, "progress", () => $d8604e77328e28ad$export$504d7abb21fa8c9);
$parcel$export($d8604e77328e28ad$exports, "q", () => $d8604e77328e28ad$export$9e5f44173e64f162);
$parcel$export($d8604e77328e28ad$exports, "rp", () => $d8604e77328e28ad$export$6d4c73e3ddf8818b);
$parcel$export($d8604e77328e28ad$exports, "rt", () => $d8604e77328e28ad$export$f08282231bb71285);
$parcel$export($d8604e77328e28ad$exports, "ruby", () => $d8604e77328e28ad$export$f2b283820b448b35);
$parcel$export($d8604e77328e28ad$exports, "s", () => $d8604e77328e28ad$export$2408f22a0fab9ae5);
$parcel$export($d8604e77328e28ad$exports, "samp", () => $d8604e77328e28ad$export$8c1cb8fb6818c292);
$parcel$export($d8604e77328e28ad$exports, "search", () => $d8604e77328e28ad$export$d76128d007d19019);
$parcel$export($d8604e77328e28ad$exports, "section", () => $d8604e77328e28ad$export$fe2e36411d703b3d);
$parcel$export($d8604e77328e28ad$exports, "select", () => $d8604e77328e28ad$export$2e6c959c16ff56b8);
$parcel$export($d8604e77328e28ad$exports, "slot", () => $d8604e77328e28ad$export$103b78750979eead);
$parcel$export($d8604e77328e28ad$exports, "small", () => $d8604e77328e28ad$export$3c17b0e969a90510);
$parcel$export($d8604e77328e28ad$exports, "source", () => $d8604e77328e28ad$export$b4d5da5f34fb77ad);
$parcel$export($d8604e77328e28ad$exports, "span", () => $d8604e77328e28ad$export$afc1bfabebaf28a2);
$parcel$export($d8604e77328e28ad$exports, "strong", () => $d8604e77328e28ad$export$59ae2c325a998f89);
$parcel$export($d8604e77328e28ad$exports, "sub", () => $d8604e77328e28ad$export$f93b5905241a7cca);
$parcel$export($d8604e77328e28ad$exports, "summary", () => $d8604e77328e28ad$export$9a2dbef7a17e2e58);
$parcel$export($d8604e77328e28ad$exports, "sup", () => $d8604e77328e28ad$export$abe1cd54efe9b9cd);
$parcel$export($d8604e77328e28ad$exports, "table", () => $d8604e77328e28ad$export$9852986a3ec5f6a0);
$parcel$export($d8604e77328e28ad$exports, "tbody", () => $d8604e77328e28ad$export$7cdd536eaa8f163c);
$parcel$export($d8604e77328e28ad$exports, "td", () => $d8604e77328e28ad$export$2beef8af2014e5c6);
$parcel$export($d8604e77328e28ad$exports, "template", () => $d8604e77328e28ad$export$ce69bd05624d0c48);
$parcel$export($d8604e77328e28ad$exports, "textarea", () => $d8604e77328e28ad$export$a3574df893ffa88d);
$parcel$export($d8604e77328e28ad$exports, "tfoot", () => $d8604e77328e28ad$export$9396b2f97a03ad14);
$parcel$export($d8604e77328e28ad$exports, "th", () => $d8604e77328e28ad$export$d657bc098992a431);
$parcel$export($d8604e77328e28ad$exports, "thead", () => $d8604e77328e28ad$export$e3f32a5920890b82);
$parcel$export($d8604e77328e28ad$exports, "time", () => $d8604e77328e28ad$export$2da9be4cfdb689b1);
$parcel$export($d8604e77328e28ad$exports, "title", () => $d8604e77328e28ad$export$fb184b623420d9be);
$parcel$export($d8604e77328e28ad$exports, "tr", () => $d8604e77328e28ad$export$72451b88a72ad9c2);
$parcel$export($d8604e77328e28ad$exports, "track", () => $d8604e77328e28ad$export$6b2a7d5132615086);
$parcel$export($d8604e77328e28ad$exports, "u", () => $d8604e77328e28ad$export$3b14a55fb2447963);
$parcel$export($d8604e77328e28ad$exports, "ul", () => $d8604e77328e28ad$export$b5023c870cb34848);
$parcel$export($d8604e77328e28ad$exports, "_var", () => $d8604e77328e28ad$export$65574c28afdf980a);
$parcel$export($d8604e77328e28ad$exports, "video", () => $d8604e77328e28ad$export$5f8d3589eb8441ca);
$parcel$export($d8604e77328e28ad$exports, "wbr", () => $d8604e77328e28ad$export$ee8f8f9447a35bdc);

const $d8604e77328e28ad$export$407448d2b89b1813 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("a", children);
    return element;
};
const $d8604e77328e28ad$export$2bcb785951133fe5 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("abbr", children);
    return element;
};
const $d8604e77328e28ad$export$f7d3c097ceca6c15 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("address", children);
    return element;
};
const $d8604e77328e28ad$export$bb3edc44842b5f2e = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("area", children);
    return element;
};
const $d8604e77328e28ad$export$bba2aacf8566461b = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("article", children);
    return element;
};
const $d8604e77328e28ad$export$64a02cd6422b91be = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("aside", children);
    return element;
};
const $d8604e77328e28ad$export$592b77e6034db746 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("audio", children);
    return element;
};
const $d8604e77328e28ad$export$8b22cf2602fb60ce = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("b", children);
    return element;
};
const $d8604e77328e28ad$export$e2253033e6e1df16 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("base", children);
    return element;
};
const $d8604e77328e28ad$export$2d20a4e9df674436 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("bdi", children);
    return element;
};
const $d8604e77328e28ad$export$fae0db89ef70aab2 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("bdo", children);
    return element;
};
const $d8604e77328e28ad$export$67dc04e652a298ca = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("blockquote", children);
    return element;
};
const $d8604e77328e28ad$export$32180ef41b15b513 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("body", children);
    return element;
};
const $d8604e77328e28ad$export$479ac0420f53ed26 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("br", children);
    return element;
};
const $d8604e77328e28ad$export$2ba01fb71ed41cb6 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("button", children);
    return element;
};
const $d8604e77328e28ad$export$67ea982130081db = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("canvas", children);
    return element;
};
const $d8604e77328e28ad$export$8e3c2dfdc4f0453d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("caption", children);
    return element;
};
const $d8604e77328e28ad$export$3035df57df42c31a = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("cite", children);
    return element;
};
const $d8604e77328e28ad$export$6565f9f03506010b = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("code", children);
    return element;
};
const $d8604e77328e28ad$export$aba86695643891f5 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("col", children);
    return element;
};
const $d8604e77328e28ad$export$3db318dd257cd653 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("colgroup", children);
    return element;
};
const $d8604e77328e28ad$export$4051a07651545597 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("data", children);
    return element;
};
const $d8604e77328e28ad$export$d6956b5f6d5ee87d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("datalist", children);
    return element;
};
const $d8604e77328e28ad$export$eaaeafa904fe3ddf = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("dd", children);
    return element;
};
const $d8604e77328e28ad$export$1d2f21e549771e67 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("del", children);
    return element;
};
const $d8604e77328e28ad$export$41ee12f6f6f05843 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("details", children);
    return element;
};
const $d8604e77328e28ad$export$771f54d1a902afc9 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("dfn", children);
    return element;
};
const $d8604e77328e28ad$export$518824cf31321346 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("dialog", children);
    return element;
};
const $d8604e77328e28ad$export$159d9494db57879b = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("div", children);
    return element;
};
const $d8604e77328e28ad$export$53d26b7a9a23d594 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("dl", children);
    return element;
};
const $d8604e77328e28ad$export$9198f9466fc833e = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("dt", children);
    return element;
};
const $d8604e77328e28ad$export$c63c6f932822f543 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("em", children);
    return element;
};
const $d8604e77328e28ad$export$2be46bb7e96db87f = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("embed", children);
    return element;
};
const $d8604e77328e28ad$export$a38812d1aa1302d9 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("fieldset", children);
    return element;
};
const $d8604e77328e28ad$export$b75acb72a9c69c26 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("figcaption", children);
    return element;
};
const $d8604e77328e28ad$export$991dc94f816a1d48 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("figure", children);
    return element;
};
const $d8604e77328e28ad$export$adb608be33961c98 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("footer", children);
    return element;
};
const $d8604e77328e28ad$export$6210fa4921d2a466 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("form", children);
    return element;
};
const $d8604e77328e28ad$export$448e4850cad7c7b0 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("h1", children);
    return element;
};
const $d8604e77328e28ad$export$a943aa9a0fca3f0b = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("h2", children);
    return element;
};
const $d8604e77328e28ad$export$7edd4a21fac8ce55 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("h3", children);
    return element;
};
const $d8604e77328e28ad$export$51a85cc1b68f452c = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("h4", children);
    return element;
};
const $d8604e77328e28ad$export$f44841a11990acb2 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("h5", children);
    return element;
};
const $d8604e77328e28ad$export$c9ccd321d64f47e3 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("h6", children);
    return element;
};
const $d8604e77328e28ad$export$5fd5031fecdacec3 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("head", children);
    return element;
};
const $d8604e77328e28ad$export$38e42c68cf43b5d4 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("header", children);
    return element;
};
const $d8604e77328e28ad$export$e7c17d6cef8bd1c = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("hgroup", children);
    return element;
};
const $d8604e77328e28ad$export$b4adb3f464574dcf = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("hr", children);
    return element;
};
const $d8604e77328e28ad$export$c0bb0b647f701bb5 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("html", children);
    return element;
};
const $d8604e77328e28ad$export$23f2a1d2818174ef = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("i", children);
    return element;
};
const $d8604e77328e28ad$export$8cde213409fd6377 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("iframe", children);
    return element;
};
const $d8604e77328e28ad$export$463b44d9bf3628be = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("img", children);
    return element;
};
const $d8604e77328e28ad$export$b7e3ae3d7c15e42e = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("input", children);
    return element;
};
const $d8604e77328e28ad$export$27a48efc044c200a = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("ins", children);
    return element;
};
const $d8604e77328e28ad$export$1ed45b69d23c052b = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("kbd", children);
    return element;
};
const $d8604e77328e28ad$export$1237798dc640739a = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("label", children);
    return element;
};
const $d8604e77328e28ad$export$9a9b59e08de24cef = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("legend", children);
    return element;
};
const $d8604e77328e28ad$export$19caeaf7d9d84644 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("li", children);
    return element;
};
const $d8604e77328e28ad$export$9c30223ca0a664fb = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("link", children);
    return element;
};
const $d8604e77328e28ad$export$f22da7240b7add18 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("main", children);
    return element;
};
const $d8604e77328e28ad$export$871de8747c9eaa88 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("map", children);
    return element;
};
const $d8604e77328e28ad$export$bf7f2fce5c1cf636 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("mark", children);
    return element;
};
const $d8604e77328e28ad$export$b1e5508a851be14d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("menu", children);
    return element;
};
const $d8604e77328e28ad$export$6990040ee07315 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("meta", children);
    return element;
};
const $d8604e77328e28ad$export$82334bbdfcebb57 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("meter", children);
    return element;
};
const $d8604e77328e28ad$export$80e4b313e5e6b30d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("nav", children);
    return element;
};
const $d8604e77328e28ad$export$528ba0e6da49e146 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("noscript", children);
    return element;
};
const $d8604e77328e28ad$export$be5493f9613cbbe = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("object", children);
    return element;
};
const $d8604e77328e28ad$export$b2235297ee22a6fe = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("ol", children);
    return element;
};
const $d8604e77328e28ad$export$b9d336f245a516e8 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("optgroup", children);
    return element;
};
const $d8604e77328e28ad$export$a75d1723e6bda2ec = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("option", children);
    return element;
};
const $d8604e77328e28ad$export$c789db2c85949867 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("output", children);
    return element;
};
const $d8604e77328e28ad$export$ffb5f4729a158638 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("p", children);
    return element;
};
const $d8604e77328e28ad$export$1188214e9d38144e = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("picture", children);
    return element;
};
const $d8604e77328e28ad$export$2af2ac64526e2aa9 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("pre", children);
    return element;
};
const $d8604e77328e28ad$export$504d7abb21fa8c9 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("progress", children);
    return element;
};
const $d8604e77328e28ad$export$9e5f44173e64f162 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("q", children);
    return element;
};
const $d8604e77328e28ad$export$6d4c73e3ddf8818b = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("rp", children);
    return element;
};
const $d8604e77328e28ad$export$f08282231bb71285 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("rt", children);
    return element;
};
const $d8604e77328e28ad$export$f2b283820b448b35 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("ruby", children);
    return element;
};
const $d8604e77328e28ad$export$2408f22a0fab9ae5 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("s", children);
    return element;
};
const $d8604e77328e28ad$export$8c1cb8fb6818c292 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("samp", children);
    return element;
};
const $d8604e77328e28ad$export$d76128d007d19019 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("search", children);
    return element;
};
const $d8604e77328e28ad$export$fe2e36411d703b3d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("section", children);
    return element;
};
const $d8604e77328e28ad$export$2e6c959c16ff56b8 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("select", children);
    return element;
};
const $d8604e77328e28ad$export$103b78750979eead = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("slot", children);
    return element;
};
const $d8604e77328e28ad$export$3c17b0e969a90510 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("small", children);
    return element;
};
const $d8604e77328e28ad$export$b4d5da5f34fb77ad = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("source", children);
    return element;
};
const $d8604e77328e28ad$export$afc1bfabebaf28a2 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("span", children);
    return element;
};
const $d8604e77328e28ad$export$59ae2c325a998f89 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("strong", children);
    return element;
};
const $d8604e77328e28ad$export$f93b5905241a7cca = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("sub", children);
    return element;
};
const $d8604e77328e28ad$export$9a2dbef7a17e2e58 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("summary", children);
    return element;
};
const $d8604e77328e28ad$export$abe1cd54efe9b9cd = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("sup", children);
    return element;
};
const $d8604e77328e28ad$export$9852986a3ec5f6a0 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("table", children);
    return element;
};
const $d8604e77328e28ad$export$7cdd536eaa8f163c = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("tbody", children);
    return element;
};
const $d8604e77328e28ad$export$2beef8af2014e5c6 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("td", children);
    return element;
};
const $d8604e77328e28ad$export$ce69bd05624d0c48 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("template", children);
    return element;
};
const $d8604e77328e28ad$export$a3574df893ffa88d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("textarea", children);
    return element;
};
const $d8604e77328e28ad$export$9396b2f97a03ad14 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("tfoot", children);
    return element;
};
const $d8604e77328e28ad$export$d657bc098992a431 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("th", children);
    return element;
};
const $d8604e77328e28ad$export$e3f32a5920890b82 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("thead", children);
    return element;
};
const $d8604e77328e28ad$export$2da9be4cfdb689b1 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("time", children);
    return element;
};
const $d8604e77328e28ad$export$fb184b623420d9be = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("title", children);
    return element;
};
const $d8604e77328e28ad$export$72451b88a72ad9c2 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("tr", children);
    return element;
};
const $d8604e77328e28ad$export$6b2a7d5132615086 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("track", children);
    return element;
};
const $d8604e77328e28ad$export$3b14a55fb2447963 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("u", children);
    return element;
};
const $d8604e77328e28ad$export$b5023c870cb34848 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("ul", children);
    return element;
};
const $d8604e77328e28ad$export$65574c28afdf980a = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("var", children);
    return element;
};
const $d8604e77328e28ad$export$5f8d3589eb8441ca = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("video", children);
    return element;
};
const $d8604e77328e28ad$export$ee8f8f9447a35bdc = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("wbr", children);
    return element;
};


var $984b9bf1478e5592$exports = {};

$parcel$export($984b9bf1478e5592$exports, "_a", () => $984b9bf1478e5592$export$5a462553037f0c2b);
$parcel$export($984b9bf1478e5592$exports, "animate", () => $984b9bf1478e5592$export$e3607ec2d7a891c4);
$parcel$export($984b9bf1478e5592$exports, "animateMotion", () => $984b9bf1478e5592$export$5e588c605a4a78b2);
$parcel$export($984b9bf1478e5592$exports, "animateTransform", () => $984b9bf1478e5592$export$729fc4eb9847864b);
$parcel$export($984b9bf1478e5592$exports, "circle", () => $984b9bf1478e5592$export$e1d786d2f707b414);
$parcel$export($984b9bf1478e5592$exports, "clipPath", () => $984b9bf1478e5592$export$a93a2fac2519a03d);
$parcel$export($984b9bf1478e5592$exports, "defs", () => $984b9bf1478e5592$export$868461b1c6870d10);
$parcel$export($984b9bf1478e5592$exports, "desc", () => $984b9bf1478e5592$export$51987bb50e1f6752);
$parcel$export($984b9bf1478e5592$exports, "ellipse", () => $984b9bf1478e5592$export$35eec893e28a8a34);
$parcel$export($984b9bf1478e5592$exports, "feBlend", () => $984b9bf1478e5592$export$ba172c53ad3949dd);
$parcel$export($984b9bf1478e5592$exports, "feColorMatrix", () => $984b9bf1478e5592$export$5eb95cb0e6566912);
$parcel$export($984b9bf1478e5592$exports, "feComponentTransfer", () => $984b9bf1478e5592$export$32d87166552d46e4);
$parcel$export($984b9bf1478e5592$exports, "feComposite", () => $984b9bf1478e5592$export$a9c456e7f59a922e);
$parcel$export($984b9bf1478e5592$exports, "feConvolveMatrix", () => $984b9bf1478e5592$export$80857957c253f74c);
$parcel$export($984b9bf1478e5592$exports, "feDiffuseLighting", () => $984b9bf1478e5592$export$15897bb48f363dc5);
$parcel$export($984b9bf1478e5592$exports, "feDisplacementMap", () => $984b9bf1478e5592$export$29d24d9a033d4415);
$parcel$export($984b9bf1478e5592$exports, "feDistantLight", () => $984b9bf1478e5592$export$189ae3b23835546d);
$parcel$export($984b9bf1478e5592$exports, "feDropShadow", () => $984b9bf1478e5592$export$a2a7ecf3147a8160);
$parcel$export($984b9bf1478e5592$exports, "feFlood", () => $984b9bf1478e5592$export$d4a3c574e219ec41);
$parcel$export($984b9bf1478e5592$exports, "feFuncA", () => $984b9bf1478e5592$export$ff335e1896a0d6ac);
$parcel$export($984b9bf1478e5592$exports, "feFuncB", () => $984b9bf1478e5592$export$b413ed7ce780ab62);
$parcel$export($984b9bf1478e5592$exports, "feFuncG", () => $984b9bf1478e5592$export$acd966dff92826df);
$parcel$export($984b9bf1478e5592$exports, "feFuncR", () => $984b9bf1478e5592$export$1c8b9a56b85655d7);
$parcel$export($984b9bf1478e5592$exports, "feGaussianBlur", () => $984b9bf1478e5592$export$fab9ed97c28f4d5);
$parcel$export($984b9bf1478e5592$exports, "feImage", () => $984b9bf1478e5592$export$5c615a36cad27f2a);
$parcel$export($984b9bf1478e5592$exports, "feMerge", () => $984b9bf1478e5592$export$f72866be216dad64);
$parcel$export($984b9bf1478e5592$exports, "feMergeNode", () => $984b9bf1478e5592$export$80304804ee4b74ee);
$parcel$export($984b9bf1478e5592$exports, "feMorphology", () => $984b9bf1478e5592$export$97b2331bbf087a92);
$parcel$export($984b9bf1478e5592$exports, "feOffset", () => $984b9bf1478e5592$export$c5df7b6020d120a4);
$parcel$export($984b9bf1478e5592$exports, "fePointLight", () => $984b9bf1478e5592$export$d886bd6a8560a99b);
$parcel$export($984b9bf1478e5592$exports, "feSpecularLighting", () => $984b9bf1478e5592$export$99967a5441a64397);
$parcel$export($984b9bf1478e5592$exports, "feSpotLight", () => $984b9bf1478e5592$export$40aa73cef2a57617);
$parcel$export($984b9bf1478e5592$exports, "feTile", () => $984b9bf1478e5592$export$ec9928c0fd729eba);
$parcel$export($984b9bf1478e5592$exports, "feTurbulence", () => $984b9bf1478e5592$export$ac27df26d1bb1c75);
$parcel$export($984b9bf1478e5592$exports, "filter", () => $984b9bf1478e5592$export$3dea766d36a8935f);
$parcel$export($984b9bf1478e5592$exports, "foreignObject", () => $984b9bf1478e5592$export$25ef286fa535664a);
$parcel$export($984b9bf1478e5592$exports, "g", () => $984b9bf1478e5592$export$39b482c5e57630a8);
$parcel$export($984b9bf1478e5592$exports, "image", () => $984b9bf1478e5592$export$5c452ff88e35e47d);
$parcel$export($984b9bf1478e5592$exports, "line", () => $984b9bf1478e5592$export$53f1d5ea8de3d7c);
$parcel$export($984b9bf1478e5592$exports, "linearGradient", () => $984b9bf1478e5592$export$46def8197cf4dd4c);
$parcel$export($984b9bf1478e5592$exports, "marker", () => $984b9bf1478e5592$export$ffc4d0086f1a4c9);
$parcel$export($984b9bf1478e5592$exports, "mask", () => $984b9bf1478e5592$export$d99f0801a68bbcf1);
$parcel$export($984b9bf1478e5592$exports, "metadata", () => $984b9bf1478e5592$export$dbb5e893e736e4ee);
$parcel$export($984b9bf1478e5592$exports, "mpath", () => $984b9bf1478e5592$export$d455c2d7dc3122e5);
$parcel$export($984b9bf1478e5592$exports, "path", () => $984b9bf1478e5592$export$bb654e07daaf8c3a);
$parcel$export($984b9bf1478e5592$exports, "pattern", () => $984b9bf1478e5592$export$24f82734ea047e6f);
$parcel$export($984b9bf1478e5592$exports, "polygon", () => $984b9bf1478e5592$export$b7b19aa0ee06c73);
$parcel$export($984b9bf1478e5592$exports, "polyline", () => $984b9bf1478e5592$export$8d69707c7074d5c0);
$parcel$export($984b9bf1478e5592$exports, "radialGradient", () => $984b9bf1478e5592$export$3922d1ccb8631cd8);
$parcel$export($984b9bf1478e5592$exports, "rect", () => $984b9bf1478e5592$export$4b409e53cf4df6e6);
$parcel$export($984b9bf1478e5592$exports, "set", () => $984b9bf1478e5592$export$adaa4cf7ef1b65be);
$parcel$export($984b9bf1478e5592$exports, "stop", () => $984b9bf1478e5592$export$fa6813432f753b0d);
$parcel$export($984b9bf1478e5592$exports, "svg", () => $984b9bf1478e5592$export$7ed1367e7fa1ad68);
$parcel$export($984b9bf1478e5592$exports, "_switch", () => $984b9bf1478e5592$export$424b8b2ab9af2944);
$parcel$export($984b9bf1478e5592$exports, "symbol", () => $984b9bf1478e5592$export$8f701197936bc2a6);
$parcel$export($984b9bf1478e5592$exports, "_text", () => $984b9bf1478e5592$export$a3ca1e9bc4bd5d82);
$parcel$export($984b9bf1478e5592$exports, "textPath", () => $984b9bf1478e5592$export$5fc665c586745ec9);
$parcel$export($984b9bf1478e5592$exports, "_title", () => $984b9bf1478e5592$export$a80dcad378414f77);
$parcel$export($984b9bf1478e5592$exports, "tspan", () => $984b9bf1478e5592$export$79063f2f83f17896);
$parcel$export($984b9bf1478e5592$exports, "use", () => $984b9bf1478e5592$export$1f96ae73734a86cc);
$parcel$export($984b9bf1478e5592$exports, "view", () => $984b9bf1478e5592$export$c4ddc81c7b2c8d7a);

const $984b9bf1478e5592$export$5a462553037f0c2b = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("a", children);
    return element;
};
const $984b9bf1478e5592$export$e3607ec2d7a891c4 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("animate", children);
    return element;
};
const $984b9bf1478e5592$export$5e588c605a4a78b2 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("animateMotion", children);
    return element;
};
const $984b9bf1478e5592$export$729fc4eb9847864b = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("animateTransform", children);
    return element;
};
const $984b9bf1478e5592$export$e1d786d2f707b414 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("circle", children);
    return element;
};
const $984b9bf1478e5592$export$a93a2fac2519a03d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("clipPath", children);
    return element;
};
const $984b9bf1478e5592$export$868461b1c6870d10 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("defs", children);
    return element;
};
const $984b9bf1478e5592$export$51987bb50e1f6752 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("desc", children);
    return element;
};
const $984b9bf1478e5592$export$35eec893e28a8a34 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("ellipse", children);
    return element;
};
const $984b9bf1478e5592$export$ba172c53ad3949dd = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feBlend", children);
    return element;
};
const $984b9bf1478e5592$export$5eb95cb0e6566912 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feColorMatrix", children);
    return element;
};
const $984b9bf1478e5592$export$32d87166552d46e4 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feComponentTransfer", children);
    return element;
};
const $984b9bf1478e5592$export$a9c456e7f59a922e = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feComposite", children);
    return element;
};
const $984b9bf1478e5592$export$80857957c253f74c = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feConvolveMatrix", children);
    return element;
};
const $984b9bf1478e5592$export$15897bb48f363dc5 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feDiffuseLighting", children);
    return element;
};
const $984b9bf1478e5592$export$29d24d9a033d4415 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feDisplacementMap", children);
    return element;
};
const $984b9bf1478e5592$export$189ae3b23835546d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feDistantLight", children);
    return element;
};
const $984b9bf1478e5592$export$a2a7ecf3147a8160 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feDropShadow", children);
    return element;
};
const $984b9bf1478e5592$export$d4a3c574e219ec41 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feFlood", children);
    return element;
};
const $984b9bf1478e5592$export$ff335e1896a0d6ac = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feFuncA", children);
    return element;
};
const $984b9bf1478e5592$export$b413ed7ce780ab62 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feFuncB", children);
    return element;
};
const $984b9bf1478e5592$export$acd966dff92826df = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feFuncG", children);
    return element;
};
const $984b9bf1478e5592$export$1c8b9a56b85655d7 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feFuncR", children);
    return element;
};
const $984b9bf1478e5592$export$fab9ed97c28f4d5 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feGaussianBlur", children);
    return element;
};
const $984b9bf1478e5592$export$5c615a36cad27f2a = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feImage", children);
    return element;
};
const $984b9bf1478e5592$export$f72866be216dad64 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feMerge", children);
    return element;
};
const $984b9bf1478e5592$export$80304804ee4b74ee = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feMergeNode", children);
    return element;
};
const $984b9bf1478e5592$export$97b2331bbf087a92 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feMorphology", children);
    return element;
};
const $984b9bf1478e5592$export$c5df7b6020d120a4 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feOffset", children);
    return element;
};
const $984b9bf1478e5592$export$d886bd6a8560a99b = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("fePointLight", children);
    return element;
};
const $984b9bf1478e5592$export$99967a5441a64397 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feSpecularLighting", children);
    return element;
};
const $984b9bf1478e5592$export$40aa73cef2a57617 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feSpotLight", children);
    return element;
};
const $984b9bf1478e5592$export$ec9928c0fd729eba = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feTile", children);
    return element;
};
const $984b9bf1478e5592$export$ac27df26d1bb1c75 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("feTurbulence", children);
    return element;
};
const $984b9bf1478e5592$export$3dea766d36a8935f = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("filter", children);
    return element;
};
const $984b9bf1478e5592$export$25ef286fa535664a = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("foreignObject", children);
    return element;
};
const $984b9bf1478e5592$export$39b482c5e57630a8 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("g", children);
    return element;
};
const $984b9bf1478e5592$export$5c452ff88e35e47d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("image", children);
    return element;
};
const $984b9bf1478e5592$export$53f1d5ea8de3d7c = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("line", children);
    return element;
};
const $984b9bf1478e5592$export$46def8197cf4dd4c = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("linearGradient", children);
    return element;
};
const $984b9bf1478e5592$export$ffc4d0086f1a4c9 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("marker", children);
    return element;
};
const $984b9bf1478e5592$export$d99f0801a68bbcf1 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("mask", children);
    return element;
};
const $984b9bf1478e5592$export$dbb5e893e736e4ee = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("metadata", children);
    return element;
};
const $984b9bf1478e5592$export$d455c2d7dc3122e5 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("mpath", children);
    return element;
};
const $984b9bf1478e5592$export$bb654e07daaf8c3a = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("path", children);
    return element;
};
const $984b9bf1478e5592$export$24f82734ea047e6f = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("pattern", children);
    return element;
};
const $984b9bf1478e5592$export$b7b19aa0ee06c73 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("polygon", children);
    return element;
};
const $984b9bf1478e5592$export$8d69707c7074d5c0 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("polyline", children);
    return element;
};
const $984b9bf1478e5592$export$3922d1ccb8631cd8 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("radialGradient", children);
    return element;
};
const $984b9bf1478e5592$export$4b409e53cf4df6e6 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("rect", children);
    return element;
};
const $984b9bf1478e5592$export$adaa4cf7ef1b65be = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("set", children);
    return element;
};
const $984b9bf1478e5592$export$fa6813432f753b0d = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("stop", children);
    return element;
};
const $984b9bf1478e5592$export$7ed1367e7fa1ad68 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("svg", children);
    return element;
};
const $984b9bf1478e5592$export$424b8b2ab9af2944 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("switch", children);
    return element;
};
const $984b9bf1478e5592$export$8f701197936bc2a6 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("symbol", children);
    return element;
};
const $984b9bf1478e5592$export$a3ca1e9bc4bd5d82 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("text", children);
    return element;
};
const $984b9bf1478e5592$export$5fc665c586745ec9 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("textPath", children);
    return element;
};
const $984b9bf1478e5592$export$a80dcad378414f77 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("title", children);
    return element;
};
const $984b9bf1478e5592$export$79063f2f83f17896 = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("tspan", children);
    return element;
};
const $984b9bf1478e5592$export$1f96ae73734a86cc = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("use", children);
    return element;
};
const $984b9bf1478e5592$export$c4ddc81c7b2c8d7a = (...children)=>{
    let element = new (0, $07accdd0f6e0276a$export$5290f40031d29a0b)("view", children);
    return element;
};


$parcel$exportWildcard($8e8dbc49627405cc$exports, $5828278ff3f63a5f$exports);
$parcel$exportWildcard($8e8dbc49627405cc$exports, $07accdd0f6e0276a$exports);
$parcel$exportWildcard($8e8dbc49627405cc$exports, $d8604e77328e28ad$exports);
$parcel$exportWildcard($8e8dbc49627405cc$exports, $984b9bf1478e5592$exports);


var $b303505768f2368e$exports = {};
var $1eb28a2bf32712d8$exports = {};

$parcel$export($1eb28a2bf32712d8$exports, "FDocument", () => $1eb28a2bf32712d8$export$e95eef2b09e4b8c0);


class $1eb28a2bf32712d8$export$e95eef2b09e4b8c0 {
    constructor(){
        if (window) {
            this.window = window;
            this.document = document;
        }
    }
    render(selector, element) {
        if (this.document instanceof Document) {
            let target = this.document.querySelector(selector);
            this.rootSelector = selector;
            this.rootElement = element;
            if (target instanceof HTMLElement || element instanceof Node) {
                let router = this.hasRouter(element);
                let domElementRoot = element.element();
                let states = this.getStates(element);
                target.appendChild(domElementRoot);
                Felin.registerFlDocumentRoot(selector, this);
                Felin.registerStates(selector, states);
                if (router) {
                    router.buildRouterTree();
                    Felin.registerActiveRouter(this.rootSelector, router);
                }
                Felin.run();
            } else throw Error("FelinError: no element found with selector " + selector);
        }
    }
    selector(element) {
        let elementPath = [];
        let currentElement = element;
        let selector = `${this.rootSelector}>${this.rootElement.name}`;
        while(currentElement._id != this.rootElement._id){
            if (currentElement instanceof (0, $07accdd0f6e0276a$export$5aca75b6aace7423) || currentElement instanceof (0, $07accdd0f6e0276a$export$5290f40031d29a0b)) elementPath.push(currentElement);
            currentElement = currentElement.parent;
        }
        for (let pathElement of elementPath)selector += `>${pathElement.name}`;
        return selector;
    }
    rerenderElement(element) {
        let selector = this.selector(element);
        let targetNode = this.document.querySelector(selector);
        targetNode.replaceWith(element.element());
    }
    hasRouter(element) {
        let router = null;
        let elementTreeList = (0, $fab42eb3dee39b5b$export$8c9c8540fba163fe)(element);
        elementTreeList.forEach((el)=>{
            if (el instanceof (0, $07accdd0f6e0276a$export$5aca75b6aace7423)) {
                if (el.register.router) router = el.register.router;
            }
        });
        return router;
    }
    getStates(element) {
        let states = [];
        let elementTreeList = (0, $fab42eb3dee39b5b$export$8c9c8540fba163fe)(element);
        for (let el of elementTreeList)states = [
            ...states,
            ...el.register.states
        ];
        let uniqueStates = [
            ...new Set(states.map((e)=>e._id))
        ];
        states = uniqueStates.map((id)=>states.find((s)=>s._id == id));
        return states;
    }
}





$parcel$exportWildcard($b303505768f2368e$exports, $1eb28a2bf32712d8$exports);
$parcel$exportWildcard($b303505768f2368e$exports, $b9742d79d7b0a03e$exports);
$parcel$exportWildcard($b303505768f2368e$exports, $0b8665cef9b4a99e$exports);
$parcel$exportWildcard($b303505768f2368e$exports, $2bb0b494aaead7bf$exports);


var $e2e1ea6dd3b7d2e1$exports = {};

$parcel$export($e2e1ea6dd3b7d2e1$exports, "$text", () => $e2e1ea6dd3b7d2e1$export$68028ad1cb93a754);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$state", () => $e2e1ea6dd3b7d2e1$export$98a37c23c8479e79);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$effect", () => $e2e1ea6dd3b7d2e1$export$8500887edacda160);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$computed", () => $e2e1ea6dd3b7d2e1$export$5c8bbe4eacac8365);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$router", () => $e2e1ea6dd3b7d2e1$export$b01d3b47943cf0fd);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$route", () => $e2e1ea6dd3b7d2e1$export$64da394a6c00ab6);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$params", () => $e2e1ea6dd3b7d2e1$export$1804ef204fd3bee1);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$document", () => $e2e1ea6dd3b7d2e1$export$81dbbbf987bfbc02);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$link", () => $e2e1ea6dd3b7d2e1$export$c453910a0b76012e);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$if", () => $e2e1ea6dd3b7d2e1$export$24842cd1e1f3d46f);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$for", () => $e2e1ea6dd3b7d2e1$export$3364fcc330baceba);
$parcel$export($e2e1ea6dd3b7d2e1$exports, "$length", () => $e2e1ea6dd3b7d2e1$export$418b8c9bcbfeed78);







function $e2e1ea6dd3b7d2e1$export$68028ad1cb93a754(text, ...args) {
    return new (0, $07accdd0f6e0276a$export$44155b4e60576956)(text, ...args);
}
function $e2e1ea6dd3b7d2e1$export$98a37c23c8479e79(value) {
    return new (0, $ac765eb06d4b9acd$export$7254cc27399e90bd)(value);
}
function $e2e1ea6dd3b7d2e1$export$8500887edacda160(fn, ...states) {
    new (0, $e02ab9edca31aa60$export$a32b0b1c1ac59d04)(fn, ...states);
}
function $e2e1ea6dd3b7d2e1$export$5c8bbe4eacac8365(fn, ...states) {
    return new (0, $af4ecce1f27713e1$export$836eee5a40e84ba8)(fn, ...states);
}
function $e2e1ea6dd3b7d2e1$export$b01d3b47943cf0fd(...routes) {
    return new (0, $6dd8eba6afe36dea$export$55185c17a0fcbe46)(...routes);
}
function $e2e1ea6dd3b7d2e1$export$64da394a6c00ab6(path, element) {
    return new (0, $6dd8eba6afe36dea$export$e7b0ac011bb776c6)(path, element);
}
function $e2e1ea6dd3b7d2e1$export$1804ef204fd3bee1() {
    return Felin.getRouterParams();
}
function $e2e1ea6dd3b7d2e1$export$81dbbbf987bfbc02() {
    return new (0, $1eb28a2bf32712d8$export$e95eef2b09e4b8c0)();
}
function $e2e1ea6dd3b7d2e1$export$c453910a0b76012e(path, element) {
    let linkElement = new (0, $07accdd0f6e0276a$export$5aca75b6aace7423)("a", [
        element
    ]);
    return linkElement.listener("click", (e)=>{
        e.preventDefault();
        let rootSelector = Felin.getElementRootSelector(linkElement);
        if (typeof rootSelector == "string") Felin.registerRouteChange(path, rootSelector);
    }).style({
        textDecoration: "underline",
        color: "blue",
        cursor: "pointer"
    });
}
function $e2e1ea6dd3b7d2e1$export$24842cd1e1f3d46f(condition, trueBranch, falseBranch) {
    return new (0, $d5b2a6f33979457b$export$2073789870570c87)(condition, trueBranch, falseBranch);
}
function $e2e1ea6dd3b7d2e1$export$3364fcc330baceba(state, iteration) {
    return new (0, $d5b2a6f33979457b$export$550acbd06a1f5a6a)(state, iteration);
}
function $e2e1ea6dd3b7d2e1$export$418b8c9bcbfeed78(state) {
    return new (0, $ac765eb06d4b9acd$export$7254cc27399e90bd)(state.length);
}




window.Felin = (0, $b9742d79d7b0a03e$export$76fb3b11e24d7138);
var $4ea4497816ff7e86$export$2e2bcd8739ae039 = (0, $b9742d79d7b0a03e$export$76fb3b11e24d7138);


export {$4ea4497816ff7e86$export$2e2bcd8739ae039 as default, $ac765eb06d4b9acd$export$7254cc27399e90bd as State, $ac765eb06d4b9acd$export$d5e80676d91e78a1 as FObject, $ac765eb06d4b9acd$export$822d777b86fe0aa4 as FArray, $ac765eb06d4b9acd$export$9dbc5f74ee206e8e as FNumber, $ac765eb06d4b9acd$export$7247fc7dfedd58fa as FString, $ac765eb06d4b9acd$export$636e063718929b4a as FBoolean, $e02ab9edca31aa60$export$a32b0b1c1ac59d04 as Effect, $d5b2a6f33979457b$export$2073789870570c87 as Conditional, $d5b2a6f33979457b$export$550acbd06a1f5a6a as Loop, $af4ecce1f27713e1$export$836eee5a40e84ba8 as Computed, $5828278ff3f63a5f$export$16fa2f45be04daa8 as Component, $07accdd0f6e0276a$export$44155b4e60576956 as FText, $07accdd0f6e0276a$export$5aca75b6aace7423 as FHTMLElement, $07accdd0f6e0276a$export$5290f40031d29a0b as FSVGElement, $d8604e77328e28ad$export$407448d2b89b1813 as a, $d8604e77328e28ad$export$2bcb785951133fe5 as abbr, $d8604e77328e28ad$export$f7d3c097ceca6c15 as address, $d8604e77328e28ad$export$bb3edc44842b5f2e as area, $d8604e77328e28ad$export$bba2aacf8566461b as article, $d8604e77328e28ad$export$64a02cd6422b91be as aside, $d8604e77328e28ad$export$592b77e6034db746 as audio, $d8604e77328e28ad$export$8b22cf2602fb60ce as b, $d8604e77328e28ad$export$e2253033e6e1df16 as base, $d8604e77328e28ad$export$2d20a4e9df674436 as bdi, $d8604e77328e28ad$export$fae0db89ef70aab2 as bdo, $d8604e77328e28ad$export$67dc04e652a298ca as blockquote, $d8604e77328e28ad$export$32180ef41b15b513 as body, $d8604e77328e28ad$export$479ac0420f53ed26 as br, $d8604e77328e28ad$export$2ba01fb71ed41cb6 as button, $d8604e77328e28ad$export$67ea982130081db as canvas, $d8604e77328e28ad$export$8e3c2dfdc4f0453d as caption, $d8604e77328e28ad$export$3035df57df42c31a as cite, $d8604e77328e28ad$export$6565f9f03506010b as code, $d8604e77328e28ad$export$aba86695643891f5 as col, $d8604e77328e28ad$export$3db318dd257cd653 as colgroup, $d8604e77328e28ad$export$4051a07651545597 as data, $d8604e77328e28ad$export$d6956b5f6d5ee87d as datalist, $d8604e77328e28ad$export$eaaeafa904fe3ddf as dd, $d8604e77328e28ad$export$1d2f21e549771e67 as del, $d8604e77328e28ad$export$41ee12f6f6f05843 as details, $d8604e77328e28ad$export$771f54d1a902afc9 as dfn, $d8604e77328e28ad$export$518824cf31321346 as dialog, $d8604e77328e28ad$export$159d9494db57879b as div, $d8604e77328e28ad$export$53d26b7a9a23d594 as dl, $d8604e77328e28ad$export$9198f9466fc833e as dt, $d8604e77328e28ad$export$c63c6f932822f543 as em, $d8604e77328e28ad$export$2be46bb7e96db87f as embed, $d8604e77328e28ad$export$a38812d1aa1302d9 as fieldset, $d8604e77328e28ad$export$b75acb72a9c69c26 as figcaption, $d8604e77328e28ad$export$991dc94f816a1d48 as figure, $d8604e77328e28ad$export$adb608be33961c98 as footer, $d8604e77328e28ad$export$6210fa4921d2a466 as form, $d8604e77328e28ad$export$448e4850cad7c7b0 as h1, $d8604e77328e28ad$export$a943aa9a0fca3f0b as h2, $d8604e77328e28ad$export$7edd4a21fac8ce55 as h3, $d8604e77328e28ad$export$51a85cc1b68f452c as h4, $d8604e77328e28ad$export$f44841a11990acb2 as h5, $d8604e77328e28ad$export$c9ccd321d64f47e3 as h6, $d8604e77328e28ad$export$5fd5031fecdacec3 as head, $d8604e77328e28ad$export$38e42c68cf43b5d4 as header, $d8604e77328e28ad$export$e7c17d6cef8bd1c as hgroup, $d8604e77328e28ad$export$b4adb3f464574dcf as hr, $d8604e77328e28ad$export$c0bb0b647f701bb5 as html, $d8604e77328e28ad$export$23f2a1d2818174ef as i, $d8604e77328e28ad$export$8cde213409fd6377 as iframe, $d8604e77328e28ad$export$463b44d9bf3628be as img, $d8604e77328e28ad$export$b7e3ae3d7c15e42e as input, $d8604e77328e28ad$export$27a48efc044c200a as ins, $d8604e77328e28ad$export$1ed45b69d23c052b as kbd, $d8604e77328e28ad$export$1237798dc640739a as label, $d8604e77328e28ad$export$9a9b59e08de24cef as legend, $d8604e77328e28ad$export$19caeaf7d9d84644 as li, $d8604e77328e28ad$export$9c30223ca0a664fb as link, $d8604e77328e28ad$export$f22da7240b7add18 as main, $d8604e77328e28ad$export$871de8747c9eaa88 as map, $d8604e77328e28ad$export$bf7f2fce5c1cf636 as mark, $d8604e77328e28ad$export$b1e5508a851be14d as menu, $d8604e77328e28ad$export$6990040ee07315 as meta, $d8604e77328e28ad$export$82334bbdfcebb57 as meter, $d8604e77328e28ad$export$80e4b313e5e6b30d as nav, $d8604e77328e28ad$export$528ba0e6da49e146 as noscript, $d8604e77328e28ad$export$be5493f9613cbbe as object, $d8604e77328e28ad$export$b2235297ee22a6fe as ol, $d8604e77328e28ad$export$b9d336f245a516e8 as optgroup, $d8604e77328e28ad$export$a75d1723e6bda2ec as option, $d8604e77328e28ad$export$c789db2c85949867 as output, $d8604e77328e28ad$export$ffb5f4729a158638 as p, $d8604e77328e28ad$export$1188214e9d38144e as picture, $d8604e77328e28ad$export$2af2ac64526e2aa9 as pre, $d8604e77328e28ad$export$504d7abb21fa8c9 as progress, $d8604e77328e28ad$export$9e5f44173e64f162 as q, $d8604e77328e28ad$export$6d4c73e3ddf8818b as rp, $d8604e77328e28ad$export$f08282231bb71285 as rt, $d8604e77328e28ad$export$f2b283820b448b35 as ruby, $d8604e77328e28ad$export$2408f22a0fab9ae5 as s, $d8604e77328e28ad$export$8c1cb8fb6818c292 as samp, $d8604e77328e28ad$export$d76128d007d19019 as search, $d8604e77328e28ad$export$fe2e36411d703b3d as section, $d8604e77328e28ad$export$2e6c959c16ff56b8 as select, $d8604e77328e28ad$export$103b78750979eead as slot, $d8604e77328e28ad$export$3c17b0e969a90510 as small, $d8604e77328e28ad$export$b4d5da5f34fb77ad as source, $d8604e77328e28ad$export$afc1bfabebaf28a2 as span, $d8604e77328e28ad$export$59ae2c325a998f89 as strong, $d8604e77328e28ad$export$f93b5905241a7cca as sub, $d8604e77328e28ad$export$9a2dbef7a17e2e58 as summary, $d8604e77328e28ad$export$abe1cd54efe9b9cd as sup, $d8604e77328e28ad$export$9852986a3ec5f6a0 as table, $d8604e77328e28ad$export$7cdd536eaa8f163c as tbody, $d8604e77328e28ad$export$2beef8af2014e5c6 as td, $d8604e77328e28ad$export$ce69bd05624d0c48 as template, $d8604e77328e28ad$export$a3574df893ffa88d as textarea, $d8604e77328e28ad$export$9396b2f97a03ad14 as tfoot, $d8604e77328e28ad$export$d657bc098992a431 as th, $d8604e77328e28ad$export$e3f32a5920890b82 as thead, $d8604e77328e28ad$export$2da9be4cfdb689b1 as time, $d8604e77328e28ad$export$fb184b623420d9be as title, $d8604e77328e28ad$export$72451b88a72ad9c2 as tr, $d8604e77328e28ad$export$6b2a7d5132615086 as track, $d8604e77328e28ad$export$3b14a55fb2447963 as u, $d8604e77328e28ad$export$b5023c870cb34848 as ul, $d8604e77328e28ad$export$65574c28afdf980a as _var, $d8604e77328e28ad$export$5f8d3589eb8441ca as video, $d8604e77328e28ad$export$ee8f8f9447a35bdc as wbr, $984b9bf1478e5592$export$5a462553037f0c2b as _a, $984b9bf1478e5592$export$e3607ec2d7a891c4 as animate, $984b9bf1478e5592$export$5e588c605a4a78b2 as animateMotion, $984b9bf1478e5592$export$729fc4eb9847864b as animateTransform, $984b9bf1478e5592$export$e1d786d2f707b414 as circle, $984b9bf1478e5592$export$a93a2fac2519a03d as clipPath, $984b9bf1478e5592$export$868461b1c6870d10 as defs, $984b9bf1478e5592$export$51987bb50e1f6752 as desc, $984b9bf1478e5592$export$35eec893e28a8a34 as ellipse, $984b9bf1478e5592$export$ba172c53ad3949dd as feBlend, $984b9bf1478e5592$export$5eb95cb0e6566912 as feColorMatrix, $984b9bf1478e5592$export$32d87166552d46e4 as feComponentTransfer, $984b9bf1478e5592$export$a9c456e7f59a922e as feComposite, $984b9bf1478e5592$export$80857957c253f74c as feConvolveMatrix, $984b9bf1478e5592$export$15897bb48f363dc5 as feDiffuseLighting, $984b9bf1478e5592$export$29d24d9a033d4415 as feDisplacementMap, $984b9bf1478e5592$export$189ae3b23835546d as feDistantLight, $984b9bf1478e5592$export$a2a7ecf3147a8160 as feDropShadow, $984b9bf1478e5592$export$d4a3c574e219ec41 as feFlood, $984b9bf1478e5592$export$ff335e1896a0d6ac as feFuncA, $984b9bf1478e5592$export$b413ed7ce780ab62 as feFuncB, $984b9bf1478e5592$export$acd966dff92826df as feFuncG, $984b9bf1478e5592$export$1c8b9a56b85655d7 as feFuncR, $984b9bf1478e5592$export$fab9ed97c28f4d5 as feGaussianBlur, $984b9bf1478e5592$export$5c615a36cad27f2a as feImage, $984b9bf1478e5592$export$f72866be216dad64 as feMerge, $984b9bf1478e5592$export$80304804ee4b74ee as feMergeNode, $984b9bf1478e5592$export$97b2331bbf087a92 as feMorphology, $984b9bf1478e5592$export$c5df7b6020d120a4 as feOffset, $984b9bf1478e5592$export$d886bd6a8560a99b as fePointLight, $984b9bf1478e5592$export$99967a5441a64397 as feSpecularLighting, $984b9bf1478e5592$export$40aa73cef2a57617 as feSpotLight, $984b9bf1478e5592$export$ec9928c0fd729eba as feTile, $984b9bf1478e5592$export$ac27df26d1bb1c75 as feTurbulence, $984b9bf1478e5592$export$3dea766d36a8935f as filter, $984b9bf1478e5592$export$25ef286fa535664a as foreignObject, $984b9bf1478e5592$export$39b482c5e57630a8 as g, $984b9bf1478e5592$export$5c452ff88e35e47d as image, $984b9bf1478e5592$export$53f1d5ea8de3d7c as line, $984b9bf1478e5592$export$46def8197cf4dd4c as linearGradient, $984b9bf1478e5592$export$ffc4d0086f1a4c9 as marker, $984b9bf1478e5592$export$d99f0801a68bbcf1 as mask, $984b9bf1478e5592$export$dbb5e893e736e4ee as metadata, $984b9bf1478e5592$export$d455c2d7dc3122e5 as mpath, $984b9bf1478e5592$export$bb654e07daaf8c3a as path, $984b9bf1478e5592$export$24f82734ea047e6f as pattern, $984b9bf1478e5592$export$b7b19aa0ee06c73 as polygon, $984b9bf1478e5592$export$8d69707c7074d5c0 as polyline, $984b9bf1478e5592$export$3922d1ccb8631cd8 as radialGradient, $984b9bf1478e5592$export$4b409e53cf4df6e6 as rect, $984b9bf1478e5592$export$adaa4cf7ef1b65be as set, $984b9bf1478e5592$export$fa6813432f753b0d as stop, $984b9bf1478e5592$export$7ed1367e7fa1ad68 as svg, $984b9bf1478e5592$export$424b8b2ab9af2944 as _switch, $984b9bf1478e5592$export$8f701197936bc2a6 as symbol, $984b9bf1478e5592$export$a3ca1e9bc4bd5d82 as _text, $984b9bf1478e5592$export$5fc665c586745ec9 as textPath, $984b9bf1478e5592$export$a80dcad378414f77 as _title, $984b9bf1478e5592$export$79063f2f83f17896 as tspan, $984b9bf1478e5592$export$1f96ae73734a86cc as use, $984b9bf1478e5592$export$c4ddc81c7b2c8d7a as view, $1eb28a2bf32712d8$export$e95eef2b09e4b8c0 as FDocument, $b9742d79d7b0a03e$export$4d9facee29974f3 as Registry, $b9742d79d7b0a03e$export$76fb3b11e24d7138 as Felin, $0b8665cef9b4a99e$export$694e0d28c7ffc90c as Stack, $2bb0b494aaead7bf$export$5555872daa4f06f9 as DOMUpdate, $2bb0b494aaead7bf$export$c52e4155f62af1ea as ComputedRefresh, $2bb0b494aaead7bf$export$5828e9a0e553cd23 as EffectCall, $2bb0b494aaead7bf$export$45d7d895b4aac00a as RouteChange, $2bb0b494aaead7bf$export$56ff9fe5a7beeb12 as InitEffectRegistry, $2bb0b494aaead7bf$export$fea67a6c7e2368c7 as InitComputedRegistry, $e2e1ea6dd3b7d2e1$export$68028ad1cb93a754 as $text, $e2e1ea6dd3b7d2e1$export$98a37c23c8479e79 as $state, $e2e1ea6dd3b7d2e1$export$8500887edacda160 as $effect, $e2e1ea6dd3b7d2e1$export$5c8bbe4eacac8365 as $computed, $e2e1ea6dd3b7d2e1$export$b01d3b47943cf0fd as $router, $e2e1ea6dd3b7d2e1$export$64da394a6c00ab6 as $route, $e2e1ea6dd3b7d2e1$export$1804ef204fd3bee1 as $params, $e2e1ea6dd3b7d2e1$export$81dbbbf987bfbc02 as $document, $e2e1ea6dd3b7d2e1$export$c453910a0b76012e as $link, $e2e1ea6dd3b7d2e1$export$24842cd1e1f3d46f as $if, $e2e1ea6dd3b7d2e1$export$3364fcc330baceba as $for, $e2e1ea6dd3b7d2e1$export$418b8c9bcbfeed78 as $length, $6dd8eba6afe36dea$export$55185c17a0fcbe46 as Router, $6dd8eba6afe36dea$export$e7b0ac011bb776c6 as Route, $fab42eb3dee39b5b$export$f1921b45c66f982c as ValueType, $fab42eb3dee39b5b$export$b108bf477f1767a9 as toCssString, $fab42eb3dee39b5b$export$aaa51b9a4e209041 as determineValueType, $fab42eb3dee39b5b$export$7360f1dcbbc79d37 as getObjectMethods, $fab42eb3dee39b5b$export$8c9c8540fba163fe as flattenElementTree, $fab42eb3dee39b5b$export$f38f450dbc1e989 as ExtensibleFunction};
//# sourceMappingURL=felin.js.map
