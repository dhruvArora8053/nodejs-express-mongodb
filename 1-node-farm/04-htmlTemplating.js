const fs = require("fs");
const http = require("http");
const url = require("url");

//from here
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  //Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(tempOverview);

    //Product Page
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");

    // API
  } else if (pathName === "/api") {
    res.end(data);

    // Not Found
  } else {
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
