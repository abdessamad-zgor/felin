# Writing views
In `felin` each HTML and SVG element have a corresponding function, here is an example
```
let page = div(
  h1("Hello world!"),
  br(),
  h2("from Felin!!")
)
```
Now, if I want to render `page` I would have to create an `FlDocument` and pass a valid CSS selector and `page` to it's `render`
method, here is an example:
```
let target = new FlDocument()
target.render("#root", page);
```
This will convert your `page` to native DOM elements and render them at your specified location.
