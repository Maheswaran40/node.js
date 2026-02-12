const http = require("http");
const fs = require("fs");
// const path = require("path");
const url = require("url");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  if (req.method == "GET" && req.url == "/") {
    fs.readFile("./index.html", (err, data) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
      res.on("err", () => {
        console.log(err.message);
      });
    });
  }
  
  
  
  else if (req.method == "GET" && req.url.startsWith("/save")) {
    var parsedURL = url.parse(req.url);
    var qurey = querystring.parse(parsedURL.query);
    console.log(qurey);
    const name = qurey.name;
    const age = qurey.age;
    fs.appendFile("data.txt", `${name},${age}\n`, (err) => {
      if (err) throw err;
      console.log("TXT data added");
    });

    fs.appendFile("data.csv", `${name},${age}\n`, (err) => {
      if (err) throw err;
      console.log("TXT data added");
    });

    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <h2>Received Data</h2>
      Name: ${name} <br>
      Age: ${age}
      <br><br>
      <a href="/">Go Back</a>
    `);
  } else {
    res.writeHead(404);
    res.end("page not Found");
  }
});



server.listen(8080, () => {
  console.log("server is running in http://locahost:8080");
});
