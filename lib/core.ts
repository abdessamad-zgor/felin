type HsDocument = {};

interface HsHTMLElement {
  child(e: HsHTMLElement): HsHTMLElement;
  children(es: HsHTMLElement[]): HsHTMLElement;
  class(cl: string): HsHTMLElement;
  listener(event: string, lf: (e: Event) => void): HsHTMLElement;
}
