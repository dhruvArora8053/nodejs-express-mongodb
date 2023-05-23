const http = require("http");
//built-in http module gives us networking capabilites such as building an http server

const server = http.createServer((req, res) => {
  //   console.log(req);
  res.end("Hello from the server!");
  // this is the response that we are going to send back
});

//each time when a new request hits our server, above callback function will get called and the callback function will have access to the request object which holds all kind of stuff like the request url and the response object which gives us a lot of tools basically to send out the response

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
}); //port: sub-address on a certain host, local host: '127.0.0.1' is a default IP of local host address and local host simply means the current computer, so the computer that the program is currently running in
// so this one here will start listening for incoming requests

//so above first we made the server to send back the responses for request and then we started listening the requests at a particular address so when we now ran this program it started listening and when we used this address on chrome the event is generated and we got the response
