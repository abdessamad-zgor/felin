import { ExtensibleFunction } from "./state";
export class FlexEffect extends ExtensibleFunction {
    constructor(fn) {
        super((...args) => {
            this.effect = fn;
            this.dependants = args;
            this.id = crypto.randomUUID();
            FLEX.registerEffect(this);
        });
    }
}
