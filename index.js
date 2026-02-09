const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Home page</h1>");
    }

    else if (req.url === "/movie") {

        const filePath = "C:\\movie\\Vada chennai uncut (2018)@theaterlovermovies.mkv";

        const readStream = fs.createReadStream(filePath);

        res.writeHead(200, { "Content-Type": "video/mp4","Content-Length": "chunkSize" });

        readStream.pipe(res);
        readStream.on("data", c => console.log("Node chunk:", c.length));

        readStream.on("error", (err) => {
            res.writeHead(500);
            res.end("Video not found");
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

   

// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const server = http.createServer((req, res) => {
//     if (req.url === "/") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("home page");
//     } 
//     else if (req.url === "/about") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("about");
//     } 
//     else if (req.url === "/contact") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("contact");
//     } 
//     else {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("Page not found");
//     }
// });

// server.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });

