export class FlConditional {
    constructor(condition, trueBranch, falseBranch) {
        this.condition = condition;
        this.trueBranch = trueBranch;
        this.falseBranch = falseBranch;
    }
    element(parent) {
        if (parent) {
            this.parent = parent;
        }
        let result = this.condition();
        if (result) {
            return this.trueBranch.element();
        }
        else {
            return this.falseBranch.element();
        }
    }
}
export class FlLoop {
    constructor(state, iteration) {
        this.state = state;
        this.iteration = iteration;
    }
}
