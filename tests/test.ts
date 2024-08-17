import {createServer} from "http"
import {WebSocketServer} from "ws"

let testServer = createServer((req, res)=>{
  if(res.url=="/" && ){

  }
})

let wsServer = new WebSocketServer({server: testServer})

wsServer.on('connection', (ws)=>{

})
