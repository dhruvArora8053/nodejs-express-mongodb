const fs = require("fs");
const http = require("http");
// const { json } = require("stream/consumers");
const url = require("url");

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } //from here
  else if (pathName === "/api") {
    // fs.readFile('./dev-data/data.json')
    //here '.' means: the current directory where we are running the node/script, and if we are running the node on the desktop then '.' will simply point to the desktop but it could create a confusion so to solve this:

    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data); //JSON.parse will convert the data into an array object
      console.log(productData);
    });
    //__dirname: current file location

    res.end("API");
  }

  //fallback
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });

    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
