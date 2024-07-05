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

let counter = state([1,3])
console.log(counter.length)

let page = main([
  div([
    p("hello world").style({ border: '1px solid red', }),
    div([
      div([
        p("I am also here"),
        text("Count {}", counter[counter.length-1]),
        button("Click me").listen('click', () => {
          counter.set(s => [...s, s[s.length-1]+1])
          console.log(counter.value)
          console.log(counter.length)
        })
      ])
    ])
  ]).style({ background: "red", color: "blue" })
])

let hsDocument = new HsDocument();
hsDocument.render('#page', page)

