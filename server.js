const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // HOME
  if (req.method === "GET" && parsedUrl.pathname === "/") {
    fs.readFile("./pages/home.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  // ABOUT
  else if (req.method === "GET" && parsedUrl.pathname === "/about") {
    fs.readFile("./pages/about.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  // CONTACT PAGE
  else if (req.method === "GET" && parsedUrl.pathname === "/contact") {
    fs.readFile("./pages/contact.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  // CONTACT FORM SUBMIT
  else if (req.method === "POST" && parsedUrl.pathname === "/contact") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const name = body.split("=")[1]; // name=value [0]=name [1]=value

      fs.appendFile("data.txt", decodeURIComponent(name) + "\n", () => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h2>Data saved successfully!</h2><a href='/'>Go Home</a>");
      });
    });
  }

  // 404
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
