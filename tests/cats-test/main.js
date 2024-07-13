import { main, div, p, button, FlDocument, span, state, text, effect, computed } from "felin";
/*
 * import {div, p, button, main} from "flex"
 * 
 *
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
  let counter = state({ count: {a: 1} })

  let msg = computed((count) => {
    return `the count is ${count.count.a()}`
  }, counter)


  effect((counter) => {
    console.log("msg is: ", msg())
  })(counter)

  return main(
    div(
      p("hello world"),
      div(
        div(
          p("I am also here"),
          msg,
          button("Click me").listen('click', () => {
            counter.count.a.set(s=>s+1)
            console.log(counter.value)
          })
        )
      )
    )
  )
}

let flDocument = new FlDocument();
flDocument.render('#page', page())

