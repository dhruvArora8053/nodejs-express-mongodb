const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//1.)MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
//so the use method is the one that we use in order to use middleware so this express.json here calling this json method basically returns a function and so that function is then added to the middleware stack and so similar to that we can create our own middleware function:
app.use((req, res, next) => {
  console.log('Hello from the middleware!');

  //we now will be needing to actually call the next function and if we didn't call next here well then the request/response cycle would really be stuck at this point we wouldn't be able to move on and we would never even send back a response to the client:
  next();

  //Note:- say we are defining this middleware after the getAllTours and then we are requesting the tours url then the get handler(which is also a middleware) will stop request/response model after sending the certain response then this response will not be executed
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2.)ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    //500: error
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    //500: error
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    //500: error
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    //500: error
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    //500: internal server error
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

//3.)ROUTES
//FROM HERE
const tourRouter = express.Router();
//we have created a new router and saved it into tourRouter(it is also a middleware)

const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
//here we want only root(/) and only /:id, it is because this tourRouter middleware only runs on "api/v1/tours" route anyway and so once we are in the router then we are already are at "api/v1/tour" route

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
//this tourRouter here is a real middleware and we want to use this middleware for this specific rout "/api/v1/tours" and so for it we used app.use and specify the middleware function which is the tourRouter and then we specify the route so the url for which we actually want to use the middleware so just like this we created basically a sub application

app.use('/api/v1/users', userRouter);
//and so just like before if there is now a request for /api/v1/users/id, the request will enter the middleware stack and when it hits this middware here then it will run the uerRouter becuase /api/v1/users route is matched and so then it enter the userRouter and above the root(/) in our sub-application and then the other one the entire url/:id

//4.)START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
