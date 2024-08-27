import React, {useEffect, useState} from "react"
import {createRoot} from "react-dom/client"

let socket = new WebSocket("ws://localhost:3123")

function App(){
  let [testFiles, setTestFiles] = useState([])
  useEffect(()=>{
    (()=>{
      return fetch("http://localhost:3123/tests")
    })().then(result=>result.json()).then(tests=>setTestFiles(tests))
  }, [])

  return <div className="w-full min-h-screen bg-stone-100 flex">
    <div className="flex flex-col gap-1">

    </div>
    <div id="root"></div>
  </div>
}

let testAppRoot = document.getElementById("felin-test")
let app = createRoot(testAppRoot as HTMLElement)
app.render(<App/>)
