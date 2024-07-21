import { ExtensibleFunction } from "./utils";
export class FlEffect extends ExtensibleFunction {
    constructor(fn) {
        super((...args) => {
            this.effect = fn;
            this.dependants = args;
            this._id = crypto.randomUUID();
            Felin.registerEffect(this);
        });
    }
}
