// mongoose to connect with mongoDB
const mongoose = require("mongoose");
// const password= reerajput930

// const connectionStringtodb =
//   `mongodb+srv://reerajput930:reerajput930@nodeexpress-project.i1wimde.mongodb.net/toDoManager?retryWrites=true&w=majority`;


// using mongoose to connect to the database
// mongoose
//   .connect(connectionStringtodb)
//   .then(() => {
//     return console.log("connected to the db");
//   })
//   .catch((err) => {
//     console.log (err + "this is an eroor");
//   });


// .then to return promise and .catch for error handling


// doing this so that server will only after connecting to database
// in the above code ,server is listening before connecting to the database

const connectDB = (url)=>{
    // the .connect is returing the promise
    return mongoose.connect(url)
}

module.exports = {connectDB}