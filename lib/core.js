import { FlexTextNode } from "./flex";
export class FlexDOMUpdate {
    constructor(args) {
        this.priority = 1;
        this.args = args;
    }
    call(args) {
        let newValue = this.args.state();
        console.log(newValue);
        let nodeSelector = this.args.hsDocument.selector(this.args.element);
        let domElement = this.args.hsDocument.document.querySelector(nodeSelector);
        if (domElement) {
            domElement.replaceWith(this.args.element.element());
        }
    }
}
export class FlexComputedRefresh {
    constructor(args) {
        this.args = args;
        this.priority = 2;
    }
    call(args) {
        let newValue = this.args.fn(...this.args.states);
        this.args.value = newValue;
    }
}
export class FlexEffectCall {
    constructor(args) {
        this.args = args;
        this.priority = 3;
    }
    call(args) {
        args.fn(...args.dependents);
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
export class FlexStack {
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
export class FlexRuntime {
    constructor() {
        this.stack = new FlexStack();
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
            if (task instanceof FlexDOMUpdate) {
                task.call(task.args);
            }
            else if (task instanceof FlexComputedRefresh) {
                task.call(task.args);
            }
            else if (task instanceof FlexEffectCall) {
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
export class FlexRegistry {
    constructor() {
        this.runtime = new FlexRuntime();
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
        let root = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state.id == state.id));
        if (root) {
            let hsDocument = this.documentRootsMap[root];
            let stateCalls = this.documentStates[root].filter(s => s.state.id == state.id);
            for (let stateCall of stateCalls) {
                let targetElement = stateCall.element;
                if (stateCall.element instanceof FlexTextNode) {
                    targetElement = stateCall.element.parentNode;
                }
                let domUpdate = new FlexDOMUpdate({ hsDocument, state: stateCall.state, element: targetElement });
                this.runtime.pushTask(domUpdate);
            }
        }
        let computed = this.computed.find(e => e.states.some(s => s.id == state.id));
        console.log(computed);
        if (computed) {
            let computedRefresh = new FlexComputedRefresh(computed);
            this.runtime.pushTask(computedRefresh);
            console.log(this.documentStates);
            let computedStateRoot = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state.id == computed.id));
            if (computedStateRoot) {
                let computedFlexDocument = this.documentRootsMap[computedStateRoot];
                let computedStateCalls = this.documentStates[computedStateRoot].filter(s => s.state.id == computed.id);
                for (let computedStateCall of computedStateCalls) {
                    let computedTargetElement = computedStateCall.element;
                    if (computedStateCall.element instanceof FlexTextNode) {
                        computedTargetElement = computedStateCall.element.parentNode;
                    }
                    let computedDomUpdate = new FlexDOMUpdate({ hsDocument: computedFlexDocument, state: computedStateCall.state, element: computedTargetElement });
                    this.runtime.pushTask(computedDomUpdate);
                }
            }
        }
        let effect = this.effects.find(e => e.dependants.some(s => s.id == state.id));
        if (effect) {
            let effectCall = new FlexEffectCall({ fn: effect.effect, dependents: effect.dependants });
            this.runtime.pushTask(effectCall);
        }
    }
    registerFlexDocumentRoot(root, document) {
        if (!Object.keys(this.documentRootsMap).includes(root)) {
            this.documentRootsMap[root] = document;
        }
    }
    run() {
        this.runtime.run();
    }
    registerEffect(effect) {
        if (!this.effects.some(e => e.id == effect.id))
            this.effects.push(effect);
    }
    registerComputedState(state) {
        if (!this.computed.some(c => c.id == state.id))
            this.computed.push(state);
    }
}
export const FLEX = new FlexRegistry();
