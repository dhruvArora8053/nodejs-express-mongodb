const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);

      console.log(res.body.message);

      fs.writeFile("dog-img1.txt", res.body.message, (err) => {
        console.log("Random dog image saved to file!");
      });
    });
});
// It is the simple example to show you how easy it is to end up with call backs inside of callbacks inside of callbacks and that's ofcourse because we already know that in nodejs we should always use asynchronous code, right. We did end up using callbacks inside of callbacks inside of callbacks and sometimes it can go even deeper ofcourse than what we have here you ofcourse like have 10 levels inside of each other, now all these callbacks they make our code look a bit messy, it makes it difficult to understand and also in general, hard to maintain again maybe not at this level with just three callbacks inside of each other but if we had it even deeper nested it could quickly become a nightmare to maintain code like this and that's why this pattern has been called call back hell.
