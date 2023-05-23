const hello = "Hello world";
console.log(hello);

//Node.js is really built around this concept of modules where all kind of additional functionality is stored in a module and in the case of reading files that is inside the FS module:
const fs = require("fs"); //fs --> file system
//so by using this module here we will get access to functions for reading data and writing data right to the file system so again calling this function here with this built-in fs module name will then return an object in which there are lots of functions that we can use and we store that object right into the fs variable that we can then later use
///////////////////////////////////////////////////////////////////////////////
//5-reading and writing files:-
//BLOCKING, SYNCHRONOUS WAY:

//reading file
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
//calling this funciton here will now read the data from the file and return it to us
console.log(textIn);

//writing file
const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File Written!");

///////////////////////////////////////////////////////////////////////////////
//7-reading and writing files:-
//NON-BLOCKING ASYNCHRONOUS WAY:

//reading file
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});
//as soons as the readFile fucntion is run, it will start reading ./txt/start.txt file in the background without blocking the rest of the code execution:
console.log("Will read file");
//here as you see 'Will read file' got printed before 'read-this'

//dependent code:
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written 🙂");
      });
    });
  });
});
