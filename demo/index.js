const http = require("http");
const url = require("url");
const fs=require("fs")
const queryString=require("querystring")
const server = http.createServer((req, res) => {
  if (req.method == "GET" && req.url == "/") {
      fs.readFile("home.html",(err,data)=>{
        res.writeHead(200, { "content-type": "text/html" });
        res.end(data);
        res.on("err", () => {
        console.log(err.message);
      });
    })
  } 
  else if (req.url == "/about") {
       fs.readFile("about.html",(err,data)=>{
        res.writeHead(200, { "content-type": "text/html" });
        res.end(data);
        res.on("err", () => {
        console.log(err.message);
      });
    })
  }
 else if (req.method == "GET" && req.url == "/contact") {
      fs.readFile("contact.html",(err,data)=>{
        res.writeHead(200, { "content-type": "text/html" });
        res.end(data);
        res.on("err", () => {
        console.log(err.message);
      });
    })
  }


  else if(req.method == "GET" && req.url.startsWith("/save")){
    var ParsedUrl=url.parse(req.url)
    var queryData=queryString.parse(ParsedUrl.query)
    var name = queryData.name;
    var age = queryData.age;
    console.log("ParsedUrl",ParsedUrl);
    console.log("queryData",queryData.age);

    fs.appendFile("data.txt",queryData.name + "\n",(err)=>{
      if(err) throw err;
      console.log("file created successfully");
    })

  


      fs.appendFile("data.csv",`${name},${age}\n`,(err)=>{
      if(err) throw err;
      console.log("file created successfully");
    })
    
    res.writeHead(200,{"content-type":"text/html"})
    res.end("data added successfully")
  }


   else{
    res.writeHead(404,{ "content-type": "text/html" })
    res.end("<h1>Page not found</h1>")
}
 
});



server.listen(8080, () => {
  console.log("server is runnig in http://localhost:8080");
});
