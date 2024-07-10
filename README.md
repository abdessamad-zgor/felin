# Felin - a flexible javascript library for making user interfaces

Felin is a library which has no setup, build or migration costs, it's build to work seamlessly with vanilla javascript
when using `felin` you don't think wether you should choose between simplicity or efficiency, you get both.

## Getting started
install the package with your prefered package manager:
```
$ npm install felin
```
or include our cdn inside your html:
```
<script src="https://cdn.cloudflare.com/felin.js" type="module"></script>
```

create an `app.js` file and start using felin:
```
import {h1, FlDocument} from "felin"

let hello = h1("hello world");

let flDocument = new FlDocument();
flDocument.render("#root", hello);
```
then include you file in your html:
```
<script src="app.js" type="module"></script>
```

or you could start using derictly inside a script tag
```
<script type="module">
    import {h1, FlDocument} from "felin"

    let hello = h1("hello world");

    let flDocument = new FlDocument();
    flDocument.render("#root", hello);
</script>
```

## Documentation

### HTML elements
in `felin` HTML element are functions named correspondingly and accept other HTML elements as children, the same applies for SVG 
elements, 
