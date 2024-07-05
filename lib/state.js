class ExtensibleFunction extends Function {
    constructor(f) {
        super();
        return Object.setPrototypeOf(f, new.target.prototype);
    }
}
export class HsString extends ExtensibleFunction {
    constructor(value, parent) {
        super(() => { return this.value; });
        this.id = crypto.randomUUID();
        this.value = value;
        this.parent = parent;
    }
    set(value) {
        var _a;
        let newValue;
        if (typeof value === "function") {
            newValue = value(this.value);
        }
        else {
            newValue = value;
        }
        if (newValue != this.value) {
            this.value = newValue;
            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.update(this);
            HSJS.registerStateUpdate(this);
        }
    }
}
export class HsNumber extends ExtensibleFunction {
    constructor(value, parent) {
        super(() => { return this.value; });
        this.id = crypto.randomUUID();
        this.value = value;
        this.parent = parent;
    }
    set(value) {
        var _a;
        let newValue;
        if (typeof value === "function") {
            newValue = value(this.value);
        }
        else {
            newValue = value;
        }
        if (newValue != this.value) {
            this.value = newValue;
            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.update(this);
            HSJS.registerStateUpdate(this);
        }
    }
}
export class HsMappedObject extends ExtensibleFunction {
    constructor(value, parent) {
        super(() => { return this.value; });
        this.id = crypto.randomUUID();
        this.value = value;
        this.parent = parent;
        for (let key of Object.keys(value)) {
            this[key] = createState(value[key], this);
        }
    }
    set(value) {
        var _a;
        let newValue;
        if (typeof value === "function") {
            newValue = value(this.value);
        }
        else {
            newValue = value;
        }
        if (newValue != this.value) {
            this.value = newValue;
            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.update(this);
            HSJS.registerStateUpdate(this);
        }
    }
    update(child) {
        for (let key of Object.keys(this)) {
            if (Object.keys(this.value).includes(key) && this[key].id == child.id) {
                this.value[key] = child.value;
            }
        }
        if (this.parent) {
            this.parent.update(this);
        }
    }
}
export class HsArray extends ExtensibleFunction {
    constructor(value, parent) {
        super(() => { return this.value; });
        this.id = crypto.randomUUID();
        this.value = value;
        this.parent = parent;
        for (let key of Object.keys(value)) {
            this[key] = createState(value[key], this);
        }
        Object.defineProperty(this, 'length', {
            get() {
                return this.value.length;
            }
        });
    }
    set(value) {
        var _a;
        let newValue;
        if (typeof value === "function") {
            newValue = value(this.value);
        }
        else {
            newValue = value;
        }
        if (newValue != this.value) {
            this.value = newValue;
            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.update(this);
            HSJS.registerStateUpdate(this);
        }
    }
    update(child) {
        for (let key of Object.keys(this)) {
            if (Object.keys(this.value).includes(key) && this[key].id == child.id) {
                this.value[key] = child.value;
            }
        }
        if (this.parent) {
            this.parent.update(this);
        }
    }
    get length() {
        let length = this.value.length;
        return length;
    }
}
export function createState(value, parent) {
    let typeofValue = typeof value;
    if (typeofValue == "string") {
        return new HsString(value, parent);
    }
    else if (typeofValue == "number") {
        return new HsNumber(value, parent);
    }
    else if (Array.isArray(value)) {
        return new HsArray(value, parent);
    }
    else if (typeofValue == "object") {
        return new HsMappedObject(value, parent);
    }
}
