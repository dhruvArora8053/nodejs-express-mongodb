const dotenv = require('dotenv');
const app = require('./12-betterFileStructure');

dotenv.config({ path: './config.env' });
//this command will read our variables from the file and save them into nodejs environment variables

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

