import { ExtensibleFunction } from "./utils";
export class FlState extends ExtensibleFunction {
    constructor(value, parent) {
        super(() => this.value);
        this.value = value;
        this._id = crypto.randomUUID();
        if (parent) {
            this.parent = parent;
        }
        if (typeof this.value == 'object' && this.value != undefined && this.value != null) {
            let handler = {
                get: (target, prop, reciever) => {
                    if (!Object.keys(target.value).includes(prop)) {
                        return Reflect.get(target, prop, reciever);
                    }
                    else {
                        let value = target.value[prop];
                        let childState = new FlState(value, { state: this, key: prop });
                        return childState;
                    }
                }
            };
            return new Proxy(this, handler);
        }
    }
    set(fnOrState, child) {
        let newValue = this.value;
        if (child) {
            for (let key of Object.keys(this.value)) {
                if (key == child.parent.key) {
                    newValue[key] = child.value;
                }
            }
        }
        if (fnOrState) {
            if (typeof fnOrState === "function") {
                //@ts-ignore
                newValue = fnOrState(this.value);
            }
            else {
                newValue = fnOrState;
            }
            this.value = newValue;
        }
        if (this.parent) {
            this.value = newValue;
            this.parent.state.set(undefined, this);
        }
        else {
            this.value = newValue;
            Felin.registerStateUpdate(this);
        }
    }
}
