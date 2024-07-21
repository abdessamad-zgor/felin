import { FlHTMLElement as FlElement } from "./element";
import { FlRouter } from "./router";
export declare class FlDocument {
    window: Window;
    document: Document;
    rootSelector: string;
    rootElement: FlElement;
    router?: FlRouter;
    constructor();
    render(selector: string, element: FlElement): void;
    selector(element: FlElement): string;
    rerenderElement(element: FlElement): void;
}
