var U=Object.defineProperty;var n=(e,t)=>U(e,"name",{value:t,configurable:!0});var c=class{static{n(this,"FlexDOMUpdate")}constructor(t){this.priority=1,this.args=t}call(t){let l=this.args.state();console.log(l);let o=this.args.hsDocument.selector(this.args.element),m=this.args.hsDocument.document.querySelector(o);m&&m.replaceWith(this.args.element.element())}},f=class{static{n(this,"FlexComputedRefresh")}constructor(t){this.args=t,this.priority=2}call(t){let l=this.args.fn(...this.args.states);this.args.value=l}},w=class{static{n(this,"FlexEffectCall")}constructor(t){this.args=t,this.priority=3}call(t){t.fn(...t.dependents)}};function d(e){if(e.length<=1)return e;let t=e[0],l=[],o=[];for(let m=1;m<e.length;m++)e[m].priority<t.priority?l.push(e[m]):o.push(e[m]);return d(l).concat(t,d(o))}n(d,"quickSortByPriority");var S=class{constructor(){this.tasks=[]}static{n(this,"FlexStack")}pop(){if(this.tasks.length>0){let t=this.tasks[0];return this.tasks=this.tasks.slice(1),t}}push(t){this.tasks.push(t),this.tasks=d(this.tasks)}empty(){return this.tasks.length==0}},b=class{static{n(this,"FlexRuntime")}constructor(){this.stack=new S,this.running=!0}run(){for(this.running||(this.running=!0);this.running;){if(this.stack.empty()){this.running=!1;break}let t=this.stack.pop();(t instanceof c||t instanceof f||t instanceof w)&&t.call(t.args)}}pushTask(t){this.stack.push(t),this.running||this.run()}},T=class{static{n(this,"FlexRegistry")}constructor(){this.runtime=new b,this.documentRootsMap={},this.documentStates={},this.effects=[],this.computed=[]}register(t){this.runtime.pushTask(t)}registerStateCalls(t,l){this.documentStates[t]=l}registerStateUpdate(t){let l=Object.keys(this.documentStates).find(x=>this.documentStates[x].some(i=>i.state.id==t.id));if(l){let x=this.documentRootsMap[l],i=this.documentStates[l].filter(p=>p.state.id==t.id);for(let p of i){let E=p.element;p.element instanceof a&&(E=p.element.parentNode);let F=new c({hsDocument:x,state:p.state,element:E});this.runtime.pushTask(F)}}let o=this.computed.find(x=>x.states.some(i=>i.id==t.id));if(console.log(o),o){let x=new f(o);this.runtime.pushTask(x),console.log(this.documentStates);let i=Object.keys(this.documentStates).find(p=>this.documentStates[p].some(E=>E.state.id==o.id));if(i){let p=this.documentRootsMap[i],E=this.documentStates[i].filter(F=>F.state.id==o.id);for(let F of E){let L=F.element;F.element instanceof a&&(L=F.element.parentNode);let j=new c({hsDocument:p,state:F.state,element:L});this.runtime.pushTask(j)}}}let m=this.effects.find(x=>x.dependants.some(i=>i.id==t.id));if(m){let x=new w({fn:m.effect,dependents:m.dependants});this.runtime.pushTask(x)}}registerFlexDocumentRoot(t,l){Object.keys(this.documentRootsMap).includes(t)||(this.documentRootsMap[t]=l)}run(){this.runtime.run()}registerEffect(t){this.effects.some(l=>l.id==t.id)||this.effects.push(t)}registerComputedState(t){this.computed.some(l=>l.id==t.id)||this.computed.push(t)}},D=new T;function k(e){let t="";for(let l of Object.keys(e)){let o=l.split("").map((m,x)=>l.charCodeAt(x)>=65&&l.charCodeAt(x)<=90?"-"+m.toLowerCase():m);t+=o.join("")+": "+e[l]+";"}return console.log(t),t}n(k,"toCssString");var a=class{constructor(t,...l){this.stateCalls=[];if(this.id=crypto.randomUUID(),l.length>0)for(let o of l)o instanceof Function?this.stateCalls.push(o):t=t.replace("{}",o);this.text=t}static{n(this,"FlexTextNode")}element(t){t&&(this.parentNode=t);let l=this.text;for(let o of this.stateCalls)l=l.replace("{}",o());return document.createTextNode(l)}getStateCalls(t){let l=t||[],o=this.stateCalls.map(m=>({state:m,element:this}));return l=l.concat(...o),l}},s=class{constructor(t,l,o){this.stateCalls=[];if(this.id=crypto.randomUUID(),this.name=t,typeof l=="string")this.$children=[new a(l)];else if(Array.isArray(l)){this.$children=[];for(let m of l)m instanceof Function?(this.$children.push(new a("{}",m)),this.stateCalls.push(m)):this.$children.push(typeof m=="string"?new a(m):m)}else this.$children=[];this.$style=o||null,this.$listeners=new Map}static{n(this,"FlexHTMLElement")}style(t){return this.$style=t,this}children(t){if(t){for(let l of t)l instanceof Function?this.$children.push(new a("{}",l)):this.$children.push(l);return this}else return this.$children}getStateCalls(t){let l=t||[],o=this.stateCalls.map(m=>({state:m,element:this}));if(l=l.concat(...o),this.$children.length!=0)for(let m of this.$children)l=m.getStateCalls(l);return l}child(){return this}listen(t,l){return this.$listeners.has(t)||this.$listeners.set(t,l),this}element(t){t&&(this.parentNode=t);let l=document.createElement(this.name);for(let m of this.$listeners.entries())l.addEventListener(m[0],m[1]);this.$style&&(l.style.cssText=k(this.$style)),this.$classname&&l.classList.add(...this.$classname.split(" "));for(let m of Object.keys(this.$attributes))l.setAttribute(m,this.$attributes[m]);let o=this.children();if(o.length==0)return l;for(let m of o)l.appendChild(m.element(this));return l}class(t){this.$classname=t}attr(t,l){this.$attributes[t]=l}attrs(t){this.$attributes={...this.$attributes,...t}}},r=class{constructor(t,l,o){this.stateCalls=[];this.id=crypto.randomUUID(),this.name=t,this.$children=[];for(let m of l)m instanceof Function?(this.$children.push(new a("{}",m)),this.stateCalls.push(m)):this.$children.push(typeof m=="string"?new a(m):m);this.$style=o||null,this.$listeners=new Map}static{n(this,"FlexSVGElement")}style(t){return this.$style=t,this}children(t){if(t){for(let l of t)l instanceof Function?this.$children.push(new a("{}",l)):this.$children.push(l);return this}else return this.$children}getStateCalls(t){let l=t||[],o=this.stateCalls.map(m=>({state:m,element:this}));if(l=l.concat(...o),this.$children.length!=0)for(let m of this.$children)l=m.getStateCalls(l);return l}child(){return this}listen(t,l){return this.$listeners.has(t)||this.$listeners.set(t,l),this}element(t){t&&(this.parentNode=t);let l=document.createElementNS("http://www.w3.org/2000/svg",this.name);for(let m of this.$listeners.entries())l.addEventListener(m[0],m[1]);this.$style&&(l.style.cssText=k(this.$style)),this.$classname&&l.classList.add(...this.$classname.split(" "));for(let m of Object.keys(this.$attributes))l.setAttribute(m,this.$attributes[m]);let o=this.children();if(o.length==0)return l;for(let m of o)l.appendChild(m.element(this));return l}class(t){this.$classname=t}attr(t,l){this.$attributes[t]=l}attrs(t){this.$attributes={...this.$attributes,...t}}};var u=class extends Function{static{n(this,"ExtensibleFunction")}constructor(t){return super(),Object.setPrototypeOf(t,new.target.prototype)}},M=class extends u{static{n(this,"FlexString")}constructor(t,l){super(()=>this.value),this.id=crypto.randomUUID(),this.value=t,this.parent=l}set(t){let l;typeof t=="function"?l=t(this.value):l=t,l!=this.value&&(this.value=l,this.parent?.update(this),FLEX.registerStateUpdate(this))}},$=class extends u{static{n(this,"FlexNumber")}constructor(t,l){super(()=>this.value),this.id=crypto.randomUUID(),this.value=t,this.parent=l}set(t){let l;typeof t=="function"?l=t(this.value):l=t,l!=this.value&&(this.value=l,this.parent?.update(this),FLEX.registerStateUpdate(this))}},v=class extends u{static{n(this,"FlexMappedObject")}constructor(t,l){super(()=>this.value),this.id=crypto.randomUUID(),this.value=t,this.parent=l;for(let o of Object.keys(t))this[o]=h(t[o],this)}set(t){let l;typeof t=="function"?l=t(this.value):l=t,l!=this.value&&(this.value=l,this.parent?.update(this),FLEX.registerStateUpdate(this))}update(t){for(let l of Object.keys(this))Object.keys(this.value).includes(l)&&this[l].id==t.id&&(this.value[l]=t.value);this.parent&&this.parent.update(this)}},C=class extends u{static{n(this,"FlexArray")}constructor(t,l){super(()=>this.value),this.id=crypto.randomUUID(),this.value=t,this.parent=l;for(let o of Object.keys(t))this[o]=h(t[o],this);Object.defineProperty(this,"length",{get(){return this.value.length}})}set(t){let l;typeof t=="function"?l=t(this.value):l=t,l!=this.value&&(this.value=l,this.parent?.update(this),FLEX.registerStateUpdate(this))}update(t){for(let l of Object.keys(this))Object.keys(this.value).includes(l)&&this[l].id==t.id&&(this.value[l]=t.value);this.parent&&this.parent.update(this)}get length(){return this.value.length}};function h(e,t){let l=typeof e;if(l=="string")return new M(e,t);if(l=="number")return new $(e,t);if(Array.isArray(e))return new C(e,t);if(l=="object")return new v(e,t)}n(h,"createState");var Z=n((...e)=>new s("a",e=e),"a"),_=n((...e)=>new s("abbr",e=e),"abbr"),ee=n((...e)=>new s("address",e=e),"address"),te=n((...e)=>new s("area",e=e),"area"),ne=n((...e)=>new s("article",e=e),"article"),le=n((...e)=>new s("aside",e=e),"aside"),se=n((...e)=>new s("audio",e=e),"audio"),re=n((...e)=>new s("b",e=e),"b"),me=n((...e)=>new s("base",e=e),"base"),oe=n((...e)=>new s("bdi",e=e),"bdi"),xe=n((...e)=>new s("bdo",e=e),"bdo"),ae=n((...e)=>new s("blockquote",e=e),"blockquote"),ie=n((...e)=>new s("body",e=e),"body"),pe=n((...e)=>new s("br",e=e),"br"),ue=n((...e)=>new s("button",e=e),"button"),Fe=n((...e)=>new s("canvas",e=e),"canvas"),Ee=n((...e)=>new s("caption",e=e),"caption"),ce=n((...e)=>new s("cite",e=e),"cite"),fe=n((...e)=>new s("code",e=e),"code"),we=n((...e)=>new s("col",e=e),"col"),he=n((...e)=>new s("colgroup",e=e),"colgroup"),ge=n((...e)=>new s("data",e=e),"data"),ye=n((...e)=>new s("datalist",e=e),"datalist"),de=n((...e)=>new s("dd",e=e),"dd"),Se=n((...e)=>new s("del",e=e),"del"),be=n((...e)=>new s("details",e=e),"details"),Te=n((...e)=>new s("dfn",e=e),"dfn"),ke=n((...e)=>new s("dialog",e=e),"dialog"),Me=n((...e)=>new s("div",e=e),"div"),$e=n((...e)=>new s("dl",e=e),"dl"),ve=n((...e)=>new s("dt",e=e),"dt"),Ce=n((...e)=>new s("em",e=e),"em"),Le=n((...e)=>new s("embed",e=e),"embed"),De=n((...e)=>new s("fieldset",e=e),"fieldset"),Oe=n((...e)=>new s("figcaption",e=e),"figcaption"),je=n((...e)=>new s("figure",e=e),"figure"),Ue=n((...e)=>new s("footer",e=e),"footer"),Pe=n((...e)=>new s("form",e=e),"form"),Ae=n((...e)=>new s("h1",e=e),"h1"),He=n((...e)=>new s("h2",e=e),"h2"),Ne=n((...e)=>new s("h3",e=e),"h3"),Ge=n((...e)=>new s("h4",e=e),"h4"),Ve=n((...e)=>new s("h5",e=e),"h5"),Re=n((...e)=>new s("h6",e=e),"h6"),Xe=n((...e)=>new s("head",e=e),"head"),Ie=n((...e)=>new s("header",e=e),"header"),qe=n((...e)=>new s("hgroup",e=e),"hgroup"),Be=n((...e)=>new s("hr",e=e),"hr"),We=n((...e)=>new s("html",e=e),"html"),Je=n((...e)=>new s("i",e=e),"i"),ze=n((...e)=>new s("iframe",e=e),"iframe"),Ke=n((...e)=>new s("img",e=e),"img"),Qe=n((...e)=>new s("input",e=e),"input"),Ye=n((...e)=>new s("ins",e=e),"ins"),Ze=n((...e)=>new s("kbd",e=e),"kbd"),_e=n((...e)=>new s("label",e=e),"label"),et=n((...e)=>new s("legend",e=e),"legend"),tt=n((...e)=>new s("li",e=e),"li"),nt=n((...e)=>new s("link",e=e),"link"),lt=n((...e)=>new s("main",e=e),"main"),st=n((...e)=>new s("map",e=e),"map"),rt=n((...e)=>new s("mark",e=e),"mark"),mt=n((...e)=>new s("menu",e=e),"menu"),ot=n((...e)=>new s("meta",e=e),"meta"),xt=n((...e)=>new s("meter",e=e),"meter"),at=n((...e)=>new s("nav",e=e),"nav"),it=n((...e)=>new s("noscript",e=e),"noscript"),pt=n((...e)=>new s("object",e=e),"object"),ut=n((...e)=>new s("ol",e=e),"ol"),Ft=n((...e)=>new s("optgroup",e=e),"optgroup"),Et=n((...e)=>new s("option",e=e),"option"),ct=n((...e)=>new s("output",e=e),"output"),ft=n((...e)=>new s("p",e=e),"p"),wt=n((...e)=>new s("picture",e=e),"picture"),ht=n((...e)=>new s("pre",e=e),"pre"),gt=n((...e)=>new s("progress",e=e),"progress"),yt=n((...e)=>new s("q",e=e),"q"),dt=n((...e)=>new s("rp",e=e),"rp"),St=n((...e)=>new s("rt",e=e),"rt"),bt=n((...e)=>new s("ruby",e=e),"ruby"),Tt=n((...e)=>new s("s",e=e),"s"),kt=n((...e)=>new s("samp",e=e),"samp"),Mt=n((...e)=>new s("search",e=e),"search"),$t=n((...e)=>new s("section",e=e),"section"),vt=n((...e)=>new s("select",e=e),"select"),Ct=n((...e)=>new s("slot",e=e),"slot"),Lt=n((...e)=>new s("small",e=e),"small"),Dt=n((...e)=>new s("source",e=e),"source"),Ot=n((...e)=>new s("span",e=e),"span"),jt=n((...e)=>new s("strong",e=e),"strong"),Ut=n((...e)=>new s("sub",e=e),"sub"),Pt=n((...e)=>new s("summary",e=e),"summary"),At=n((...e)=>new s("sup",e=e),"sup"),Ht=n((...e)=>new s("table",e=e),"table"),Nt=n((...e)=>new s("tbody",e=e),"tbody"),Gt=n((...e)=>new s("td",e=e),"td"),Vt=n((...e)=>new s("template",e=e),"template"),Rt=n((...e)=>new s("textarea",e=e),"textarea"),Xt=n((...e)=>new s("tfoot",e=e),"tfoot"),It=n((...e)=>new s("th",e=e),"th"),qt=n((...e)=>new s("thead",e=e),"thead"),Bt=n((...e)=>new s("time",e=e),"time"),Wt=n((...e)=>new s("title",e=e),"title"),Jt=n((...e)=>new s("tr",e=e),"tr"),zt=n((...e)=>new s("track",e=e),"track"),Kt=n((...e)=>new s("u",e=e),"u"),Qt=n((...e)=>new s("ul",e=e),"ul"),Yt=n((...e)=>new s("var",e=e),"$var"),Zt=n((...e)=>new s("video",e=e),"video"),_t=n((...e)=>new s("wbr",e=e),"wbr"),en=n((...e)=>new r("a",e=e),"$a"),tn=n((...e)=>new r("animate",e=e),"animate"),nn=n((...e)=>new r("animateMotion",e=e),"animateMotion"),ln=n((...e)=>new r("animateTransform",e=e),"animateTransform"),sn=n((...e)=>new r("circle",e=e),"circle"),rn=n((...e)=>new r("clipPath",e=e),"clipPath"),mn=n((...e)=>new r("defs",e=e),"defs"),on=n((...e)=>new r("desc",e=e),"desc"),xn=n((...e)=>new r("ellipse",e=e),"ellipse"),an=n((...e)=>new r("feBlend",e=e),"feBlend"),pn=n((...e)=>new r("feColorMatrix",e=e),"feColorMatrix"),un=n((...e)=>new r("feComponentTransfer",e=e),"feComponentTransfer"),Fn=n((...e)=>new r("feComposite",e=e),"feComposite"),En=n((...e)=>new r("feConvolveMatrix",e=e),"feConvolveMatrix"),cn=n((...e)=>new r("feDiffuseLighting",e=e),"feDiffuseLighting"),fn=n((...e)=>new r("feDisplacementMap",e=e),"feDisplacementMap"),wn=n((...e)=>new r("feDistantLight",e=e),"feDistantLight"),hn=n((...e)=>new r("feDropShadow",e=e),"feDropShadow"),gn=n((...e)=>new r("feFlood",e=e),"feFlood"),yn=n((...e)=>new r("feFuncA",e=e),"feFuncA"),dn=n((...e)=>new r("feFuncB",e=e),"feFuncB"),Sn=n((...e)=>new r("feFuncG",e=e),"feFuncG"),bn=n((...e)=>new r("feFuncR",e=e),"feFuncR"),Tn=n((...e)=>new r("feGaussianBlur",e=e),"feGaussianBlur"),kn=n((...e)=>new r("feImage",e=e),"feImage"),Mn=n((...e)=>new r("feMerge",e=e),"feMerge"),$n=n((...e)=>new r("feMergeNode",e=e),"feMergeNode"),vn=n((...e)=>new r("feMorphology",e=e),"feMorphology"),Cn=n((...e)=>new r("feOffset",e=e),"feOffset"),Ln=n((...e)=>new r("fePointLight",e=e),"fePointLight"),Dn=n((...e)=>new r("feSpecularLighting",e=e),"feSpecularLighting"),On=n((...e)=>new r("feSpotLight",e=e),"feSpotLight"),jn=n((...e)=>new r("feTile",e=e),"feTile"),Un=n((...e)=>new r("feTurbulence",e=e),"feTurbulence"),Pn=n((...e)=>new r("filter",e=e),"filter"),An=n((...e)=>new r("foreignObject",e=e),"foreignObject"),Hn=n((...e)=>new r("g",e=e),"g"),Nn=n((...e)=>new r("image",e=e),"image"),Gn=n((...e)=>new r("line",e=e),"line"),Vn=n((...e)=>new r("linearGradient",e=e),"linearGradient"),Rn=n((...e)=>new r("marker",e=e),"marker"),Xn=n((...e)=>new r("mask",e=e),"mask"),In=n((...e)=>new r("metadata",e=e),"metadata"),qn=n((...e)=>new r("mpath",e=e),"mpath"),Bn=n((...e)=>new r("path",e=e),"path"),Wn=n((...e)=>new r("pattern",e=e),"pattern"),Jn=n((...e)=>new r("polygon",e=e),"polygon"),zn=n((...e)=>new r("polyline",e=e),"polyline"),Kn=n((...e)=>new r("radialGradient",e=e),"radialGradient"),Qn=n((...e)=>new r("rect",e=e),"rect"),Yn=n((...e)=>new r("set",e=e),"set"),Zn=n((...e)=>new r("stop",e=e),"stop"),_n=n((...e)=>new r("svg",e=e),"svg"),el=n((...e)=>new r("switch",e=e),"$switch"),tl=n((...e)=>new r("symbol",e=e),"symbol"),nl=n((...e)=>new r("text",e=e),"$text"),ll=n((...e)=>new r("textPath",e=e),"textPath"),sl=n((...e)=>new r("title",e=e),"$title"),rl=n((...e)=>new r("tspan",e=e),"tspan"),ml=n((...e)=>new r("use",e=e),"use"),ol=n((...e)=>new r("view",e=e),"view");var O=class{static{n(this,"FlexDocument")}constructor(){window&&(this.window=window,this.document=document)}render(t,l){if(this.document instanceof Document){let o=this.document.querySelector(t);if(o instanceof HTMLElement||l instanceof Node){let m=l.element();o.appendChild(m),this.rootSelector=t,this.rootElement=l;let x=l.getStateCalls();FLEX.registerFlexDocumentRoot(t,this),FLEX.registerStateCalls(t,x),FLEX.run()}else throw Error("FlexJsError: no element found with selector "+t)}}selector(t){let l=[],o=t,m=`${this.rootSelector}>${this.rootElement.name}`;for(;o.id!=this.rootElement.id;)o instanceof s&&l.push(o),o=o.parentNode;for(let x of l)m+=`>${x.name}`;return m}};var g=class extends u{static{n(this,"FlexComputed")}constructor(t,...l){super(()=>(this.value=this.fn(...this.states),this.value)),this.fn=t,this.states=l,this.value=t(...l),this.id=crypto.randomUUID(),FLEX.registerComputedState(this)}};var y=class extends u{static{n(this,"FlexEffect")}constructor(t){super((...l)=>{this.effect=t,this.dependants=l,this.id=crypto.randomUUID(),FLEX.registerEffect(this)})}};function vl(e,...t){return new a(e,...t)}n(vl,"text");function Cl(e){return h(e)}n(Cl,"state");function Ll(e){return new y(e)}n(Ll,"effect");function Dl(e,...t){return new g(e,...t)}n(Dl,"computed");window.FLEX=D;export{en as $a,el as $switch,nl as $text,sl as $title,Yt as $var,u as ExtensibleFunction,D as FLEX,C as FlexArray,f as FlexComputedRefresh,c as FlexDOMUpdate,O as FlexDocument,w as FlexEffectCall,s as FlexHTMLElement,v as FlexMappedObject,$ as FlexNumber,T as FlexRegistry,b as FlexRuntime,r as FlexSVGElement,S as FlexStack,M as FlexString,a as FlexTextNode,Z as a,_ as abbr,ee as address,tn as animate,nn as animateMotion,ln as animateTransform,te as area,ne as article,le as aside,se as audio,re as b,me as base,oe as bdi,xe as bdo,ae as blockquote,ie as body,pe as br,ue as button,Fe as canvas,Ee as caption,sn as circle,ce as cite,rn as clipPath,fe as code,we as col,he as colgroup,Dl as computed,h as createState,ge as data,ye as datalist,de as dd,mn as defs,Se as del,on as desc,be as details,Te as dfn,ke as dialog,Me as div,$e as dl,ve as dt,Ll as effect,xn as ellipse,Ce as em,Le as embed,an as feBlend,pn as feColorMatrix,un as feComponentTransfer,Fn as feComposite,En as feConvolveMatrix,cn as feDiffuseLighting,fn as feDisplacementMap,wn as feDistantLight,hn as feDropShadow,gn as feFlood,yn as feFuncA,dn as feFuncB,Sn as feFuncG,bn as feFuncR,Tn as feGaussianBlur,kn as feImage,Mn as feMerge,$n as feMergeNode,vn as feMorphology,Cn as feOffset,Ln as fePointLight,Dn as feSpecularLighting,On as feSpotLight,jn as feTile,Un as feTurbulence,De as fieldset,Oe as figcaption,je as figure,Pn as filter,Ue as footer,An as foreignObject,Pe as form,Hn as g,Ae as h1,He as h2,Ne as h3,Ge as h4,Ve as h5,Re as h6,Xe as head,Ie as header,qe as hgroup,Be as hr,We as html,Je as i,ze as iframe,Nn as image,Ke as img,Qe as input,Ye as ins,Ze as kbd,_e as label,et as legend,tt as li,Gn as line,Vn as linearGradient,nt as link,lt as main,st as map,rt as mark,Rn as marker,Xn as mask,mt as menu,ot as meta,In as metadata,xt as meter,qn as mpath,at as nav,it as noscript,pt as object,ut as ol,Ft as optgroup,Et as option,ct as output,ft as p,Bn as path,Wn as pattern,wt as picture,Jn as polygon,zn as polyline,ht as pre,gt as progress,yt as q,Kn as radialGradient,Qn as rect,dt as rp,St as rt,bt as ruby,Tt as s,kt as samp,Mt as search,$t as section,vt as select,Yn as set,Ct as slot,Lt as small,Dt as source,Ot as span,Cl as state,Zn as stop,jt as strong,Ut as sub,Pt as summary,At as sup,_n as svg,tl as symbol,Ht as table,Nt as tbody,Gt as td,Vt as template,vl as text,ll as textPath,Rt as textarea,Xt as tfoot,It as th,qt as thead,Bt as time,Wt as title,Jt as tr,zt as track,rl as tspan,Kt as u,Qt as ul,ml as use,Zt as video,ol as view,_t as wbr};