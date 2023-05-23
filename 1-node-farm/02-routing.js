const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  console.log(req.url);

  //implementing routing

  res.end("Hello from the server!");
});
// this callback function gets called for 2 times, first time for the url and the second time for favicon(browser automatically sends off the request for favicon)

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
