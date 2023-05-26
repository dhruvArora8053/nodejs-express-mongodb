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
