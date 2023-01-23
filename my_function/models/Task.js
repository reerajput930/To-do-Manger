const mongoose = require('mongoose')

// Schema -  structure of a database
// model - Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc
//validation - putting limits and make sure  accuracy and quality of source data

const TaskSchema = new mongoose.Schema({
    name : {
        // validating the types of input
        type:String,
        // input is needed,empty input - not entertain
        required:true,
        // means - removeing the unwanted spacing
        trim:true,
        // length 
        maxlength:[20]
    }, 
    completed:{
        type:Boolean,
        default:false
    } 
})


// passing two parameter
// first one is the collectin name (ie task , name will be in smaller letter)
// second one will be the schema
module.exports = mongoose.model('Task',TaskSchema)