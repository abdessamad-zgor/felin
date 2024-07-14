# Felin 
___
>a flexible javascript library for making user interfaces
___
## what is it ?

Felin is a library for making user interfaces, it's focused on being flexible, with zero-dependencies.

## Getting started
install the package with your prefered package manager:
```
$ npm install felin
```
or include our cdn inside your html:
```
<script src="https://cdn.jsdelivr.net/npm/felin@latest/dist/felin.js" type="module"></script>
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

