import { 
  main,
  div,
  p,
  h1,
  button,
  nav,
  span,
  FDocument,
  $state,
  $text, 
  $effect,
  $computed,
  $if,
  $for,
  $link,
  $router,
  $route,
  $params
} from "felin";

let home = ()=>{
  let counter = $state({ count: { a: 1 } })

  //let msg = $computed((count) => {
  //  return `the count is ${count.count.a()}`
  //}, counter)


  //$effect(() => {
  //  console.log("msg is: ", msg())
  //}, counter)

  return div(
     "hello",
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
  let post = $state(fetch("http://jsonfakery.com/blogs/random").then(res=>res.json()))

  return div(
    h1(post.title),
    p(post.summary)
  )
}


let page = () => {
  return main(
    nav($link("/", "Home"), $link("/blog", "Blog")),
    $router(
      $route("/", home()),
      $route("/blog", blogs()),
      $route("/blog/:slug", blog_post())
    )
  )
}

let fdocument = new FDocument();
fdocument.render('#page', page())

