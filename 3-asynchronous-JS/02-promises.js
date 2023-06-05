const fs = require("fs");
const superagent = require("superagent");

//Promises
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        console.log("random dog image saved to file");
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
