import { main, div, p, button, HsDocument } from "./src/hsjs.js";
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

let page = main([
  div([
    p("hello world")
  ]).style({ background: "red", color: "blue" })
])

let hsDocument = new HsDocument();
hsDocument.render('page', page)

