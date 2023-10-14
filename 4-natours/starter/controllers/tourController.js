// const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//chaining middlewares:
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

// exports.checkID = (req, res, next, value) => {
//   console.log(`Tour id is: ${value}`);
//   if (+req.params.id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };
//what's important is that we should have return statement above because if we didn't have this return here then express would send this response back but it would still continue running the code in this funciton and so after sending the response it will then hit the next() function and it would move on to the next middleware and will then send another response to the client but that is really not allowed so remeber that we actually run into this error before where it told us that we were not allowed to send headers after the response had already been sent and so that's the kind of error that we would run int o if we didn't have this return statement above

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   // tours: tours
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params.id);

  // const tour = tours.find((el) => el.id === +req.params.id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};
//   );
// };

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    //204: no content
    status: 'success',
    data: null,
  });
};
