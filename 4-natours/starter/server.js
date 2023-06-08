const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./12-betterFileStructure');

dotenv.config({ path: './config.env' });
//this command will read our variables from the file and save them into nodejs environment variables

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    // console.log('DB connection successful!');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

//Environment Variables:
console.log(app.get('env'));
//environment variables are global variables that are used to define the environment in which a node app is running, now this 'env' variable is actually set by express but node.js itself actually also set a lot of environment variables:
// console.log(process.env);
//node uses these environment varialbes internally

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const x = 23;
