import { HsTextNode, HsState, HsTask } from "./core";
export function text(text, ...args) {
    if (args.length == 0) {
        return new HsTextNode(text);
    }
    else {
        let node = new HsTextNode();
        for (let arg of args) {
            if (arg instanceof HsState) {
                if (window && window.HSJS) {
                    HSJS.register(HsTask.updateDom(node, arg));
                }
                text = text.replace("{}", arg());
            }
            else {
                text = text.replace("{}", arg());
            }
        }
        node.text = text;
    }
}
export function state(value) {
    return new HsState(value);
}
