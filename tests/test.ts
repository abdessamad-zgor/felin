import { readFileSync, readdirSync } from "fs"
import {createServer} from "http"
import { resolve } from "path"
import { fileURLToPath } from "url"
import { build } from "vite"
import react from "@vitejs/plugin-react"
import {WebSocketServer} from "ws"

const __dirname = import.meta.dirname

let testServer = createServer((req, res)=>{
  if(req.url=="/" && req.method == "GET"){
    res.setHeader("Content-Type", "text/html")
    res.writeHead(200);
    build({
      root: __dirname,
      plugins: [react()]
    }).then(output=>console.log(output))
    let testPage = readFileSync(resolve(__dirname, "dist/index.html"))
    res.end(testPage)
  } else if(req.url=="/tests" && req.method == "GET"){
    let fileNames = readdirSync(__dirname);
    let testfiles = fileNames.filter(f=>f.includes("test"))
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200)
    res.end(JSON.stringify(testfiles)) 
  } else if(req.url && req.url.includes("assets") && req.method == "GET"){
    let script = readFileSync(resolve(__dirname, "dist"+req.url));
    res.setHeader('Content-Type', 'application/javascript');
    res.writeHead(200)
    res.end(script)
  }
})

let wsServer = new WebSocketServer({server: testServer})

wsServer.on('connection', (ws)=>{
  ws.on("message", (data)=>{
    let filename = data
    let testScript = readFileSync(resolve(__dirname, filename.toString()))
    ws.send(JSON.stringify({test: filename.toString(), script: testScript}))
  })
})

testServer.listen(3123, ()=>{

})
