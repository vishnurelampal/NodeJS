const http = require("http");

const server = http.createServer(function (req, res) {
  if (req.url === "/getData") {
    res.end("Data fetched");
  }
  res.end("Hello World");
});
server.listen(8000);
