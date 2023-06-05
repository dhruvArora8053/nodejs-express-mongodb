const fs = require('fs');
const express = require('express');
const { networkInterfaces } = require('os');

const app = express();

app.use(express.json());
//this express.json is a middleware and middleware is basically a function that can modify the incoming request data, it' called middleware because it stands between so in the middle of the request and the response so it's just a step that the request goes through while it's being processed

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      // tours: tours
      tours,
    },
  });
});

//FROM HERE↑:-
//.get: to get all the tours
//.post: to create a new tour

app.post('/api/v1/tours', (req, res) => {
  //req object holds all the data about the reques that was done
  //   console.log(req.body);
  //.body is the property that is gonna be available on the request because we used that middleware a couple of moments ago

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  //   console.log(newTour);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        //201: created
        status: 'success',
        data: {
          tour: newTour, 
        },
      });
    }
  );

//   res.send('Done');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
