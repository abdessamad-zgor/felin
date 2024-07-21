import { FlTextNode, FlHTMLElement } from "./element";
export class FlDOMUpdate {
    constructor(args) {
        this.priority = 1;
        this.args = args;
    }
    call(args) {
        let newValue = this.args.state();
        let nodeSelector = this.args.flDocument.selector(this.args.element);
        let domElement = this.args.flDocument.document.querySelector(nodeSelector);
        if (domElement) {
            domElement.replaceWith(this.args.element.element());
        }
    }
}
export class FlComputedRefresh {
    constructor(args) {
        this.args = args;
        this.priority = 2;
    }
    call(args) {
        let newValue = this.args.fn(...this.args.states);
        this.args.value = newValue;
    }
}
export class FlEffectCall {
    constructor(args) {
        this.args = args;
        this.priority = 3;
    }
    call(args) {
        args.fn(...args.dependents);
    }
}
export class FlRouteChange {
    constructor(args) {
        this.args = args;
        this.priority = 4;
    }
    call(args) {
        args.router.matchRoute(args.path);
        let activeRoutes = args.router.active;
        let previousRoutes = args.router.previous;
        if (previousRoutes.length > 0) {
            for (let previousRoute of previousRoutes) {
                let routeParent = previousRoute.parentNode;
                routeParent.$children = routeParent.$children.filter(child => child.id != previousRoute.component({}).id);
            }
        }
        for (let activeRoute of activeRoutes) {
            let routeParent = activeRoute.parentNode;
            routeParent.$children.splice(activeRoute.index, 0, activeRoute.component({}));
        }
        let routesParentNodes = activeRoutes.map(route => route.parentNode);
        for (let targetNode of routesParentNodes) {
            args.document.rerenderElement(targetNode);
        }
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
export class FlStack {
    constructor() {
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
export class FlRuntime {
    constructor() {
        this.stack = new FlStack();
        this.running = true;
    }
    run() {
        if (!this.running)
            this.running = true;
        while (this.running) {
            if (this.stack.empty()) {
                this.running = false;
                break;
            }
            let task = this.stack.pop();
            if (task instanceof FlDOMUpdate) {
                task.call(task.args);
            }
            else if (task instanceof FlComputedRefresh) {
                task.call(task.args);
            }
            else if (task instanceof FlEffectCall) {
                task.call(task.args);
            }
            else if (task instanceof FlRouteChange) {
                task.call(task.args);
            }
        }
    }
    pushTask(task) {
        this.stack.push(task);
        if (!this.running)
            this.run();
    }
}
export class FlRegistry {
    constructor() {
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
        let root = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state._id == state._id));
        if (root) {
            let flDocument = this.documentRootsMap[root];
            let stateCalls = this.documentStates[root].filter(s => s.state._id == state._id);
            for (let stateCall of stateCalls) {
                let targetElement = stateCall.element;
                if (stateCall.element instanceof FlTextNode) {
                    targetElement = stateCall.element.parentNode;
                }
                let domUpdate = new FlDOMUpdate({ flDocument, state: stateCall.state, element: targetElement });
                this.runtime.pushTask(domUpdate);
            }
        }
        let computed = this.computed.find(e => e.states.some(s => s._id == state._id));
        if (computed) {
            let computedRefresh = new FlComputedRefresh(computed);
            this.runtime.pushTask(computedRefresh);
            let computedStateRoot = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state._id == computed._id));
            if (computedStateRoot) {
                let computedFlDocument = this.documentRootsMap[computedStateRoot];
                let computedStateCalls = this.documentStates[computedStateRoot].filter(s => s.state._id == computed._id);
                for (let computedStateCall of computedStateCalls) {
                    let computedTargetElement = computedStateCall.element;
                    if (computedStateCall.element instanceof FlTextNode) {
                        computedTargetElement = computedStateCall.element.parentNode;
                    }
                    let computedDomUpdate = new FlDOMUpdate({ flDocument: computedFlDocument, state: computedStateCall.state, element: computedTargetElement });
                    this.runtime.pushTask(computedDomUpdate);
                }
            }
        }
        let effect = this.effects.find(e => e.dependants.some(s => s._id == state._id));
        if (effect) {
            let effectCall = new FlEffectCall({ fn: effect.effect, dependents: effect.dependants });
            this.runtime.pushTask(effectCall);
        }
    }
    registerFlDocumentRoot(root, document) {
        if (!Object.keys(this.documentRootsMap).includes(root)) {
            this.documentRootsMap[root] = document;
        }
    }
    run() {
        this.runtime.run();
    }
    registerEffect(effect) {
        if (!this.effects.some(e => e._id == effect._id))
            this.effects.push(effect);
    }
    registerComputedState(state) {
        if (!this.computed.some(c => c._id == state._id))
            this.computed.push(state);
    }
    registerActiveRouter(rootSelector, router) {
        if (!Object.keys(this.router).includes(rootSelector))
            this.router[rootSelector] = router;
    }
    registerRouteChange(path, rootSelector) {
        let routeChangeTask = new FlRouteChange({ path, router: this.router[rootSelector], document: this.documentRootsMap[rootSelector] });
        this.runtime.pushTask(routeChangeTask);
    }
    getElementRootSelector(element, parent) {
        let rootSelector;
        let doesHaveChild = false;
        if (parent) {
            for (let child of parent.$children) {
                if (child.id == element.id) {
                    doesHaveChild = true;
                }
                else {
                    if (child instanceof FlHTMLElement) {
                        doesHaveChild = this.getElementRootSelector(element, child);
                    }
                }
            }
            return doesHaveChild;
        }
        else {
            for (let selector of Object.keys(this.documentRootsMap)) {
                let selectedDocument = this.documentRootsMap[selector];
                for (let child of selectedDocument.rootElement.$children) {
                    if (child.id == element.id) {
                        rootSelector = selector;
                    }
                    else {
                        if (child instanceof FlHTMLElement) {
                            if (this.getElementRootSelector(element, child) == true) {
                                rootSelector = selector;
                            }
                        }
                    }
                }
            }
            return rootSelector;
        }
    }
}
export const Felin = new FlRegistry();
