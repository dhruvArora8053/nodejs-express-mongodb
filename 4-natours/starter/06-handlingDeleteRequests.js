const fs = require('fs');
const express = require('express');
// const { networkInterfaces } = require('os');

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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params.id);
  //req.params is where all the parameters of all the variables are stored

  //getting the tour:
  //   if (+req.params.id > tours.length) {
  //     return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  //   }

  const tour = tours.find((el) => el.id === +req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

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

//we have two http methods to update data, we have put and patch and with put we expect that our application recieves the entire new updated object and with patch we only expect the properties that should actually be updated on the object:
app.patch('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
});

//FROM HERE:-
app.delete('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    //204: no content
    status: 'success',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
