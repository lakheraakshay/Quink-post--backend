const mongoose = require('mongoose');
const schema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String},
    createdOn: { type: Number, default: (new Date()).getTime() } ,
    image:{type:String},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"USER"},
    comment:[{type:mongoose.Schema.Types.ObjectId,ref:"COMMENT"}],
    likedBy:[{type:mongoose.Schema.Types.ObjectId,ref:"USER"}],
    tags:{type:Array,default:[]},
    type:{type:String,required:"post type is required article/blog/meme/poem"}
})
const POST=mongoose.model("POST",schema)
module.exports=POST