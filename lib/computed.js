import { ExtensibleFunction } from "./state";
export class FlexComputed extends ExtensibleFunction {
    constructor(fn, ...states) {
        super(() => {
            this.value = this.fn(...this.states);
            return this.value;
        });
        this.fn = fn;
        this.states = states;
        this.value = fn(...states);
        this.id = crypto.randomUUID();
        FLEX.registerComputedState(this);
    }
}
