import { readFileSync, readdirSync } from "fs";
import { createServer } from "http";
import { resolve } from "path";
import { build } from "vite";
import { WebSocketServer } from "ws";
const __dirname = import.meta.dirname;
let testServer = createServer((req, res) => {
    if (req.url == "/" && req.method == "GET") {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        build({
            root: __dirname
        }).then(output => console.log(output));
        let testPage = readFileSync(resolve(__dirname, "dist/index.html"));
        res.end(testPage);
    }
    else if (req.url == "/tests" && req.method == "GET") {
        let fileNames = readdirSync(__dirname);
        let testfiles = fileNames.filter(f => f.includes("test"));
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(testfiles));
    }
    else if (req.url && req.url.includes("assets") && req.method == "GET") {
        let script = readFileSync(resolve(__dirname, "dist" + req.url));
        res.setHeader('Content-Type', 'application/javascript');
        res.writeHead(200);
        res.end(script);
    }
});
let wsServer = new WebSocketServer({ server: testServer });
wsServer.on('connection', (ws) => {
});
testServer.listen(3123, () => {
});
