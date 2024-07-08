import { writeFile } from "fs";
import { join } from "path";

let htmlTags = [
  "a",
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
  "search",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
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

let svgTags = [
  "$a",
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "set",
  "stop",
  "svg",
  "$switch",
  "symbol",
  "$text",
  "textPath",
  "$title",
  "tspan",
  "use",
  "view"
]

function generateHSElementFucntion() {
  let __dirname = import.meta.dirname
  let filePath = join(__dirname, "elements.ts");
  let fileBuffer = `import {FlexHTMLElement, FlexSVGElement, FlexElement} from './element'\n`;
  let htmlTemplate = (tag) => {
    return `
export const ${tag} = (...children: FlexElement[]):FlexElement => {
\tlet element = new FlexHTMLElement("${tag == '$var' ? 'var' : tag}", children = children)
\treturn element;
}
`;
  }
  let htmlLength = htmlTags.length;
  for (let i = 0; i < htmlLength; i++) {
    fileBuffer += htmlTemplate(htmlTags[i]);
  }

  let svgTemplate = (tag) => {
    return `
export const ${tag} = (...children: FlexElement[]):FlexElement => {
\tlet element = new FlexSVGElement("${tag == '$a' ? 'a' : tag == '$title' ? 'title' : tag == '$text' ? 'text' : tag == '$switch' ? 'switch' : tag}", children = children)
\treturn element;
}
`
  }

  let svgLength = svgTags.length
  for (let i = 0; i < svgLength; i++) {
    fileBuffer += svgTemplate(svgTags[i]);
  }

  writeFile(filePath, fileBuffer, (err) => {
    if (err) console.log('failed to generate file.')
    console.log('Successfully generated file.')
  });
}

generateHSElementFucntion();
