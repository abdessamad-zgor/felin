class ExtensibleFunction extends Function {
    constructor(f) {
        super();
        return Object.setPrototypeOf(f, new.target.prototype);
    }
}
export class HsState extends ExtensibleFunction {
    constructor(value) {
        super(() => { return this.value; });
        this.id = crypto.randomUUID();
        this.value = value;
    }
    set(value) {
        let newValue;
        if (typeof value === "function") {
            newValue = value(this.value);
        }
        else {
            newValue = value;
        }
        console.log(newValue, this.value);
        if (newValue != this.value) {
            this.value = newValue;
            HSJS.registerStateUpdate(this);
        }
    }
}
