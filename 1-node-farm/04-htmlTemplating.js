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


//series
const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
//here we are using the sync version at top of the script because this code going to execute only once, and we can put this data inside of a variable right away
//Note:- find which code is going to execute only once, and which going to execute over and over again(which could be blocking)

//2.
const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } //from here 1.
  else if (pathName === "/api") {
    // fs.readFile('./dev-data/data.json')
    //here '.' means: the current directory where we are running the node/script, and if we are running the node on the desktop then '.' will simply point to the desktop but it could create a confusion so to solve this:

    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   //__dirname: current file location
    //   const productData = JSON.parse(data); //JSON.parse will convert the data into an array object
    //   console.log(productData);

    //   res.writeHead(200, { "Content-type": "application/json" });
    //   res.end(data);
    //   // now the problem here is everytime we request the data, the above file will be read again and again so to solve this: we are using sync version at top of the code ↑
    // });
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
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
