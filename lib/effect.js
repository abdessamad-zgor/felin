import { ExtensibleFunction } from "./state";
export class FlEffect extends ExtensibleFunction {
    constructor(fn) {
        super((...args) => {
            this.effect = fn;
            this.dependants = args;
            this.id = crypto.randomUUID();
            Fl.registerEffect(this);
        });
    }
}
