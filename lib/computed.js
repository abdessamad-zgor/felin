import { ExtensibleFunction } from "./utils";
export class FlComputed extends ExtensibleFunction {
    constructor(fn, ...states) {
        super(() => {
            this.value = this.fn(...this.states);
            return this.value;
        });
        this.fn = fn;
        this.states = states;
        this.value = fn(...states);
        this._id = crypto.randomUUID();
        Felin.registerComputedState(this);
    }
}
