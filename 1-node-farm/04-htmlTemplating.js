const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = (template, product) => {
  let output = template.replaceAll("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{IMAGE}", product.image);
  output = output.replaceAll("{PRICE}", product.price);
  output = output.replaceAll("{FROM}", product.from);
  output = output.replaceAll("{NUTRIENTS}", product.nutrients);
  output = output.replaceAll("{QUANTITY}", product.quantity);
  output = output.replaceAll("{DESCRIPTION}", product.description);
  output = output.replaceAll("{ID}", product.id);
  

  if (!product.organic)
    output = output.replaceAll("{NOT_ORGANIC}", "not-organic");

  return output;
};

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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
//again dataObj is an array at this point of time with five objects in it, so now what we have to do is to basically loop through this array and for each of them replace the placeholders in the template with the actual data from the current product: inside of server

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  //Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    // console.log(cardsHtml);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    // res.end(tempOverview);
    res.end(output);

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



