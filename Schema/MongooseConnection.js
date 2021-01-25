const mongoose = require('mongoose');
const dotenv = require("dotenv").config()
const mongoUri=dotenv.parsed.mongoUri
const colors = require('colors');
mongoose.connect(mongoUri.toString(),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then((result) => {
    msg="hello"
    console.log("connected".yellow)
    // console.log(new Date(1614470399*1000))
}).catch((err) => {
    console.log("ERROR WHILE CONNECTION DATABASE ")
    console.log(">>>>>>>",err,"".red)
});



