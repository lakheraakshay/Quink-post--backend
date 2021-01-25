const mongoose = require('mongoose');
const chat=mongoose.Schema({
    text:{type:String,required:"enter some text"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"USER"},
    time:{type:Number,default:(new Date()).getTime()},
    userName:{type:String,required:"userName is required"}

})
const COMMUNITYCHAT=mongoose.model("COMMUNITYCHAT",chat)
module.exports=COMMUNITYCHAT