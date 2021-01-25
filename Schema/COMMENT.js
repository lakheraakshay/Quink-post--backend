const mongoose = require('mongoose');
const schema=mongoose.Schema({
    text:{type:String,require:true},
    time:{type:Number,default:(new Date()).getTime()},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"USER"},
    post:{type:mongoose.Schema.Types.ObjectId,ref:"POST"},
    likedBy:[{type:mongoose.Schema.Types.ObjectId,ref:"USER"}],
    reply:[{type:mongoose.Schema.Types.ObjectId,ref:"REPLY"}]

})

const COMMENT=mongoose.model("COMMENT",schema)
module.exports=COMMENT