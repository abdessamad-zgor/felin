/*
 * let state = $state(0)
 *
 * let effect = state.effect(()=>{
 *
 * })
 *
 * let page = main([
 *  div([
 *    p("hello world"),
 *    button("hello").style({backgroundColor: 'blue'}).listener('click', (e)=>{
 *    state.l7wa()
 *    console.log('hello, from hsjs')
 *    })])
 *    .style({
 *    width: '100%',
 *    display: 'flex',
 *  }).class("hello"),
 *  div([
 *    p(state.value.toString())
 *  ])
 * ])
 */
