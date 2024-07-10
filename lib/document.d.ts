import { FlHTMLElement as FlElement } from "./felin";
export declare class FlDocument {
    window: Window;
    document: Document;
    rootSelector: string;
    rootElement: FlElement;
    constructor();
    render(selector: string, element: FlElement): void;
    selector(element: FlElement): string;
}
