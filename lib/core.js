import { HsTextNode } from "./hsjs";
export class HsDOMUpdate {
    constructor(args) {
        this.priority = 1;
        this.args = args;
    }
    call(args) {
        let newValue = this.args.state();
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
}
export class HsComputedState {
    call(args) {
    }
}
export class HsEffectCall {
    call(args) {
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
export class HsStack {
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
        console.log(this.tasks.map(t => t.priority));
    }
    empty() {
        return this.tasks.length == 0;
    }
}
export class HsRuntime {
    constructor() {
        this.stack = new HsStack();
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
            console.log(task);
            if (task instanceof HsDOMUpdate) {
                console.log(task);
                task.call(task.args);
            }
            else if (task instanceof HsComputedState) {
            }
            else if (task instanceof HsEffectCall) {
            }
        }
    }
    pushTask(task) {
        this.stack.push(task);
        if (!this.running)
            this.run();
    }
}
export class HsRegistry {
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
    registerStateUpdate(state) {
        let root = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state.id == state.id));
        if (root) {
            let hsDocument = this.documentRootsMap[root];
            let stateCalls = this.documentStates[root].filter(s => s.state.id == state.id);
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
    registerHsDocumentRoot(root, document) {
        if (!Object.keys(this.documentRootsMap).includes(root)) {
            this.documentRootsMap[root] = document;
        }
    }
    run(root) {
        this.runtime.run();
    }
}
export const HSJS = new HsRegistry();
