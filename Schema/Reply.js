const mongoose = require('mongoose');
const schema=mongoose.Schema({
    text:{type:String,required:"text can not be empty"},
    author:{type:mongoose.Schema.Types.ObjectId,required:" author is required ",ref:"USER"},
    comment:{type:mongoose.Schema.Types.ObjectId,required:"comment id is required ",ref:"COMMENT"},
    time:{type:Date,default: (new Date()).getTime()},
    likedBy:[{type:mongoose.Schema.Types.ObjectId,ref:"USER"}]

})
const REPLY=mongoose.model("REPLY",schema)
module.exports=REPLY