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
  "_var",
  "video",
  "wbr",
]

let svgTags = [
  "_a",
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
  "_switch",
  "symbol",
  "_text",
  "textPath",
  "_title",
  "tspan",
  "use",
  "view"
]

function generateFElementFucntions() {
  let __dirname = import.meta.dirname
  let htmlFilePath = join(__dirname, "html.ts");
  let svgFilePath = join(__dirname, "svg.ts");
  let htmlFileBuffer = `import {FHTMLElement, FSVGElement, FElement} from '../elements/element'\n`;
  let svgFileBuffer = `import {FHTMLElement, FSVGElement, FElement} from '../elements/element'\n`;
  let htmlTemplate = (tag) => {
    return `
export const ${tag} = (...children: FElement[]):FElement => {
\tlet element = new FHTMLElement("${tag == '_var' ? 'var' : tag}", children = children)
\treturn element;
}
`;
  }
  let htmlLength = htmlTags.length;
  for (let i = 0; i < htmlLength; i++) {
    htmlFileBuffer += htmlTemplate(htmlTags[i]);
  }

  let svgTemplate = (tag) => {
    return `
export const ${tag} = (...children: FElement[]):FElement => {
\tlet element = new FSVGElement("${tag == '_a' ? 'a' : tag == '_title' ? 'title' : tag == '_text' ? 'text' : tag == '_switch' ? 'switch' : tag}", children = children)
\treturn element;
}
`
  }

  let svgLength = svgTags.length
  for (let i = 0; i < svgLength; i++) {
    svgFileBuffer += svgTemplate(svgTags[i]);
  }

  writeFile(htmlFilePath, htmlFileBuffer, (err) => {
    if (err) console.log('failed to generate file.')
    console.log('Successfully generated file.')
  });

  writeFile(svgFilePath, svgFileBuffer, (err) => {
    if (err) console.log('failed to generate file.')
    console.log('Successfully generated file.')
  });
}

generateFElementFucntions();
