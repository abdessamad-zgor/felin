import { writeFile } from "fs";
import { join } from "path";

let htmlTags = ["a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "search",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "$var",
  "video",
  "wbr",
]

function generateHSElementFucntion() {
  let __dirname = import.meta.dirname
  let filePath = join(__dirname, "elements.js");
  let fileBuffer = "import {HsHTMLElement,HsTextContent} from './core.js'\n\n";
  let template = (tag) => {
    return `
    /**\n
     * * @param {import('./types').HsElement[]| undefined} children \n
     * * @returns {HsHTMLElement}*/\n
    \n
    export const ${tag} = (children) => {\n
    \tlet element = new HsHTMLElement(name = "${tag}", children = children)\n
    \treturn element;\n
    }\n
    \n
    `;
  }
  let htmlLength = htmlTags.length;
  for (let i = 0; i < htmlLength; i++) {
    fileBuffer += template(htmlTags[i]);
  }

  fileBuffer += `
  /**\n
   * 
   */
  export const text = (text)=>{
    \tlet element = new HsTextContent(text);\n
    \treturn element;\n
  }\n
  `;

  writeFile(filePath, fileBuffer, (err) => {
    if (err) console.log('failed to generate file.')
    console.log('Successfully generated file.')
  });
}

generateHSElementFucntion();