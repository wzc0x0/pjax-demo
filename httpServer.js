const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const serverHandler = (request, response) => {
  const isPJax = "x-pjax" in request.headers;
  const { pathname } = url.parse(request.url);
  const filePath = isPJax ? path.join("./pages", pathname) : "./index.html";

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      response.end();
      return;
    }
    response.end(data);
  });
};

http.createServer(serverHandler).listen(8080);
console.log("http://localhost:8080");
