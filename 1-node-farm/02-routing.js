const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  console.log(req.url);

  //implementing routing
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  }

  //fallback
  else {
    res.writeHead(404, {
      //sending headers
      //an http header is basically a piece of information about the response that we are sending back:
      "Content-type": "text/html", //now browser is expection some html
      "my-own-header": "hello-world",
    });
    //these headers and also the status code always need to be set before we send out the response 
    res.end("<h1>Page not found!</h1>");
  }
});
// this callback function gets called for 2 times, first time for the url and the second time for favicon(browser automatically sends off the request for favicon)

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
