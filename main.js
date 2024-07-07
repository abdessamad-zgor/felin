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


let page = () => {
  let counter = state({ count: 0 })

  let msg = computed((count) => {
    return `the count is ${count()}`
  }, counter.count)

  console.log(msg)

  effect((counter) => {
    console.log("msg is: ", msg())
  })(counter.count)

  return main(
    div(
      p("hello world"),
      div(
        div(
          p("I am also here"),
          msg,
          button("Click me").listen('click', () => {
            counter.count.set(s => ++s)
            console.log(counter.value)
          })
        )
      )
    )
  )
}

let hsDocument = new HsDocument();
hsDocument.render('#page', page())

