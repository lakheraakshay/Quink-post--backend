const mongoose = require('mongoose');
const schema=mongoose.Schema({
    title:{type:String,required:"community title cant be empty"},
    description:{type:String},
    post:[{type:mongoose.Schema.Types.ObjectId,ref:"POST"}],
})

const COMMUNITY=mongoose.model("COMMUNITY",schema)
module.exports=COMMUNITY