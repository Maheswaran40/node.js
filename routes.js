const http=require("http")
const url=require("url")

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        res.writeHead(200,{"content-typeL":"text/html"})
        res.end("<h1>Home page</h1>")
    }
    else  if(req.url=="/about"){
        res.writeHead(200,{"content-typeL":"text/html"})
        res.end("<h1>about page</h1>")
    }
})

server.listen(3000,()=>{
    console.log("server is running in http://localhost:3000");
    
})