import { ExtensibleFunction } from "./state";
export class HsEffect extends ExtensibleFunction {
    constructor(fn) {
        super((...args) => {
            this.effect = fn;
            this.dependants = args;
            this.id = crypto.randomUUID();
            HSJS.registerEffect(this);
        });
    }
}
