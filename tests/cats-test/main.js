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

let home = ()=>{
  let counter = $state({ count: { a: 1 } })

  let msg = $computed((count) => {
    return `the count is ${count.count.a()}`
  }, counter)


  $effect((counter) => {
    console.log("msg is: ", msg())
  })(counter)

  return div(
     msg,
     button("increase")
       .style({backgroundColor: 'blue'})
       .listener('click', (e)=>counter.count.a.set(s=>++s))
   )
}

let blogs = ()=>{
  let blogs = $state(fetch("http://jsonfakery.com/blogs").then(res=>res.json()))

  return div(
    $if(
      ()=>$length(blogs)<0,
      "no blogs",
      $for(blogs, (blog)=>div(
        h3(blog.title),
        small(blog.created_at)
      ))
    )
  )
}

let blog_post = ()=>{
  let {id} = $params()
  let post = $state(fetch("http://jsonfakery.com/blogs/random").then(res=>res.json()))

  return div(
    h1(post.title),
    p(post.summary)
  )
}


let page = () => {
  return main(
    nav($link("/", "Home"), $link("/blogs", "Blog")),
    $router(
      $route("/", home),
      $route("/blog", blogs),
      $route("/blogs/:slug", blog_post)
    )
  )
}

let flDocument = new FlDocument();
flDocument.render('#page', page())

