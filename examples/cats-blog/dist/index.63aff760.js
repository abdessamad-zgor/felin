// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6DoTH":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "26170a8763aff760";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"adjPd":[function(require,module,exports) {
var _felin = require("felin");
let home = ()=>{
    let counter = (0, _felin.$state)({
        count: {
            a: 1
        }
    });
    //let msg = $computed((count) => {
    //  return `the count is ${count.count.a()}`
    //}, counter)
    //$effect(() => {
    //  console.log("msg is: ", msg())
    //}, counter)
    return (0, _felin.div)("hello", (0, _felin.button)("increase").style({
        backgroundColor: "blue"
    }).listener("click", (e)=>counter.count.a.set((s)=>++s)));
};
let blogs = ()=>{
    let blogs = (0, _felin.$state)(fetch("http://jsonfakery.com/blogs").then((res)=>res.json()));
    return (0, _felin.div)((0, _felin.$if)(()=>$length(blogs) < 0, "no blogs", (0, _felin.$for)(blogs, (blog)=>(0, _felin.div)(h3(blog.title), small(blog.created_at)))));
};
let blog_post = ()=>{
    let post = (0, _felin.$state)(fetch("http://jsonfakery.com/blogs/random").then((res)=>res.json()));
    return (0, _felin.div)((0, _felin.h1)(post.title), (0, _felin.p)(post.summary));
};
let page = ()=>{
    return (0, _felin.main)((0, _felin.nav)((0, _felin.$link)("/", "Home"), (0, _felin.$link)("/blog", "Blog")), (0, _felin.$router)((0, _felin.$route)("/", home()), (0, _felin.$route)("/blog", blogs()), (0, _felin.$route)("/blog/:slug", blog_post())));
};
let fdocument = new (0, _felin.FDocument)();
fdocument.render("#page", page());

},{"felin":"lf7ue"}],"lf7ue":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _registry = require("./core/registry");
var _primitives = require("./primitives");
parcelHelpers.exportAll(_primitives, exports);
var _elements = require("./elements");
parcelHelpers.exportAll(_elements, exports);
var _core = require("./core");
parcelHelpers.exportAll(_core, exports);
var _helpers = require("./helpers");
parcelHelpers.exportAll(_helpers, exports);
var _router = require("./router");
parcelHelpers.exportAll(_router, exports);
var _utils = require("./utils");
parcelHelpers.exportAll(_utils, exports);
if (window) window.Felin = (0, _registry.Felin);
exports.default = (0, _registry.Felin);

},{"./core/registry":"k0ig4","./primitives":"1HuQ8","./elements":"5urhq","./core":"cdh2A","./helpers":"4paKq","./router":"gAmwj","./utils":"lXRiZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k0ig4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Registry", ()=>Registry);
parcelHelpers.export(exports, "Felin", ()=>Felin);
var _tasks = require("./tasks");
var _element = require("../elements/element");
var _stack = require("./stack");
class Registry {
    constructor(){
        this.stack = new (0, _stack.Stack)();
        this.register = {};
    }
    initEffectRegistry(effect) {
        let root = Object.keys(this.register).find((r)=>effect.states.map((s)=>s._id).some((s_id)=>this.register[r].states.map((s)=>s._id).includes(s_id)));
        if (root) {
            if (!this.register[root].effects) this.register[root].effects = [];
            this.register[root].effects.push(effect);
        } else this.stack.push(new (0, _tasks.InitEffectRegistry)(effect));
    }
    initComputedRegistry(computed) {
        let root = Object.keys(this.register).find((r)=>computed.states.map((s)=>s._id).some((s_id)=>this.register[r].states.map((s)=>s._id).includes(s_id)));
        if (root) {
            if (!this.register[root].computed) this.register[root].computed = [];
            this.register[root].computed.push(computed);
        } else this.stack.push(new (0, _tasks.InitComputedRegistry)(computed));
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
                    if (target instanceof (0, _element.FText)) target = target.parent;
                    let domUpdate = new (0, _tasks.DOMUpdate)({
                        document: fdocument,
                        state: state
                    });
                    this.stack.push(domUpdate);
                }
            }
            let computed = this.register[root].computed.find((e)=>e.states.some((s)=>s._id == state._id));
            if (computed) {
                let computedRefresh = new (0, _tasks.ComputedRefresh)(computed);
                this.stack.push(computedRefresh);
                let cStates = this.register[root].computed.filter((s)=>s._id == computed._id);
                for (let cState of cStates){
                    let cTargets = cState.elements;
                    for (let cTarget of cTargets){
                        if (cTarget instanceof (0, _element.FText)) cTarget = cTarget.parent;
                        let computedDomUpdate = new (0, _tasks.DOMUpdate)({
                            document: fdocument,
                            state: cState
                        });
                        this.stack.push(computedDomUpdate);
                    }
                }
            }
            let effect = this.register[root].effects.find((e)=>e.states.some((s)=>s._id == state._id));
            if (effect) {
                let effectCall = new (0, _tasks.EffectCall)(effect);
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
        let initTask = new (0, _tasks.InitEffectRegistry)(effect);
        setTimeout(()=>{
            this.stack.push(initTask);
        }, 1000);
    }
    registerComputed(computed) {
        let initTask = new (0, _tasks.InitComputedRegistry)(computed);
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
            path,
            router: this.register[rootSelector].router,
            document: this.register[rootSelector].document
        };
        let routeChangeTask = new (0, _tasks.RouteChange)(args);
        this.stack.push(routeChangeTask);
    }
    getElementRootSelector(element, parent) {
        let rootSelector;
        let doesHaveChild = false;
        if (parent) {
            for (let child of parent._children){
                if (child._id == element._id) doesHaveChild = true;
                else if (child instanceof (0, _element.FHTMLElement)) doesHaveChild = this.getElementRootSelector(element, child);
            }
            return doesHaveChild;
        } else {
            for (let selector of Object.keys(this.register)){
                let selectedDocument = this.register[selector].document;
                for (let child of selectedDocument.rootElement._children)if (child._id == element._id) rootSelector = selector;
                else {
                    if (child instanceof (0, _element.FHTMLElement)) {
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
const Felin = new Registry();

},{"./tasks":"ikoUr","../elements/element":"eFapF","./stack":"6rDUV","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ikoUr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DOMUpdate", ()=>DOMUpdate);
parcelHelpers.export(exports, "ComputedRefresh", ()=>ComputedRefresh);
parcelHelpers.export(exports, "EffectCall", ()=>EffectCall);
parcelHelpers.export(exports, "RouteChange", ()=>RouteChange);
parcelHelpers.export(exports, "InitEffectRegistry", ()=>InitEffectRegistry);
parcelHelpers.export(exports, "InitComputedRegistry", ()=>InitComputedRegistry);
class DOMUpdate {
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
class ComputedRefresh {
    constructor(args){
        this.args = args;
        this.priority = 2;
    }
    call() {
        let newValue = this.args.fn(...this.args.states);
        this.args.value = newValue;
    }
}
class EffectCall {
    constructor(args){
        this.args = args;
        this.priority = 3;
    }
    call() {
        this.args.effect();
    }
}
class RouteChange {
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
class InitEffectRegistry {
    constructor(args){
        this.priority = 0;
        this.args = args;
    }
    call() {
        Felin.initEffectRegistry(this.args);
    }
}
class InitComputedRegistry {
    constructor(args){
        this.priority = 0;
        this.args = args;
    }
    call() {
        Felin.initComputedRegistry(this.args);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"eFapF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FText", ()=>FText);
parcelHelpers.export(exports, "FHTMLElement", ()=>FHTMLElement);
parcelHelpers.export(exports, "FSVGElement", ()=>FSVGElement);
var _state = require("../primitives/state");
var _utils = require("../utils");
var _router = require("../router");
var _computed = require("../primitives/computed");
class FText {
    constructor(text, ...args){
        this._id = crypto.randomUUID();
        this.register = {};
        if (args.length > 0) for (let arg of args){
            if (arg instanceof (0, _state.State)) {
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
class FHTMLElement {
    constructor(name, children){
        this._id = crypto.randomUUID();
        this.name = name;
        this.register = {};
        if (Array.isArray(children)) {
            this._children = [];
            for(let i = 0; i < children.length; i++){
                let child = children[i];
                if (child instanceof (0, _state.State)) {
                    this._children.push(new FText("{}", child));
                    child.setElement(this);
                    if (!this.register.states) this.register.states = [];
                    this.register.states.push(child);
                } else if (child instanceof (0, _computed.Computed)) {
                    this._children.push(new FText("{}", child));
                    child.setElement(this);
                    if (!this.register.computed) this.register.computed = [];
                    this.register.computed.push(child);
                } else if (child instanceof (0, _router.Router)) {
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
                } else if (child instanceof (0, _router.Route)) {
                    child.parent = this;
                    child.index = i;
                    if (!Array.isArray(this.register.routes)) this.register.routes = [];
                    this.register.routes.push(child);
                } else if (child instanceof FHTMLElement || child instanceof FSVGElement || child instanceof FText) {
                    child.parent = this;
                    this._children.push(child);
                } else if (typeof child == "string" || typeof child == "number") {
                    let textContent = new FText(child.toString());
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
        for (let child of children)if (child instanceof (0, _state.State) || child instanceof (0, _computed.Computed)) {
            let textContent = new FText("{}", child());
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
        if (this._style) element.style.cssText = (0, _utils.toCssString)(this._style);
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
class FSVGElement {
    constructor(name, children){
        this._id = crypto.randomUUID();
        this.name = name;
        this.register = {};
        this._children = [];
        for (let child of children){
            if (child instanceof (0, _state.State)) {
                let textContent = new FText("{}", child);
                textContent.parent = this;
                this._children.push(textContent);
                if (!this.register.states) this.register.states = [];
                this.register.states.push(child);
                this.register.states.push(child);
            } else if (child instanceof (0, _computed.Computed)) {
                let textContent = new FText("{}", child);
                textContent.parent = this;
                this._children.push(textContent);
                if (!this.register.computed) this.register.computed = [];
                this.register.computed.push(child);
            } else this._children.push(typeof child == "string" ? new FText(child) : child);
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
        for (let child of children)if (child instanceof (0, _state.State)) this._children.push(new FText("{}", child));
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
        if (this._style) element.style.cssText = (0, _utils.toCssString)(this._style);
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

},{"../primitives/state":"eraqE","../utils":"lXRiZ","../router":"gAmwj","../primitives/computed":"lCiwy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eraqE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "State", ()=>State);
parcelHelpers.export(exports, "FArray", ()=>FArray);
parcelHelpers.export(exports, "FBoolean", ()=>FBoolean);
parcelHelpers.export(exports, "FObject", ()=>FObject);
parcelHelpers.export(exports, "FString", ()=>FString);
parcelHelpers.export(exports, "FNumber", ()=>FNumber);
var _debug = require("../debug");
var _utils = require("../utils");
var _computed = require("./computed");
class State extends (0, _utils.ExtensibleFunction) {
    constructor(value, parent){
        super(()=>this.state.value);
        this.elements = [];
        this._id = crypto.randomUUID();
        if (parent) this.parent = parent;
        let dataType = (0, _utils.determineValueType)(value);
        (0, _debug.Assert).debug(dataType);
        switch((0, _utils.determineValueType)(value)){
            case (0, _utils.ValueType).OBJECT:
                this.state = new FObject(value);
                this.state.parent = this;
                break;
            case (0, _utils.ValueType).ARRAY:
                this.state = new FArray(value);
                this.state.parent = this;
                break;
            case (0, _utils.ValueType).NUMBER:
                this.state = new FNumber(value);
                this.state.parent = this;
                break;
            case (0, _utils.ValueType).STRING:
                this.state = new FString(value);
                this.state.parent = this;
                break;
            case (0, _utils.ValueType).BOOLEAN:
                this.state = new FBoolean(value);
                this.state.parent = this;
                break;
            case (0, _utils.ValueType).ANY:
                throw Error("Error: unsupported state data type.");
            default:
                break;
        }
        if (this.state instanceof FObject) {
            let handler = {
                get: (target, prop, reciever)=>{
                    if (prop == "set") return this.set;
                    else if ((0, _utils.getObjectMethods)(target.state).includes(prop)) return target.state[prop];
                    else if (!Object.keys(target()).includes(prop)) return Reflect.get(target, prop, reciever);
                    else {
                        let value = target.state[prop];
                        let childState = new State(value, {
                            state: this,
                            key: prop
                        });
                        return childState;
                    }
                }
            };
            return new Proxy(this, handler);
        } else if (this.state instanceof FArray) {
            let handler = {
                get: (target, prop, reciever)=>{
                    if (prop == "set") return this.set;
                    else if ((0, _utils.getObjectMethods)(target.state).includes(prop)) return target.state[prop];
                    else if (!Object.keys(target()).includes(prop)) return Reflect.get(target, prop, reciever);
                    else {
                        let value = target.state[prop];
                        let childState = new State(value, {
                            state: this,
                            key: prop
                        });
                        return childState;
                    }
                }
            };
            return new Proxy(this, handler);
        } else if (this.state instanceof FNumber) {
            let handler = {
                get: (target, prop, reciever)=>{
                    if (prop == "set") return target.set;
                    else if ((0, _utils.getObjectMethods)(target.state).includes(prop)) return target.state[prop];
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
class FArray {
    constructor(value){
        this.value = value;
        let handler = {
            get: (target, prop, reciever)=>{
                if ((0, _utils.getObjectMethods)(target).includes(prop)) return target[prop];
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
class FBoolean {
    constructor(value){
        this.value = value;
    }
}
class FObject {
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
        return new (0, _computed.Computed)(()=>Object.keys(this.value), this.parent);
    }
    values() {
        return new (0, _computed.Computed)(()=>Object.values(this.value), this.parent);
    }
    has(key) {
        return new (0, _computed.Computed)(()=>Object.keys(this.value).includes(key), this.parent);
    }
}
class FString {
    constructor(value){
        this.value = value;
    }
}
class FNumber {
    constructor(value){
        this.value = value;
    }
    gt(cmp) {
        return new (0, _computed.Computed)(()=>this.value > cmp, this.parent);
    }
    gte(cmp) {
        return new (0, _computed.Computed)(()=>this.value >= cmp, this.parent);
    }
    lt(cmp) {
        return new (0, _computed.Computed)(()=>this.value < cmp, this.parent);
    }
    lte(cmp) {
        return new (0, _computed.Computed)(()=>this.value <= cmp, this.parent);
    }
    eq(cmp) {
        return new (0, _computed.Computed)(()=>this.value == cmp, this.parent);
    }
}

},{"../debug":"eZp3W","../utils":"lXRiZ","./computed":"lCiwy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eZp3W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FelinError", ()=>FelinError);
parcelHelpers.export(exports, "Assert", ()=>Assert);
parcelHelpers.export(exports, "Expectation", ()=>Expectation);
var _utils = require("./utils");
const templateError = (strings, values)=>{
    let template = "";
    for(let i = 0; i < strings.length; i++){
        let value = i >= values.length ? values[i] : "";
        template += `${strings[i]}${value}`;
    }
    return template;
};
const FelinErrorMap = new Map([
    [
        "error",
        (value)=>templateError`Unexpected error ${value}`
    ]
]);
class FelinError {
    constructor(code, message, ...args){
        this.code = code;
        if (message) this.message = message;
        else if (FelinErrorMap.has(code)) {
            let templateMessage = FelinErrorMap.get(code);
            if (typeof templateMessage == "function") this.message = templateMessage(...args);
            else this.message = message;
        }
    }
    toString() {
        return `FelinError: ${this.code}: ${this.message}`;
    }
    throw() {
        throw new Error(this.toString());
    }
}
class Assert extends (0, _utils.ExtensibleFunction) {
    constructor(code, message){
        super((condition, ...args)=>{
            if (condition) console.log(this.message || "Assertion successful");
            else {
                let error = new FelinError(this.code);
                for (let arg of args)console.log(arg);
                error.throw();
            }
        });
        this.message = message;
        this.code = code;
    }
    static assert(message) {
        return new Assert(message);
    }
    static expect(value) {
        let expectation = new Expectation(value);
        let assertion = new Assert();
        expectation.assertion = assertion;
        return expectation;
    }
    static debug(value) {
        console.log(value);
    }
}
class Expectation {
    constructor(value){
        this.value = value;
    }
    toBe(value) {
        //preforms shallow compairaison on objects and premitive values
        if (typeof value != "number" && !value.toString().includes(".")) {
            this.assertion.message = "succesfull match.";
            this.assertion.code = "error";
            this.assertion(Object.is(this.value, value) == true, this.value, value);
        } else throw new Error("floating point numbers cannot be matched with toBe consider using toBeCloseTo.");
    }
    toEqual(value) {
        //preforms deep compairaison on objects and premitive values
        if (typeof value != "number" && !value.toString().includes(".")) {
            this.assertion.message = "succesfull match.";
            this.assertion.code = "error";
            if (typeof value == "object" && typeof this.value == "object") this.assertion(deepCompare(this.value, value), this.value, value);
            else if (typeof value != typeof this.value) {
                this.assertion.code = "type";
                this.assertion(false, this.value, value);
            } else this.assertion(Object.is(this.value, value) == true, this.value, value);
        } else throw new Error("floating point numbers cannot be matched with toBe consider using toBeCloseTo.");
    }
    toBeCloseTo(value, precision = 1) {
        if (typeof this.value == typeof value) this.assertion(value.toFixed(precision) == this.value.toString(), this.value, value);
        else throw new Error("toBeCloseTo matcher is exclusive to floating point numbers consider using toBe or toEqual.");
    }
}
function deepCompare(value1, value2) {
    let result = true;
    for(let key in value1){
        if (typeof value1[key] == "object" && typeof value2[key] == "object") result = deepCompare(value1[key], value2[key]);
        else return false;
        if (value1[key] != value2[key]) result = false;
        if (!result) return result;
    }
    return result;
}

},{"./utils":"lXRiZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lXRiZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ValueType", ()=>ValueType);
parcelHelpers.export(exports, "toCssString", ()=>toCssString);
parcelHelpers.export(exports, "determineValueType", ()=>determineValueType);
parcelHelpers.export(exports, "getObjectMethods", ()=>getObjectMethods);
parcelHelpers.export(exports, "flattenElementTree", ()=>flattenElementTree);
parcelHelpers.export(exports, "ExtensibleFunction", ()=>ExtensibleFunction);
var _element = require("./elements/element");
var ValueType;
(function(ValueType) {
    ValueType[ValueType["NUMBER"] = 0] = "NUMBER";
    ValueType[ValueType["STRING"] = 1] = "STRING";
    ValueType[ValueType["BOOLEAN"] = 2] = "BOOLEAN";
    ValueType[ValueType["OBJECT"] = 3] = "OBJECT";
    ValueType[ValueType["MAP"] = 4] = "MAP";
    ValueType[ValueType["SET"] = 5] = "SET";
    ValueType[ValueType["ARRAY"] = 6] = "ARRAY";
    ValueType[ValueType["ANY"] = 7] = "ANY";
})(ValueType || (ValueType = {}));
function toCssString(style) {
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
function isObjectLiteral(obj) {
    if (typeof obj !== "object" || obj === null) return false;
    var hasOwnProp = Object.prototype.hasOwnProperty, ObjProto = obj;
    // get obj's Object constructor's prototype
    while(Object.getPrototypeOf(ObjProto = Object.getPrototypeOf(ObjProto)) !== null);
    return Object.getPrototypeOf(obj) === ObjProto;
}
function determineValueType(value) {
    if (typeof value == "string") return 1;
    else if (typeof value == "number") return 0;
    else if (typeof value == "boolean") return 2;
    else if (Array.isArray(value)) return 6;
    else if (isObjectLiteral(value)) return 3;
    else return 7;
}
function getObjectMethods(obj) {
    let objectPrototype = obj.prototype;
    let methods = Object.getOwnPropertyNames(objectPrototype).filter((k)=>typeof obj[k] == "function" && k != "constructor");
    return methods;
}
function flattenElementTree(element, acc) {
    if (acc) {
        let lastElementParent = element;
        let i = 1;
        let nextElementParentIndex = acc.findIndex((e)=>e._id == element._id) + i;
        let nextElementParent = null;
        while(nextElementParentIndex < acc.length){
            nextElementParent = acc[nextElementParentIndex];
            if (nextElementParent instanceof (0, _element.FSVGElement) || nextElementParent instanceof (0, _element.FHTMLElement)) {
                if (nextElementParent._children.length != 0) {
                    nextElementParent = acc[nextElementParentIndex];
                    acc = [
                        ...acc,
                        ...nextElementParent._children
                    ];
                    return flattenElementTree(nextElementParent, acc);
                } else continue;
            }
            i++;
            nextElementParentIndex = acc.findIndex((e)=>e._id == element._id) + i;
        }
        return acc;
    } else {
        let accumulator = [];
        if (element instanceof (0, _element.FHTMLElement) || element instanceof (0, _element.FSVGElement)) {
            if (element._children.length > 0) {
                accumulator = [
                    element,
                    ...element._children
                ];
                return flattenElementTree(element, accumulator);
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
class ExtensibleFunction extends Function {
    constructor(f){
        super();
        return Object.setPrototypeOf(f, new.target.prototype);
    }
}

},{"./elements/element":"eFapF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lCiwy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Computed", ()=>Computed);
var _utils = require("../utils");
class Computed extends (0, _utils.ExtensibleFunction) {
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

},{"../utils":"lXRiZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gAmwj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Router", ()=>Router);
parcelHelpers.export(exports, "Route", ()=>Route);
var _element = require("../elements/element");
class Router {
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
            if (element instanceof (0, _element.FHTMLElement)) {
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
class Route {
    constructor(path, element){
        this.children = [];
        this.path = path;
        this.element = element;
    }
}

},{"../elements/element":"eFapF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6rDUV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Stack", ()=>Stack);
function quickSortByPriority(array) {
    if (array.length <= 1) return array;
    let pivot = array[0];
    let left = [];
    let right = [];
    for(let i = 1; i < array.length; i++)array[i].priority < pivot.priority ? left.push(array[i]) : right.push(array[i]);
    return quickSortByPriority(left).concat(pivot, quickSortByPriority(right));
}
class Stack {
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
        this.tasks = quickSortByPriority(this.tasks);
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1HuQ8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _state = require("./state");
parcelHelpers.exportAll(_state, exports);
var _effect = require("./effect");
parcelHelpers.exportAll(_effect, exports);
var _controlFlow = require("./control-flow");
parcelHelpers.exportAll(_controlFlow, exports);
var _computed = require("./computed");
parcelHelpers.exportAll(_computed, exports);

},{"./state":"eraqE","./effect":"462z9","./control-flow":"26xdt","./computed":"lCiwy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"462z9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Effect", ()=>Effect);
class Effect {
    constructor(fn, ...states){
        this.effect = fn;
        this.states = states;
        this._id = crypto.randomUUID();
        Felin.registerEffect(this);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"26xdt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Conditional", ()=>Conditional);
parcelHelpers.export(exports, "Loop", ()=>Loop);
class Conditional {
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
class Loop {
    constructor(state, iteration){
        this.state = state;
        this.iteration = iteration;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5urhq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _element = require("./element");
parcelHelpers.exportAll(_element, exports);
var _html = require("./html");
parcelHelpers.exportAll(_html, exports);
var _svg = require("./svg");
parcelHelpers.exportAll(_svg, exports);

},{"./component":"iVgot","./element":"eFapF","./html":"fE6rq","./svg":"lR4J0","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iVgot":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Component", ()=>Component);
var _utils = require("../utils");
class Component extends (0, _utils.ExtensibleFunction) {
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

},{"../utils":"lXRiZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fE6rq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "a", ()=>a);
parcelHelpers.export(exports, "abbr", ()=>abbr);
parcelHelpers.export(exports, "address", ()=>address);
parcelHelpers.export(exports, "area", ()=>area);
parcelHelpers.export(exports, "article", ()=>article);
parcelHelpers.export(exports, "aside", ()=>aside);
parcelHelpers.export(exports, "audio", ()=>audio);
parcelHelpers.export(exports, "b", ()=>b);
parcelHelpers.export(exports, "base", ()=>base);
parcelHelpers.export(exports, "bdi", ()=>bdi);
parcelHelpers.export(exports, "bdo", ()=>bdo);
parcelHelpers.export(exports, "blockquote", ()=>blockquote);
parcelHelpers.export(exports, "body", ()=>body);
parcelHelpers.export(exports, "br", ()=>br);
parcelHelpers.export(exports, "button", ()=>button);
parcelHelpers.export(exports, "canvas", ()=>canvas);
parcelHelpers.export(exports, "caption", ()=>caption);
parcelHelpers.export(exports, "cite", ()=>cite);
parcelHelpers.export(exports, "code", ()=>code);
parcelHelpers.export(exports, "col", ()=>col);
parcelHelpers.export(exports, "colgroup", ()=>colgroup);
parcelHelpers.export(exports, "data", ()=>data);
parcelHelpers.export(exports, "datalist", ()=>datalist);
parcelHelpers.export(exports, "dd", ()=>dd);
parcelHelpers.export(exports, "del", ()=>del);
parcelHelpers.export(exports, "details", ()=>details);
parcelHelpers.export(exports, "dfn", ()=>dfn);
parcelHelpers.export(exports, "dialog", ()=>dialog);
parcelHelpers.export(exports, "div", ()=>div);
parcelHelpers.export(exports, "dl", ()=>dl);
parcelHelpers.export(exports, "dt", ()=>dt);
parcelHelpers.export(exports, "em", ()=>em);
parcelHelpers.export(exports, "embed", ()=>embed);
parcelHelpers.export(exports, "fieldset", ()=>fieldset);
parcelHelpers.export(exports, "figcaption", ()=>figcaption);
parcelHelpers.export(exports, "figure", ()=>figure);
parcelHelpers.export(exports, "footer", ()=>footer);
parcelHelpers.export(exports, "form", ()=>form);
parcelHelpers.export(exports, "h1", ()=>h1);
parcelHelpers.export(exports, "h2", ()=>h2);
parcelHelpers.export(exports, "h3", ()=>h3);
parcelHelpers.export(exports, "h4", ()=>h4);
parcelHelpers.export(exports, "h5", ()=>h5);
parcelHelpers.export(exports, "h6", ()=>h6);
parcelHelpers.export(exports, "head", ()=>head);
parcelHelpers.export(exports, "header", ()=>header);
parcelHelpers.export(exports, "hgroup", ()=>hgroup);
parcelHelpers.export(exports, "hr", ()=>hr);
parcelHelpers.export(exports, "html", ()=>html);
parcelHelpers.export(exports, "i", ()=>i);
parcelHelpers.export(exports, "iframe", ()=>iframe);
parcelHelpers.export(exports, "img", ()=>img);
parcelHelpers.export(exports, "input", ()=>input);
parcelHelpers.export(exports, "ins", ()=>ins);
parcelHelpers.export(exports, "kbd", ()=>kbd);
parcelHelpers.export(exports, "label", ()=>label);
parcelHelpers.export(exports, "legend", ()=>legend);
parcelHelpers.export(exports, "li", ()=>li);
parcelHelpers.export(exports, "link", ()=>link);
parcelHelpers.export(exports, "main", ()=>main);
parcelHelpers.export(exports, "map", ()=>map);
parcelHelpers.export(exports, "mark", ()=>mark);
parcelHelpers.export(exports, "menu", ()=>menu);
parcelHelpers.export(exports, "meta", ()=>meta);
parcelHelpers.export(exports, "meter", ()=>meter);
parcelHelpers.export(exports, "nav", ()=>nav);
parcelHelpers.export(exports, "noscript", ()=>noscript);
parcelHelpers.export(exports, "object", ()=>object);
parcelHelpers.export(exports, "ol", ()=>ol);
parcelHelpers.export(exports, "optgroup", ()=>optgroup);
parcelHelpers.export(exports, "option", ()=>option);
parcelHelpers.export(exports, "output", ()=>output);
parcelHelpers.export(exports, "p", ()=>p);
parcelHelpers.export(exports, "picture", ()=>picture);
parcelHelpers.export(exports, "pre", ()=>pre);
parcelHelpers.export(exports, "progress", ()=>progress);
parcelHelpers.export(exports, "q", ()=>q);
parcelHelpers.export(exports, "rp", ()=>rp);
parcelHelpers.export(exports, "rt", ()=>rt);
parcelHelpers.export(exports, "ruby", ()=>ruby);
parcelHelpers.export(exports, "s", ()=>s);
parcelHelpers.export(exports, "samp", ()=>samp);
parcelHelpers.export(exports, "search", ()=>search);
parcelHelpers.export(exports, "section", ()=>section);
parcelHelpers.export(exports, "select", ()=>select);
parcelHelpers.export(exports, "slot", ()=>slot);
parcelHelpers.export(exports, "small", ()=>small);
parcelHelpers.export(exports, "source", ()=>source);
parcelHelpers.export(exports, "span", ()=>span);
parcelHelpers.export(exports, "strong", ()=>strong);
parcelHelpers.export(exports, "sub", ()=>sub);
parcelHelpers.export(exports, "summary", ()=>summary);
parcelHelpers.export(exports, "sup", ()=>sup);
parcelHelpers.export(exports, "table", ()=>table);
parcelHelpers.export(exports, "tbody", ()=>tbody);
parcelHelpers.export(exports, "td", ()=>td);
parcelHelpers.export(exports, "template", ()=>template);
parcelHelpers.export(exports, "textarea", ()=>textarea);
parcelHelpers.export(exports, "tfoot", ()=>tfoot);
parcelHelpers.export(exports, "th", ()=>th);
parcelHelpers.export(exports, "thead", ()=>thead);
parcelHelpers.export(exports, "time", ()=>time);
parcelHelpers.export(exports, "title", ()=>title);
parcelHelpers.export(exports, "tr", ()=>tr);
parcelHelpers.export(exports, "track", ()=>track);
parcelHelpers.export(exports, "u", ()=>u);
parcelHelpers.export(exports, "ul", ()=>ul);
parcelHelpers.export(exports, "_var", ()=>_var);
parcelHelpers.export(exports, "video", ()=>video);
parcelHelpers.export(exports, "wbr", ()=>wbr);
var _element = require("../elements/element");
const a = (...children)=>{
    let element = new (0, _element.FHTMLElement)("a", children);
    return element;
};
const abbr = (...children)=>{
    let element = new (0, _element.FHTMLElement)("abbr", children);
    return element;
};
const address = (...children)=>{
    let element = new (0, _element.FHTMLElement)("address", children);
    return element;
};
const area = (...children)=>{
    let element = new (0, _element.FHTMLElement)("area", children);
    return element;
};
const article = (...children)=>{
    let element = new (0, _element.FHTMLElement)("article", children);
    return element;
};
const aside = (...children)=>{
    let element = new (0, _element.FHTMLElement)("aside", children);
    return element;
};
const audio = (...children)=>{
    let element = new (0, _element.FHTMLElement)("audio", children);
    return element;
};
const b = (...children)=>{
    let element = new (0, _element.FHTMLElement)("b", children);
    return element;
};
const base = (...children)=>{
    let element = new (0, _element.FHTMLElement)("base", children);
    return element;
};
const bdi = (...children)=>{
    let element = new (0, _element.FHTMLElement)("bdi", children);
    return element;
};
const bdo = (...children)=>{
    let element = new (0, _element.FHTMLElement)("bdo", children);
    return element;
};
const blockquote = (...children)=>{
    let element = new (0, _element.FHTMLElement)("blockquote", children);
    return element;
};
const body = (...children)=>{
    let element = new (0, _element.FHTMLElement)("body", children);
    return element;
};
const br = (...children)=>{
    let element = new (0, _element.FHTMLElement)("br", children);
    return element;
};
const button = (...children)=>{
    let element = new (0, _element.FHTMLElement)("button", children);
    return element;
};
const canvas = (...children)=>{
    let element = new (0, _element.FHTMLElement)("canvas", children);
    return element;
};
const caption = (...children)=>{
    let element = new (0, _element.FHTMLElement)("caption", children);
    return element;
};
const cite = (...children)=>{
    let element = new (0, _element.FHTMLElement)("cite", children);
    return element;
};
const code = (...children)=>{
    let element = new (0, _element.FHTMLElement)("code", children);
    return element;
};
const col = (...children)=>{
    let element = new (0, _element.FHTMLElement)("col", children);
    return element;
};
const colgroup = (...children)=>{
    let element = new (0, _element.FHTMLElement)("colgroup", children);
    return element;
};
const data = (...children)=>{
    let element = new (0, _element.FHTMLElement)("data", children);
    return element;
};
const datalist = (...children)=>{
    let element = new (0, _element.FHTMLElement)("datalist", children);
    return element;
};
const dd = (...children)=>{
    let element = new (0, _element.FHTMLElement)("dd", children);
    return element;
};
const del = (...children)=>{
    let element = new (0, _element.FHTMLElement)("del", children);
    return element;
};
const details = (...children)=>{
    let element = new (0, _element.FHTMLElement)("details", children);
    return element;
};
const dfn = (...children)=>{
    let element = new (0, _element.FHTMLElement)("dfn", children);
    return element;
};
const dialog = (...children)=>{
    let element = new (0, _element.FHTMLElement)("dialog", children);
    return element;
};
const div = (...children)=>{
    let element = new (0, _element.FHTMLElement)("div", children);
    return element;
};
const dl = (...children)=>{
    let element = new (0, _element.FHTMLElement)("dl", children);
    return element;
};
const dt = (...children)=>{
    let element = new (0, _element.FHTMLElement)("dt", children);
    return element;
};
const em = (...children)=>{
    let element = new (0, _element.FHTMLElement)("em", children);
    return element;
};
const embed = (...children)=>{
    let element = new (0, _element.FHTMLElement)("embed", children);
    return element;
};
const fieldset = (...children)=>{
    let element = new (0, _element.FHTMLElement)("fieldset", children);
    return element;
};
const figcaption = (...children)=>{
    let element = new (0, _element.FHTMLElement)("figcaption", children);
    return element;
};
const figure = (...children)=>{
    let element = new (0, _element.FHTMLElement)("figure", children);
    return element;
};
const footer = (...children)=>{
    let element = new (0, _element.FHTMLElement)("footer", children);
    return element;
};
const form = (...children)=>{
    let element = new (0, _element.FHTMLElement)("form", children);
    return element;
};
const h1 = (...children)=>{
    let element = new (0, _element.FHTMLElement)("h1", children);
    return element;
};
const h2 = (...children)=>{
    let element = new (0, _element.FHTMLElement)("h2", children);
    return element;
};
const h3 = (...children)=>{
    let element = new (0, _element.FHTMLElement)("h3", children);
    return element;
};
const h4 = (...children)=>{
    let element = new (0, _element.FHTMLElement)("h4", children);
    return element;
};
const h5 = (...children)=>{
    let element = new (0, _element.FHTMLElement)("h5", children);
    return element;
};
const h6 = (...children)=>{
    let element = new (0, _element.FHTMLElement)("h6", children);
    return element;
};
const head = (...children)=>{
    let element = new (0, _element.FHTMLElement)("head", children);
    return element;
};
const header = (...children)=>{
    let element = new (0, _element.FHTMLElement)("header", children);
    return element;
};
const hgroup = (...children)=>{
    let element = new (0, _element.FHTMLElement)("hgroup", children);
    return element;
};
const hr = (...children)=>{
    let element = new (0, _element.FHTMLElement)("hr", children);
    return element;
};
const html = (...children)=>{
    let element = new (0, _element.FHTMLElement)("html", children);
    return element;
};
const i = (...children)=>{
    let element = new (0, _element.FHTMLElement)("i", children);
    return element;
};
const iframe = (...children)=>{
    let element = new (0, _element.FHTMLElement)("iframe", children);
    return element;
};
const img = (...children)=>{
    let element = new (0, _element.FHTMLElement)("img", children);
    return element;
};
const input = (...children)=>{
    let element = new (0, _element.FHTMLElement)("input", children);
    return element;
};
const ins = (...children)=>{
    let element = new (0, _element.FHTMLElement)("ins", children);
    return element;
};
const kbd = (...children)=>{
    let element = new (0, _element.FHTMLElement)("kbd", children);
    return element;
};
const label = (...children)=>{
    let element = new (0, _element.FHTMLElement)("label", children);
    return element;
};
const legend = (...children)=>{
    let element = new (0, _element.FHTMLElement)("legend", children);
    return element;
};
const li = (...children)=>{
    let element = new (0, _element.FHTMLElement)("li", children);
    return element;
};
const link = (...children)=>{
    let element = new (0, _element.FHTMLElement)("link", children);
    return element;
};
const main = (...children)=>{
    let element = new (0, _element.FHTMLElement)("main", children);
    return element;
};
const map = (...children)=>{
    let element = new (0, _element.FHTMLElement)("map", children);
    return element;
};
const mark = (...children)=>{
    let element = new (0, _element.FHTMLElement)("mark", children);
    return element;
};
const menu = (...children)=>{
    let element = new (0, _element.FHTMLElement)("menu", children);
    return element;
};
const meta = (...children)=>{
    let element = new (0, _element.FHTMLElement)("meta", children);
    return element;
};
const meter = (...children)=>{
    let element = new (0, _element.FHTMLElement)("meter", children);
    return element;
};
const nav = (...children)=>{
    let element = new (0, _element.FHTMLElement)("nav", children);
    return element;
};
const noscript = (...children)=>{
    let element = new (0, _element.FHTMLElement)("noscript", children);
    return element;
};
const object = (...children)=>{
    let element = new (0, _element.FHTMLElement)("object", children);
    return element;
};
const ol = (...children)=>{
    let element = new (0, _element.FHTMLElement)("ol", children);
    return element;
};
const optgroup = (...children)=>{
    let element = new (0, _element.FHTMLElement)("optgroup", children);
    return element;
};
const option = (...children)=>{
    let element = new (0, _element.FHTMLElement)("option", children);
    return element;
};
const output = (...children)=>{
    let element = new (0, _element.FHTMLElement)("output", children);
    return element;
};
const p = (...children)=>{
    let element = new (0, _element.FHTMLElement)("p", children);
    return element;
};
const picture = (...children)=>{
    let element = new (0, _element.FHTMLElement)("picture", children);
    return element;
};
const pre = (...children)=>{
    let element = new (0, _element.FHTMLElement)("pre", children);
    return element;
};
const progress = (...children)=>{
    let element = new (0, _element.FHTMLElement)("progress", children);
    return element;
};
const q = (...children)=>{
    let element = new (0, _element.FHTMLElement)("q", children);
    return element;
};
const rp = (...children)=>{
    let element = new (0, _element.FHTMLElement)("rp", children);
    return element;
};
const rt = (...children)=>{
    let element = new (0, _element.FHTMLElement)("rt", children);
    return element;
};
const ruby = (...children)=>{
    let element = new (0, _element.FHTMLElement)("ruby", children);
    return element;
};
const s = (...children)=>{
    let element = new (0, _element.FHTMLElement)("s", children);
    return element;
};
const samp = (...children)=>{
    let element = new (0, _element.FHTMLElement)("samp", children);
    return element;
};
const search = (...children)=>{
    let element = new (0, _element.FHTMLElement)("search", children);
    return element;
};
const section = (...children)=>{
    let element = new (0, _element.FHTMLElement)("section", children);
    return element;
};
const select = (...children)=>{
    let element = new (0, _element.FHTMLElement)("select", children);
    return element;
};
const slot = (...children)=>{
    let element = new (0, _element.FHTMLElement)("slot", children);
    return element;
};
const small = (...children)=>{
    let element = new (0, _element.FHTMLElement)("small", children);
    return element;
};
const source = (...children)=>{
    let element = new (0, _element.FHTMLElement)("source", children);
    return element;
};
const span = (...children)=>{
    let element = new (0, _element.FHTMLElement)("span", children);
    return element;
};
const strong = (...children)=>{
    let element = new (0, _element.FHTMLElement)("strong", children);
    return element;
};
const sub = (...children)=>{
    let element = new (0, _element.FHTMLElement)("sub", children);
    return element;
};
const summary = (...children)=>{
    let element = new (0, _element.FHTMLElement)("summary", children);
    return element;
};
const sup = (...children)=>{
    let element = new (0, _element.FHTMLElement)("sup", children);
    return element;
};
const table = (...children)=>{
    let element = new (0, _element.FHTMLElement)("table", children);
    return element;
};
const tbody = (...children)=>{
    let element = new (0, _element.FHTMLElement)("tbody", children);
    return element;
};
const td = (...children)=>{
    let element = new (0, _element.FHTMLElement)("td", children);
    return element;
};
const template = (...children)=>{
    let element = new (0, _element.FHTMLElement)("template", children);
    return element;
};
const textarea = (...children)=>{
    let element = new (0, _element.FHTMLElement)("textarea", children);
    return element;
};
const tfoot = (...children)=>{
    let element = new (0, _element.FHTMLElement)("tfoot", children);
    return element;
};
const th = (...children)=>{
    let element = new (0, _element.FHTMLElement)("th", children);
    return element;
};
const thead = (...children)=>{
    let element = new (0, _element.FHTMLElement)("thead", children);
    return element;
};
const time = (...children)=>{
    let element = new (0, _element.FHTMLElement)("time", children);
    return element;
};
const title = (...children)=>{
    let element = new (0, _element.FHTMLElement)("title", children);
    return element;
};
const tr = (...children)=>{
    let element = new (0, _element.FHTMLElement)("tr", children);
    return element;
};
const track = (...children)=>{
    let element = new (0, _element.FHTMLElement)("track", children);
    return element;
};
const u = (...children)=>{
    let element = new (0, _element.FHTMLElement)("u", children);
    return element;
};
const ul = (...children)=>{
    let element = new (0, _element.FHTMLElement)("ul", children);
    return element;
};
const _var = (...children)=>{
    let element = new (0, _element.FHTMLElement)("var", children);
    return element;
};
const video = (...children)=>{
    let element = new (0, _element.FHTMLElement)("video", children);
    return element;
};
const wbr = (...children)=>{
    let element = new (0, _element.FHTMLElement)("wbr", children);
    return element;
};

},{"../elements/element":"eFapF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lR4J0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_a", ()=>_a);
parcelHelpers.export(exports, "animate", ()=>animate);
parcelHelpers.export(exports, "animateMotion", ()=>animateMotion);
parcelHelpers.export(exports, "animateTransform", ()=>animateTransform);
parcelHelpers.export(exports, "circle", ()=>circle);
parcelHelpers.export(exports, "clipPath", ()=>clipPath);
parcelHelpers.export(exports, "defs", ()=>defs);
parcelHelpers.export(exports, "desc", ()=>desc);
parcelHelpers.export(exports, "ellipse", ()=>ellipse);
parcelHelpers.export(exports, "feBlend", ()=>feBlend);
parcelHelpers.export(exports, "feColorMatrix", ()=>feColorMatrix);
parcelHelpers.export(exports, "feComponentTransfer", ()=>feComponentTransfer);
parcelHelpers.export(exports, "feComposite", ()=>feComposite);
parcelHelpers.export(exports, "feConvolveMatrix", ()=>feConvolveMatrix);
parcelHelpers.export(exports, "feDiffuseLighting", ()=>feDiffuseLighting);
parcelHelpers.export(exports, "feDisplacementMap", ()=>feDisplacementMap);
parcelHelpers.export(exports, "feDistantLight", ()=>feDistantLight);
parcelHelpers.export(exports, "feDropShadow", ()=>feDropShadow);
parcelHelpers.export(exports, "feFlood", ()=>feFlood);
parcelHelpers.export(exports, "feFuncA", ()=>feFuncA);
parcelHelpers.export(exports, "feFuncB", ()=>feFuncB);
parcelHelpers.export(exports, "feFuncG", ()=>feFuncG);
parcelHelpers.export(exports, "feFuncR", ()=>feFuncR);
parcelHelpers.export(exports, "feGaussianBlur", ()=>feGaussianBlur);
parcelHelpers.export(exports, "feImage", ()=>feImage);
parcelHelpers.export(exports, "feMerge", ()=>feMerge);
parcelHelpers.export(exports, "feMergeNode", ()=>feMergeNode);
parcelHelpers.export(exports, "feMorphology", ()=>feMorphology);
parcelHelpers.export(exports, "feOffset", ()=>feOffset);
parcelHelpers.export(exports, "fePointLight", ()=>fePointLight);
parcelHelpers.export(exports, "feSpecularLighting", ()=>feSpecularLighting);
parcelHelpers.export(exports, "feSpotLight", ()=>feSpotLight);
parcelHelpers.export(exports, "feTile", ()=>feTile);
parcelHelpers.export(exports, "feTurbulence", ()=>feTurbulence);
parcelHelpers.export(exports, "filter", ()=>filter);
parcelHelpers.export(exports, "foreignObject", ()=>foreignObject);
parcelHelpers.export(exports, "g", ()=>g);
parcelHelpers.export(exports, "image", ()=>image);
parcelHelpers.export(exports, "line", ()=>line);
parcelHelpers.export(exports, "linearGradient", ()=>linearGradient);
parcelHelpers.export(exports, "marker", ()=>marker);
parcelHelpers.export(exports, "mask", ()=>mask);
parcelHelpers.export(exports, "metadata", ()=>metadata);
parcelHelpers.export(exports, "mpath", ()=>mpath);
parcelHelpers.export(exports, "path", ()=>path);
parcelHelpers.export(exports, "pattern", ()=>pattern);
parcelHelpers.export(exports, "polygon", ()=>polygon);
parcelHelpers.export(exports, "polyline", ()=>polyline);
parcelHelpers.export(exports, "radialGradient", ()=>radialGradient);
parcelHelpers.export(exports, "rect", ()=>rect);
parcelHelpers.export(exports, "set", ()=>set);
parcelHelpers.export(exports, "stop", ()=>stop);
parcelHelpers.export(exports, "svg", ()=>svg);
parcelHelpers.export(exports, "_switch", ()=>_switch);
parcelHelpers.export(exports, "symbol", ()=>symbol);
parcelHelpers.export(exports, "_text", ()=>_text);
parcelHelpers.export(exports, "textPath", ()=>textPath);
parcelHelpers.export(exports, "_title", ()=>_title);
parcelHelpers.export(exports, "tspan", ()=>tspan);
parcelHelpers.export(exports, "use", ()=>use);
parcelHelpers.export(exports, "view", ()=>view);
var _element = require("../elements/element");
const _a = (...children)=>{
    let element = new (0, _element.FSVGElement)("a", children);
    return element;
};
const animate = (...children)=>{
    let element = new (0, _element.FSVGElement)("animate", children);
    return element;
};
const animateMotion = (...children)=>{
    let element = new (0, _element.FSVGElement)("animateMotion", children);
    return element;
};
const animateTransform = (...children)=>{
    let element = new (0, _element.FSVGElement)("animateTransform", children);
    return element;
};
const circle = (...children)=>{
    let element = new (0, _element.FSVGElement)("circle", children);
    return element;
};
const clipPath = (...children)=>{
    let element = new (0, _element.FSVGElement)("clipPath", children);
    return element;
};
const defs = (...children)=>{
    let element = new (0, _element.FSVGElement)("defs", children);
    return element;
};
const desc = (...children)=>{
    let element = new (0, _element.FSVGElement)("desc", children);
    return element;
};
const ellipse = (...children)=>{
    let element = new (0, _element.FSVGElement)("ellipse", children);
    return element;
};
const feBlend = (...children)=>{
    let element = new (0, _element.FSVGElement)("feBlend", children);
    return element;
};
const feColorMatrix = (...children)=>{
    let element = new (0, _element.FSVGElement)("feColorMatrix", children);
    return element;
};
const feComponentTransfer = (...children)=>{
    let element = new (0, _element.FSVGElement)("feComponentTransfer", children);
    return element;
};
const feComposite = (...children)=>{
    let element = new (0, _element.FSVGElement)("feComposite", children);
    return element;
};
const feConvolveMatrix = (...children)=>{
    let element = new (0, _element.FSVGElement)("feConvolveMatrix", children);
    return element;
};
const feDiffuseLighting = (...children)=>{
    let element = new (0, _element.FSVGElement)("feDiffuseLighting", children);
    return element;
};
const feDisplacementMap = (...children)=>{
    let element = new (0, _element.FSVGElement)("feDisplacementMap", children);
    return element;
};
const feDistantLight = (...children)=>{
    let element = new (0, _element.FSVGElement)("feDistantLight", children);
    return element;
};
const feDropShadow = (...children)=>{
    let element = new (0, _element.FSVGElement)("feDropShadow", children);
    return element;
};
const feFlood = (...children)=>{
    let element = new (0, _element.FSVGElement)("feFlood", children);
    return element;
};
const feFuncA = (...children)=>{
    let element = new (0, _element.FSVGElement)("feFuncA", children);
    return element;
};
const feFuncB = (...children)=>{
    let element = new (0, _element.FSVGElement)("feFuncB", children);
    return element;
};
const feFuncG = (...children)=>{
    let element = new (0, _element.FSVGElement)("feFuncG", children);
    return element;
};
const feFuncR = (...children)=>{
    let element = new (0, _element.FSVGElement)("feFuncR", children);
    return element;
};
const feGaussianBlur = (...children)=>{
    let element = new (0, _element.FSVGElement)("feGaussianBlur", children);
    return element;
};
const feImage = (...children)=>{
    let element = new (0, _element.FSVGElement)("feImage", children);
    return element;
};
const feMerge = (...children)=>{
    let element = new (0, _element.FSVGElement)("feMerge", children);
    return element;
};
const feMergeNode = (...children)=>{
    let element = new (0, _element.FSVGElement)("feMergeNode", children);
    return element;
};
const feMorphology = (...children)=>{
    let element = new (0, _element.FSVGElement)("feMorphology", children);
    return element;
};
const feOffset = (...children)=>{
    let element = new (0, _element.FSVGElement)("feOffset", children);
    return element;
};
const fePointLight = (...children)=>{
    let element = new (0, _element.FSVGElement)("fePointLight", children);
    return element;
};
const feSpecularLighting = (...children)=>{
    let element = new (0, _element.FSVGElement)("feSpecularLighting", children);
    return element;
};
const feSpotLight = (...children)=>{
    let element = new (0, _element.FSVGElement)("feSpotLight", children);
    return element;
};
const feTile = (...children)=>{
    let element = new (0, _element.FSVGElement)("feTile", children);
    return element;
};
const feTurbulence = (...children)=>{
    let element = new (0, _element.FSVGElement)("feTurbulence", children);
    return element;
};
const filter = (...children)=>{
    let element = new (0, _element.FSVGElement)("filter", children);
    return element;
};
const foreignObject = (...children)=>{
    let element = new (0, _element.FSVGElement)("foreignObject", children);
    return element;
};
const g = (...children)=>{
    let element = new (0, _element.FSVGElement)("g", children);
    return element;
};
const image = (...children)=>{
    let element = new (0, _element.FSVGElement)("image", children);
    return element;
};
const line = (...children)=>{
    let element = new (0, _element.FSVGElement)("line", children);
    return element;
};
const linearGradient = (...children)=>{
    let element = new (0, _element.FSVGElement)("linearGradient", children);
    return element;
};
const marker = (...children)=>{
    let element = new (0, _element.FSVGElement)("marker", children);
    return element;
};
const mask = (...children)=>{
    let element = new (0, _element.FSVGElement)("mask", children);
    return element;
};
const metadata = (...children)=>{
    let element = new (0, _element.FSVGElement)("metadata", children);
    return element;
};
const mpath = (...children)=>{
    let element = new (0, _element.FSVGElement)("mpath", children);
    return element;
};
const path = (...children)=>{
    let element = new (0, _element.FSVGElement)("path", children);
    return element;
};
const pattern = (...children)=>{
    let element = new (0, _element.FSVGElement)("pattern", children);
    return element;
};
const polygon = (...children)=>{
    let element = new (0, _element.FSVGElement)("polygon", children);
    return element;
};
const polyline = (...children)=>{
    let element = new (0, _element.FSVGElement)("polyline", children);
    return element;
};
const radialGradient = (...children)=>{
    let element = new (0, _element.FSVGElement)("radialGradient", children);
    return element;
};
const rect = (...children)=>{
    let element = new (0, _element.FSVGElement)("rect", children);
    return element;
};
const set = (...children)=>{
    let element = new (0, _element.FSVGElement)("set", children);
    return element;
};
const stop = (...children)=>{
    let element = new (0, _element.FSVGElement)("stop", children);
    return element;
};
const svg = (...children)=>{
    let element = new (0, _element.FSVGElement)("svg", children);
    return element;
};
const _switch = (...children)=>{
    let element = new (0, _element.FSVGElement)("switch", children);
    return element;
};
const symbol = (...children)=>{
    let element = new (0, _element.FSVGElement)("symbol", children);
    return element;
};
const _text = (...children)=>{
    let element = new (0, _element.FSVGElement)("text", children);
    return element;
};
const textPath = (...children)=>{
    let element = new (0, _element.FSVGElement)("textPath", children);
    return element;
};
const _title = (...children)=>{
    let element = new (0, _element.FSVGElement)("title", children);
    return element;
};
const tspan = (...children)=>{
    let element = new (0, _element.FSVGElement)("tspan", children);
    return element;
};
const use = (...children)=>{
    let element = new (0, _element.FSVGElement)("use", children);
    return element;
};
const view = (...children)=>{
    let element = new (0, _element.FSVGElement)("view", children);
    return element;
};

},{"../elements/element":"eFapF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cdh2A":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _document = require("./document");
parcelHelpers.exportAll(_document, exports);
var _registry = require("./registry");
parcelHelpers.exportAll(_registry, exports);
var _stack = require("./stack");
parcelHelpers.exportAll(_stack, exports);
var _tasks = require("./tasks");
parcelHelpers.exportAll(_tasks, exports);

},{"./document":"kYNpY","./registry":"k0ig4","./stack":"6rDUV","./tasks":"ikoUr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kYNpY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FDocument", ()=>FDocument);
var _element = require("../elements/element");
var _utils = require("../utils");
class FDocument {
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
            if (currentElement instanceof (0, _element.FHTMLElement) || currentElement instanceof (0, _element.FSVGElement)) elementPath.push(currentElement);
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
        let elementTreeList = (0, _utils.flattenElementTree)(element);
        elementTreeList.forEach((el)=>{
            if (el instanceof (0, _element.FHTMLElement)) {
                if (el.register.router) router = el.register.router;
            }
        });
        return router;
    }
    getStates(element) {
        let states = [];
        let elementTreeList = (0, _utils.flattenElementTree)(element);
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

},{"../elements/element":"eFapF","../utils":"lXRiZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4paKq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "$text", ()=>$text);
parcelHelpers.export(exports, "$state", ()=>$state);
parcelHelpers.export(exports, "$effect", ()=>$effect);
parcelHelpers.export(exports, "$computed", ()=>$computed);
parcelHelpers.export(exports, "$router", ()=>$router);
parcelHelpers.export(exports, "$route", ()=>$route);
parcelHelpers.export(exports, "$params", ()=>$params);
parcelHelpers.export(exports, "$document", ()=>$document);
parcelHelpers.export(exports, "$link", ()=>$link);
parcelHelpers.export(exports, "$if", ()=>$if);
parcelHelpers.export(exports, "$for", ()=>$for);
parcelHelpers.export(exports, "$length", ()=>$length);
var _state = require("./primitives/state");
var _effect = require("./primitives/effect");
var _computed = require("./primitives/computed");
var _controlFlow = require("./primitives/control-flow");
var _router = require("./router");
var _element = require("./elements/element");
var _felin = require("./felin");
function $text(text, ...args) {
    return new (0, _element.FText)(text, ...args);
}
function $state(value) {
    return new (0, _state.State)(value);
}
function $effect(fn, ...states) {
    new (0, _effect.Effect)(fn, ...states);
}
function $computed(fn, ...states) {
    return new (0, _computed.Computed)(fn, ...states);
}
function $router(...routes) {
    return new (0, _router.Router)(...routes);
}
function $route(path, element) {
    return new (0, _router.Route)(path, element);
}
function $params() {
    return Felin.getRouterParams();
}
function $document() {
    return new (0, _felin.FDocument)();
}
function $link(path, element) {
    let linkElement = new (0, _element.FHTMLElement)("a", [
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
function $if(condition, trueBranch, falseBranch) {
    return new (0, _controlFlow.Conditional)(condition, trueBranch, falseBranch);
}
function $for(state, iteration) {
    return new (0, _controlFlow.Loop)(state, iteration);
}
function $length(state) {
    return new (0, _state.State)(state.length);
}

},{"./primitives/state":"eraqE","./primitives/effect":"462z9","./primitives/computed":"lCiwy","./primitives/control-flow":"26xdt","./router":"gAmwj","./elements/element":"eFapF","./felin":"lf7ue","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["6DoTH","adjPd"], "adjPd", "parcelRequire3170")

//# sourceMappingURL=index.63aff760.js.map
