import { main, div, p, button, HsDocument, span, state, text, effect, computed } from "./dist/hsjs.js";
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

let counter = state({count: 0})

let msg = computed((count)=>{
  return `the count is ${count()}`
}, counter.count)
console.log(msg)

let counterLogger = effect((counter)=>{
  console.log("msg is: ", msg())
})

counterLogger(counter.count)

let page = main([
  div([
    p("hello world").style({ border: '1px solid red', }),
    div([
      div([
        p("I am also here"),
        msg,
        button("Click me").listen('click', () => {
          counter.count.set(s => ++s)
          console.log(counter.value)
        })
      ])
    ])
  ]).style({ background: "red", color: "blue" })
])

let hsDocument = new HsDocument();
hsDocument.render('#page', page)

