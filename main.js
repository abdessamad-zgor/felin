import { main, div, p, button, HsDocument, span, state, text } from "./dist/hsjs.js";
/*
 * let state = $state(0)
 *
 * let effect = state.effect(()=>{
 *
 * })
 *
 * let page = main([
 *  div([
 *    p("hello world"+state()),
 *    button("Click")
 *      .style({backgroundColor: 'blue'})
 *      .listener('click', (e)=>state.set(s=>s++))
 *  ]).style({width: '100%', display: 'flex'}).class("hello"),
 * ])
 *
 * let hsDocument = new HSDocument()
 * hsDocument.render('query', page)
 */

let counter = state(0)
console.log(counter())
counter.set(1)
console.log(counter())
counter.set((s) => ++s)
console.log(counter())

let page = main([
  div([
    p("hello world").style({ border: '1px solid red', }),
    div([
      div([
        p("I am also here"),
        text("Count {}", counter),
        button("Click me").listen('click', () => counter.set(69))
      ])
    ])
  ]).style({ background: "red", color: "blue" })
])

let hsDocument = new HsDocument();
hsDocument.render('#page', page)

