const express = require('express');
const morgan = require('morgan');

//FROM HERE:-
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//so we have our routers now each in one different file and we can say that each of them is one small sub-application so i.e. one user application and one tour application and then we put everything in our global app file by importing above routers and then mouting the routers on the two different routes 

const app = express();

//1.)MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//serving static files
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Mounting Routers:
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4.)START SERVER
module.exports= app;

