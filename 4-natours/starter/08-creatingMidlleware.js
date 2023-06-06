const fs = require('fs');
const express = require('express');
// const { networkInterfaces } = require('os');

const app = express();

app.use(express.json());
//FROM HERE:-
//so the use method is the one that we use in order to use middleware so this express.json here calling this json method basically returns a function and so that function is then added to the middleware stack and so similar to that we can create our own middleware function:
app.use((req, res, next) => {
  console.log('Hello from the middleware!');

  //we now will be needing to actually call the next function and if we didn't call next here well then the request/response cycle would really be stuck at this point we wouldn't be able to move on and we would never even send back a response to the client:
  next();

  //Note:- say we are defining this middleware after the getAllTours and then we are requesting the tours url then the get handler(which is also a middleware) will stop request/response model after sending the certain response then this response will not be executed
});

//let' do another one:
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//got to getAllTours

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    //from here
    requestedAt: req.requestTime,  //this came from the above middleware
    results: tours.length,
    data: {
      // tours: tours
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params.id);

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
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

// app.get('', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
