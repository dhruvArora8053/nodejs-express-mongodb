const hello = "Hello world";
console.log(hello); 

// //Node.js is really built around this concept of modules where all kind of additional functionality is stored in a module and in the case of reading files that is inside the FS module:
// const fs = require("fs"); //fs --> file system
// //so by using this module here we will get access to functions for reading data and writing data right to the file system so again calling this function here with this built-in fs module name will then return an object in which there are lots of functions that we can use and we storr that object right into the fs variable that we can then later use
// ///////////////////////////////////////////////////////////////////////////////
// //5-reading and writing files:-
 
// //reading file
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// //calling this funciton here will now read the data from the file and return it to us
// console.log(textIn);

// //write file
// const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written!");
