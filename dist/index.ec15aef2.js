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
})({"8MMwS":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "9bc8f75dec15aef2";
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

},{}],"38Lj6":[function(require,module,exports) {
var _felin = require("felin");
/*
 * import {div, p, button, main} from "flex"
 * 
 *
 * let state = $state(0)
 *
 * let effect = state.effect(()=>{
 *
 * })
 *
 * let page = main([
 *  div([
 *    p("hello world"+state()),
 *    button("Click")
 *      .style({backgroundColor: 'blue'})
 *      .listener('click', (e)=>state.set(s=>s++))
 *  ]).style({width: '100%', display: 'flex'}).class("hello"),
 * ])
 *
 * let hsDocument = new HSDocument()
 * hsDocument.render('query', page)
 */ let page = ()=>{
    let counter = (0, _felin.state)({
        count: 0
    });
    let msg = (0, _felin.computed)((count)=>{
        return `the count is ${count()}`;
    }, counter.count);
    console.log(msg);
    (0, _felin.effect)((counter)=>{
        console.log("msg is: ", msg());
    })(counter.count);
    return (0, _felin.main)((0, _felin.div)((0, _felin.p)("hello world"), (0, _felin.div)((0, _felin.div)((0, _felin.p)("I am also here"), msg, (0, _felin.button)("Click me").listen("click", ()=>{
        counter.count.set((s)=>++s);
        console.log(counter.value);
    })))));
};
let flDocument = new (0, _felin.FlDocument)();
flDocument.render("#page", page());

},{"felin":"1zTr2"}],"1zTr2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _core = require("./core");
var _elements = require("./elements");
parcelHelpers.exportAll(_elements, exports);
var _document = require("./document");
parcelHelpers.exportAll(_document, exports);
var _helpers = require("./helpers");
parcelHelpers.exportAll(_helpers, exports);
window.Felin = (0, _core.Felin);

},{"./core":"6Wpln","./elements":"gZ6Cm","./document":"6lUEl","./helpers":"adjmJ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6Wpln":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FlDOMUpdate", ()=>FlDOMUpdate);
parcelHelpers.export(exports, "FlComputedRefresh", ()=>FlComputedRefresh);
parcelHelpers.export(exports, "FlEffectCall", ()=>FlEffectCall);
parcelHelpers.export(exports, "FlStack", ()=>FlStack);
parcelHelpers.export(exports, "FlRuntime", ()=>FlRuntime);
parcelHelpers.export(exports, "FlRegistry", ()=>FlRegistry);
parcelHelpers.export(exports, "Felin", ()=>Felin);
var _element = require("./element");
class FlDOMUpdate {
    constructor(args){
        this.priority = 1;
        this.args = args;
    }
    call(args) {
        let newValue = this.args.state();
        let nodeSelector = this.args.hsDocument.selector(this.args.element);
        let domElement = this.args.hsDocument.document.querySelector(nodeSelector);
        if (domElement) domElement.replaceWith(this.args.element.element());
    }
}
class FlComputedRefresh {
    constructor(args){
        this.args = args;
        this.priority = 2;
    }
    call(args) {
        let newValue = this.args.fn(...this.args.states);
        this.args.value = newValue;
    }
}
class FlEffectCall {
    constructor(args){
        this.args = args;
        this.priority = 3;
    }
    call(args) {
        args.fn(...args.dependents);
    }
}
function quickSortByPriority(array) {
    if (array.length <= 1) return array;
    let pivot = array[0];
    let left = [];
    let right = [];
    for(let i = 1; i < array.length; i++)array[i].priority < pivot.priority ? left.push(array[i]) : right.push(array[i]);
    return quickSortByPriority(left).concat(pivot, quickSortByPriority(right));
}
class FlStack {
    constructor(){
        this.tasks = [];
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
    }
    empty() {
        return this.tasks.length == 0;
    }
}
class FlRuntime {
    constructor(){
        this.stack = new FlStack();
        this.running = true;
    }
    run() {
        if (!this.running) this.running = true;
        while(this.running){
            if (this.stack.empty()) {
                this.running = false;
                break;
            }
            let task = this.stack.pop();
            if (task instanceof FlDOMUpdate) task.call(task.args);
            else if (task instanceof FlComputedRefresh) task.call(task.args);
            else if (task instanceof FlEffectCall) task.call(task.args);
        }
    }
    pushTask(task) {
        this.stack.push(task);
        if (!this.running) this.run();
    }
}
class FlRegistry {
    constructor(){
        this.runtime = new FlRuntime();
        this.documentRootsMap = {};
        this.documentStates = {};
        this.effects = [];
        this.computed = [];
    }
    register(task) {
        this.runtime.pushTask(task);
    }
    registerStateCalls(root, stateCalls) {
        this.documentStates[root] = stateCalls;
    }
    registerStateUpdate(state) {
        let root = Object.keys(this.documentStates).find((r)=>this.documentStates[r].some((s)=>s.state.id == state.id));
        if (root) {
            let hsDocument = this.documentRootsMap[root];
            let stateCalls = this.documentStates[root].filter((s)=>s.state.id == state.id);
            for (let stateCall of stateCalls){
                let targetElement = stateCall.element;
                if (stateCall.element instanceof (0, _element.FlTextNode)) targetElement = stateCall.element.parentNode;
                let domUpdate = new FlDOMUpdate({
                    hsDocument,
                    state: stateCall.state,
                    element: targetElement
                });
                this.runtime.pushTask(domUpdate);
            }
        }
        let computed = this.computed.find((e)=>e.states.some((s)=>s.id == state.id));
        if (computed) {
            let computedRefresh = new FlComputedRefresh(computed);
            this.runtime.pushTask(computedRefresh);
            let computedStateRoot = Object.keys(this.documentStates).find((r)=>this.documentStates[r].some((s)=>s.state.id == computed.id));
            if (computedStateRoot) {
                let computedFlDocument = this.documentRootsMap[computedStateRoot];
                let computedStateCalls = this.documentStates[computedStateRoot].filter((s)=>s.state.id == computed.id);
                for (let computedStateCall of computedStateCalls){
                    let computedTargetElement = computedStateCall.element;
                    if (computedStateCall.element instanceof (0, _element.FlTextNode)) computedTargetElement = computedStateCall.element.parentNode;
                    let computedDomUpdate = new FlDOMUpdate({
                        hsDocument: computedFlDocument,
                        state: computedStateCall.state,
                        element: computedTargetElement
                    });
                    this.runtime.pushTask(computedDomUpdate);
                }
            }
        }
        let effect = this.effects.find((e)=>e.dependants.some((s)=>s.id == state.id));
        if (effect) {
            let effectCall = new FlEffectCall({
                fn: effect.effect,
                dependents: effect.dependants
            });
            this.runtime.pushTask(effectCall);
        }
    }
    registerFlDocumentRoot(root, document) {
        if (!Object.keys(this.documentRootsMap).includes(root)) this.documentRootsMap[root] = document;
    }
    run() {
        this.runtime.run();
    }
    registerEffect(effect) {
        if (!this.effects.some((e)=>e.id == effect.id)) this.effects.push(effect);
    }
    registerComputedState(state) {
        if (!this.computed.some((c)=>c.id == state.id)) this.computed.push(state);
    }
}
const Felin = new FlRegistry();

},{"./element":"7jhPb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7jhPb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FlTextNode", ()=>FlTextNode);
// TODO: MAKE `element()` ACCEPT AN `FlDocument`
parcelHelpers.export(exports, "FlHTMLElement", ()=>FlHTMLElement);
parcelHelpers.export(exports, "FlSVGElement", ()=>FlSVGElement);
var _style = require("./style");
class FlTextNode {
    constructor(text, ...args){
        this.stateCalls = [];
        this.id = crypto.randomUUID();
        if (args.length > 0) for (let arg of args)if (arg instanceof Function) this.stateCalls.push(arg);
        else text = text.replace("{}", arg);
        this.text = text;
    }
    element(parent) {
        if (parent) this.parentNode = parent;
        let textContent = this.text;
        for (let state of this.stateCalls)textContent = textContent.replace("{}", state());
        return document.createTextNode(textContent);
    }
    getStateCalls(accumulator) {
        let acc = accumulator || [];
        let stateCalls = this.stateCalls.map((sc)=>({
                state: sc,
                element: this
            }));
        acc = acc.concat(...stateCalls);
        return acc;
    }
}
class FlHTMLElement {
    constructor(name, children, style){
        this.stateCalls = [];
        this.id = crypto.randomUUID();
        this.name = name;
        if (typeof children == "string") this.$children = [
            new FlTextNode(children)
        ];
        else if (Array.isArray(children)) {
            this.$children = [];
            for (let child of children)if (child instanceof Function) {
                this.$children.push(new FlTextNode("{}", child));
                //@ts-ignore
                this.stateCalls.push(child);
            } else this.$children.push(typeof child == "string" ? new FlTextNode(child) : child);
        } else this.$children = [];
        this.$style = style || null;
        this.$listeners = new Map();
    }
    style(style) {
        this.$style = style;
        return this;
    }
    children(children) {
        if (!children) return this.$children;
        else {
            for (let child of children)if (child instanceof Function) this.$children.push(new FlTextNode("{}", child));
            else this.$children.push(child);
            return this;
        }
    }
    getStateCalls(accumulator) {
        let acc = accumulator || [];
        let stateCalls = this.stateCalls.map((sc)=>({
                state: sc,
                element: this
            }));
        acc = acc.concat(...stateCalls);
        if (this.$children.length != 0) for (let child of this.$children)acc = child.getStateCalls(acc);
        return acc;
    }
    child() {
        return this;
    }
    listen(eventname, callback) {
        if (!this.$listeners.has(eventname)) this.$listeners.set(eventname, callback);
        return this;
    }
    element(parent) {
        if (parent) this.parentNode = parent;
        let element = document.createElement(this.name);
        //element.style.cssText = toCssString(this.$style)
        for (let entry of this.$listeners.entries())element.addEventListener(entry[0], entry[1]);
        if (this.$style) element.style.cssText = (0, _style.toCssString)(this.$style);
        if (this.$classname) element.classList.add(...this.$classname.split(" "));
        for (let key of Object.keys(this.$attributes))element.setAttribute(key, this.$attributes[key]);
        let elementChildren = this.children();
        if (elementChildren.length == 0) return element;
        else {
            for (let child of elementChildren)//@ts-ignore
            element.appendChild(child.element(this));
            return element;
        }
    }
    class(classname) {
        this.$classname = classname;
    }
    attr(name, value) {
        this.$attributes[name] = value;
    }
    attrs(attrs) {
        this.$attributes = {
            ...this.$attributes,
            ...attrs
        };
    }
}
class FlSVGElement {
    constructor(name, children, style){
        this.stateCalls = [];
        this.id = crypto.randomUUID();
        this.name = name;
        this.$children = [];
        for (let child of children)if (child instanceof Function) {
            this.$children.push(new FlTextNode("{}", child));
            //@ts-ignore
            this.stateCalls.push(child);
        } else this.$children.push(typeof child == "string" ? new FlTextNode(child) : child);
        this.$style = style || null;
        this.$listeners = new Map();
    }
    style(style) {
        this.$style = style;
        return this;
    }
    children(children) {
        if (!children) return this.$children;
        else {
            for (let child of children)if (child instanceof Function) this.$children.push(new FlTextNode("{}", child));
            else this.$children.push(child);
            return this;
        }
    }
    getStateCalls(accumulator) {
        let acc = accumulator || [];
        let stateCalls = this.stateCalls.map((sc)=>({
                state: sc,
                element: this
            }));
        acc = acc.concat(...stateCalls);
        if (this.$children.length != 0) for (let child of this.$children)acc = child.getStateCalls(acc);
        return acc;
    }
    child() {
        return this;
    }
    listen(eventname, callback) {
        if (!this.$listeners.has(eventname)) this.$listeners.set(eventname, callback);
        return this;
    }
    element(parent) {
        if (parent) this.parentNode = parent;
        let element = document.createElementNS("http://www.w3.org/2000/svg", this.name);
        //element.style.cssText = toCssString(this.$style)
        for (let entry of this.$listeners.entries())element.addEventListener(entry[0], entry[1]);
        if (this.$style) element.style.cssText = (0, _style.toCssString)(this.$style);
        if (this.$classname) element.classList.add(...this.$classname.split(" "));
        for (let key of Object.keys(this.$attributes))element.setAttribute(key, this.$attributes[key]);
        let elementChildren = this.children();
        if (elementChildren.length == 0) return element;
        else {
            for (let child of elementChildren)//@ts-ignore
            element.appendChild(child.element(this));
            return element;
        }
    }
    class(classname) {
        this.$classname = classname;
    }
    attr(name, value) {
        this.$attributes[name] = value;
    }
    attrs(attrs) {
        this.$attributes = {
            ...this.$attributes,
            ...attrs
        };
    }
}

},{"./style":"llAwq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"llAwq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "toCssString", ()=>toCssString);
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

},{}],"gZ6Cm":[function(require,module,exports) {
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
parcelHelpers.export(exports, "$var", ()=>$var);
parcelHelpers.export(exports, "video", ()=>video);
parcelHelpers.export(exports, "wbr", ()=>wbr);
parcelHelpers.export(exports, "$a", ()=>$a);
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
parcelHelpers.export(exports, "$switch", ()=>$switch);
parcelHelpers.export(exports, "symbol", ()=>symbol);
parcelHelpers.export(exports, "$text", ()=>$text);
parcelHelpers.export(exports, "textPath", ()=>textPath);
parcelHelpers.export(exports, "$title", ()=>$title);
parcelHelpers.export(exports, "tspan", ()=>tspan);
parcelHelpers.export(exports, "use", ()=>use);
parcelHelpers.export(exports, "view", ()=>view);
var _element = require("./element");
const a = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("a", children);
    return element;
};
const abbr = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("abbr", children);
    return element;
};
const address = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("address", children);
    return element;
};
const area = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("area", children);
    return element;
};
const article = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("article", children);
    return element;
};
const aside = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("aside", children);
    return element;
};
const audio = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("audio", children);
    return element;
};
const b = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("b", children);
    return element;
};
const base = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("base", children);
    return element;
};
const bdi = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("bdi", children);
    return element;
};
const bdo = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("bdo", children);
    return element;
};
const blockquote = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("blockquote", children);
    return element;
};
const body = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("body", children);
    return element;
};
const br = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("br", children);
    return element;
};
const button = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("button", children);
    return element;
};
const canvas = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("canvas", children);
    return element;
};
const caption = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("caption", children);
    return element;
};
const cite = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("cite", children);
    return element;
};
const code = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("code", children);
    return element;
};
const col = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("col", children);
    return element;
};
const colgroup = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("colgroup", children);
    return element;
};
const data = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("data", children);
    return element;
};
const datalist = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("datalist", children);
    return element;
};
const dd = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("dd", children);
    return element;
};
const del = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("del", children);
    return element;
};
const details = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("details", children);
    return element;
};
const dfn = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("dfn", children);
    return element;
};
const dialog = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("dialog", children);
    return element;
};
const div = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("div", children);
    return element;
};
const dl = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("dl", children);
    return element;
};
const dt = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("dt", children);
    return element;
};
const em = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("em", children);
    return element;
};
const embed = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("embed", children);
    return element;
};
const fieldset = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("fieldset", children);
    return element;
};
const figcaption = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("figcaption", children);
    return element;
};
const figure = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("figure", children);
    return element;
};
const footer = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("footer", children);
    return element;
};
const form = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("form", children);
    return element;
};
const h1 = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("h1", children);
    return element;
};
const h2 = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("h2", children);
    return element;
};
const h3 = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("h3", children);
    return element;
};
const h4 = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("h4", children);
    return element;
};
const h5 = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("h5", children);
    return element;
};
const h6 = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("h6", children);
    return element;
};
const head = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("head", children);
    return element;
};
const header = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("header", children);
    return element;
};
const hgroup = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("hgroup", children);
    return element;
};
const hr = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("hr", children);
    return element;
};
const html = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("html", children);
    return element;
};
const i = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("i", children);
    return element;
};
const iframe = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("iframe", children);
    return element;
};
const img = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("img", children);
    return element;
};
const input = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("input", children);
    return element;
};
const ins = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("ins", children);
    return element;
};
const kbd = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("kbd", children);
    return element;
};
const label = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("label", children);
    return element;
};
const legend = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("legend", children);
    return element;
};
const li = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("li", children);
    return element;
};
const link = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("link", children);
    return element;
};
const main = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("main", children);
    return element;
};
const map = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("map", children);
    return element;
};
const mark = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("mark", children);
    return element;
};
const menu = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("menu", children);
    return element;
};
const meta = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("meta", children);
    return element;
};
const meter = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("meter", children);
    return element;
};
const nav = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("nav", children);
    return element;
};
const noscript = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("noscript", children);
    return element;
};
const object = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("object", children);
    return element;
};
const ol = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("ol", children);
    return element;
};
const optgroup = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("optgroup", children);
    return element;
};
const option = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("option", children);
    return element;
};
const output = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("output", children);
    return element;
};
const p = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("p", children);
    return element;
};
const picture = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("picture", children);
    return element;
};
const pre = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("pre", children);
    return element;
};
const progress = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("progress", children);
    return element;
};
const q = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("q", children);
    return element;
};
const rp = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("rp", children);
    return element;
};
const rt = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("rt", children);
    return element;
};
const ruby = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("ruby", children);
    return element;
};
const s = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("s", children);
    return element;
};
const samp = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("samp", children);
    return element;
};
const search = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("search", children);
    return element;
};
const section = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("section", children);
    return element;
};
const select = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("select", children);
    return element;
};
const slot = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("slot", children);
    return element;
};
const small = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("small", children);
    return element;
};
const source = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("source", children);
    return element;
};
const span = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("span", children);
    return element;
};
const strong = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("strong", children);
    return element;
};
const sub = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("sub", children);
    return element;
};
const summary = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("summary", children);
    return element;
};
const sup = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("sup", children);
    return element;
};
const table = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("table", children);
    return element;
};
const tbody = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("tbody", children);
    return element;
};
const td = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("td", children);
    return element;
};
const template = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("template", children);
    return element;
};
const textarea = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("textarea", children);
    return element;
};
const tfoot = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("tfoot", children);
    return element;
};
const th = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("th", children);
    return element;
};
const thead = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("thead", children);
    return element;
};
const time = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("time", children);
    return element;
};
const title = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("title", children);
    return element;
};
const tr = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("tr", children);
    return element;
};
const track = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("track", children);
    return element;
};
const u = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("u", children);
    return element;
};
const ul = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("ul", children);
    return element;
};
const $var = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("var", children);
    return element;
};
const video = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("video", children);
    return element;
};
const wbr = (...children)=>{
    let element = new (0, _element.FlHTMLElement)("wbr", children);
    return element;
};
const $a = (...children)=>{
    let element = new (0, _element.FlSVGElement)("a", children);
    return element;
};
const animate = (...children)=>{
    let element = new (0, _element.FlSVGElement)("animate", children);
    return element;
};
const animateMotion = (...children)=>{
    let element = new (0, _element.FlSVGElement)("animateMotion", children);
    return element;
};
const animateTransform = (...children)=>{
    let element = new (0, _element.FlSVGElement)("animateTransform", children);
    return element;
};
const circle = (...children)=>{
    let element = new (0, _element.FlSVGElement)("circle", children);
    return element;
};
const clipPath = (...children)=>{
    let element = new (0, _element.FlSVGElement)("clipPath", children);
    return element;
};
const defs = (...children)=>{
    let element = new (0, _element.FlSVGElement)("defs", children);
    return element;
};
const desc = (...children)=>{
    let element = new (0, _element.FlSVGElement)("desc", children);
    return element;
};
const ellipse = (...children)=>{
    let element = new (0, _element.FlSVGElement)("ellipse", children);
    return element;
};
const feBlend = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feBlend", children);
    return element;
};
const feColorMatrix = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feColorMatrix", children);
    return element;
};
const feComponentTransfer = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feComponentTransfer", children);
    return element;
};
const feComposite = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feComposite", children);
    return element;
};
const feConvolveMatrix = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feConvolveMatrix", children);
    return element;
};
const feDiffuseLighting = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feDiffuseLighting", children);
    return element;
};
const feDisplacementMap = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feDisplacementMap", children);
    return element;
};
const feDistantLight = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feDistantLight", children);
    return element;
};
const feDropShadow = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feDropShadow", children);
    return element;
};
const feFlood = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feFlood", children);
    return element;
};
const feFuncA = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feFuncA", children);
    return element;
};
const feFuncB = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feFuncB", children);
    return element;
};
const feFuncG = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feFuncG", children);
    return element;
};
const feFuncR = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feFuncR", children);
    return element;
};
const feGaussianBlur = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feGaussianBlur", children);
    return element;
};
const feImage = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feImage", children);
    return element;
};
const feMerge = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feMerge", children);
    return element;
};
const feMergeNode = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feMergeNode", children);
    return element;
};
const feMorphology = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feMorphology", children);
    return element;
};
const feOffset = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feOffset", children);
    return element;
};
const fePointLight = (...children)=>{
    let element = new (0, _element.FlSVGElement)("fePointLight", children);
    return element;
};
const feSpecularLighting = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feSpecularLighting", children);
    return element;
};
const feSpotLight = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feSpotLight", children);
    return element;
};
const feTile = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feTile", children);
    return element;
};
const feTurbulence = (...children)=>{
    let element = new (0, _element.FlSVGElement)("feTurbulence", children);
    return element;
};
const filter = (...children)=>{
    let element = new (0, _element.FlSVGElement)("filter", children);
    return element;
};
const foreignObject = (...children)=>{
    let element = new (0, _element.FlSVGElement)("foreignObject", children);
    return element;
};
const g = (...children)=>{
    let element = new (0, _element.FlSVGElement)("g", children);
    return element;
};
const image = (...children)=>{
    let element = new (0, _element.FlSVGElement)("image", children);
    return element;
};
const line = (...children)=>{
    let element = new (0, _element.FlSVGElement)("line", children);
    return element;
};
const linearGradient = (...children)=>{
    let element = new (0, _element.FlSVGElement)("linearGradient", children);
    return element;
};
const marker = (...children)=>{
    let element = new (0, _element.FlSVGElement)("marker", children);
    return element;
};
const mask = (...children)=>{
    let element = new (0, _element.FlSVGElement)("mask", children);
    return element;
};
const metadata = (...children)=>{
    let element = new (0, _element.FlSVGElement)("metadata", children);
    return element;
};
const mpath = (...children)=>{
    let element = new (0, _element.FlSVGElement)("mpath", children);
    return element;
};
const path = (...children)=>{
    let element = new (0, _element.FlSVGElement)("path", children);
    return element;
};
const pattern = (...children)=>{
    let element = new (0, _element.FlSVGElement)("pattern", children);
    return element;
};
const polygon = (...children)=>{
    let element = new (0, _element.FlSVGElement)("polygon", children);
    return element;
};
const polyline = (...children)=>{
    let element = new (0, _element.FlSVGElement)("polyline", children);
    return element;
};
const radialGradient = (...children)=>{
    let element = new (0, _element.FlSVGElement)("radialGradient", children);
    return element;
};
const rect = (...children)=>{
    let element = new (0, _element.FlSVGElement)("rect", children);
    return element;
};
const set = (...children)=>{
    let element = new (0, _element.FlSVGElement)("set", children);
    return element;
};
const stop = (...children)=>{
    let element = new (0, _element.FlSVGElement)("stop", children);
    return element;
};
const svg = (...children)=>{
    let element = new (0, _element.FlSVGElement)("svg", children);
    return element;
};
const $switch = (...children)=>{
    let element = new (0, _element.FlSVGElement)("switch", children);
    return element;
};
const symbol = (...children)=>{
    let element = new (0, _element.FlSVGElement)("symbol", children);
    return element;
};
const $text = (...children)=>{
    let element = new (0, _element.FlSVGElement)("text", children);
    return element;
};
const textPath = (...children)=>{
    let element = new (0, _element.FlSVGElement)("textPath", children);
    return element;
};
const $title = (...children)=>{
    let element = new (0, _element.FlSVGElement)("title", children);
    return element;
};
const tspan = (...children)=>{
    let element = new (0, _element.FlSVGElement)("tspan", children);
    return element;
};
const use = (...children)=>{
    let element = new (0, _element.FlSVGElement)("use", children);
    return element;
};
const view = (...children)=>{
    let element = new (0, _element.FlSVGElement)("view", children);
    return element;
};

},{"./element":"7jhPb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6lUEl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FlDocument", ()=>FlDocument);
var _element = require("./element");
class FlDocument {
    constructor(){
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
                Felin.registerFlDocumentRoot(selector, this);
                Felin.registerStateCalls(selector, stateCalls);
                Felin.run();
            } else throw Error("FlJsError: no element found with selector " + selector);
        }
    }
    selector(element) {
        let elementPath = [];
        let currentElement = element;
        let selector = `${this.rootSelector}>${this.rootElement.name}`;
        while(currentElement.id != this.rootElement.id){
            if (currentElement instanceof (0, _element.FlHTMLElement)) elementPath.push(currentElement);
            currentElement = currentElement.parentNode;
        }
        for (let pathElement of elementPath)selector += `>${pathElement.name}`;
        return selector;
    }
}

},{"./element":"7jhPb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"adjmJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "text", ()=>text);
parcelHelpers.export(exports, "state", ()=>state);
parcelHelpers.export(exports, "effect", ()=>effect);
parcelHelpers.export(exports, "computed", ()=>computed);
var _computed = require("./computed");
var _effect = require("./effect");
var _state = require("./state");
var _element = require("./element");
function text(text1, ...args) {
    return new (0, _element.FlTextNode)(text1, ...args);
}
function state(value) {
    return new (0, _state.FlState)(value);
}
function effect(fn) {
    return new (0, _effect.FlEffect)(fn);
}
function computed(fn, ...states) {
    return new (0, _computed.FlComputed)(fn, ...states);
}

},{"./computed":"38P5R","./effect":"j9yFt","./state":"1Yeju","./element":"7jhPb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"38P5R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FlComputed", ()=>FlComputed);
var _utils = require("./utils");
class FlComputed extends (0, _utils.ExtensibleFunction) {
    constructor(fn, ...states){
        super(()=>{
            this.value = this.fn(...this.states);
            return this.value;
        });
        this.fn = fn;
        this.states = states;
        this.value = fn(...states);
        this.id = crypto.randomUUID();
        Felin.registerComputedState(this);
    }
}

},{"./utils":"dsXzW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dsXzW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ExtensibleFunction", ()=>ExtensibleFunction);
class ExtensibleFunction extends Function {
    constructor(f){
        super();
        return Object.setPrototypeOf(f, new.target.prototype);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j9yFt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FlEffect", ()=>FlEffect);
var _utils = require("./utils");
class FlEffect extends (0, _utils.ExtensibleFunction) {
    constructor(fn){
        super((...args)=>{
            this.effect = fn;
            this.dependants = args;
            this.id = crypto.randomUUID();
            Felin.registerEffect(this);
        });
    }
}

},{"./utils":"dsXzW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Yeju":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FlState", ()=>FlState);
var _utils = require("./utils");
class FlState extends (0, _utils.ExtensibleFunction) {
    constructor(value, parent){
        super(()=>this.value);
        this.value = value;
        this.id = crypto.randomUUID();
        if (parent) this.parent = parent;
        if (typeof this.value == "object") {
            let handler = {
                get: (target, prop, reciever)=>{
                    if (Object.keys(this.value).includes(prop)) {
                        let value = this.value[prop];
                        if (typeof value == "object") return new Proxy(new FlState(value, this), handler);
                        else return new FlState(value, this);
                    } else return Reflect.get(target, prop, reciever);
                },
                set: (target, prop, value)=>{
                    if (Object.keys(this.value).includes(prop)) target.set((s)=>({
                            ...s,
                            [prop]: value
                        }));
                    else if (prop == "value") return Reflect.set(target, prop, value);
                }
            };
            return new Proxy(this, handler);
        }
    }
    set(fnOrState, child) {
        if (child) {
            for (let key of Object.keys(this.value))if (this[key].id == child.id) this.value[key] = child.value;
        }
        let newValue;
        if (typeof fnOrState === "function") //@ts-ignore
        newValue = fnOrState(this.value);
        else newValue = fnOrState;
        if (newValue != this.value) {
            this.value = newValue;
            if (this.parent) this.parent.set(child);
            else Felin.registerStateUpdate(this);
        }
    }
}

},{"./utils":"dsXzW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["8MMwS","38Lj6"], "38Lj6", "parcelRequire2daf")

//# sourceMappingURL=index.ec15aef2.js.map
