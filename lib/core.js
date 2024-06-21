export class HsDOMUpdate {
    constructor(args) {
        this.priority = 1;
        this.args = args;
    }
    call(args) {
        let newValue = this.args.state();
        let nodeSelector = this.args.element.selector(this.args.hsDocument.rootId, this.args.hsDocument.rootElement);
        let domElement = this.args.hsDocument.document.querySelector(nodeSelector);
        this.args.hsDocument.document.replaceChild(domElement, this.args.element.element());
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
            let highestPriorityTask = Object.assign({}, (this.tasks[0]));
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
    run(documentMap, root) {
        while (true) {
            if (!this.stack.empty()) {
                let task = this.stack.pop();
                if (task instanceof HsDOMUpdate) {
                    task.call(task.args);
                }
                else if (task instanceof HsComputedState) {
                }
                else if (task instanceof HsEffectCall) {
                }
            }
        }
    }
}
export class HsRegistry {
    constructor() {
        this.runtime = new HsRuntime();
        this.documentRootsMap = {};
        this.documentStates = {};
    }
    register(task) {
        this.runtime.stack.push(task);
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
                this.runtime.stack.push(new HsDOMUpdate({ hsDocument, state: stateCall.state, element: stateCall.element }));
            }
        }
    }
    registerHsDocumentRoot(root, document) {
        if (!Object.keys(this.documentRootsMap).includes(root)) {
            this.documentRootsMap[root] = document;
        }
    }
    run(root) {
        this.runtime.run(this.documentRootsMap, root);
    }
}
export const HSJS = new HsRegistry();
