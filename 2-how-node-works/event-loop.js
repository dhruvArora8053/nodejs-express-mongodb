const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 1;
//now we are gonna have only one thread in our thread pool   

setTimeout(() => {
  console.log("Timer 1 finished");
}, 0);

setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("-----------------------");

  setTimeout(() => {
    console.log("Timer 2 finished");
  }, 0);
  setTimeout(() => {
    console.log("Timer 3 finished");
  }, 3000);

  setImmediate(() => console.log("Immediate 2 finished"));
  //so why does setImmediate actually appeared before setTimeout?
  //it is because the event loop actually waits for stuff to happen in the poll phase so in that phase where I/O callbacks are handled so when this queue of callbacks is empty which is the case in our example here so we have no I/O callbacks, all we have these timers well then the event loop will wait in this phase until there is an expired timer but if we scheduled a callback using setImmediate then that callback will actually be executed right away after the polling phase and even before expired timers and in this case time expires after 0 seconds but again the event loop actually waits so it pauses in the polling phase and so that setImmediate callback is actually executed first

  process.nextTick(() => console.log("Process.nextTick"));
  //now the Process.nextTick got executed first then setImmediate and that is because nextTick is a part of the microtasks queue which get executed after each phase so not just after one entire tick

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  //be default the size of the thread pool is four so there are four threads doing the work at the same time and so that's why these four password encryptions take approximately the same time 
});

console.log("Hello from the top level code");
