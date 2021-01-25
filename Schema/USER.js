const mongoose = require('mongoose');
const schema=mongoose.Schema({
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    moNumber: { type: Number, trim: true },
    password: { required: true, type:String, minlength: 6 },
    bio: { type: String },
    post: [{type:mongoose.Schema.Types.ObjectId,ref:"POST"}],
    followings: [ {type: mongoose.Schema.Types.ObjectId, ref:"USER"}],
    followers: [  {type: mongoose.Schema.Types.ObjectId, ref:"USER"}],
    savedPost: [ { type: mongoose.Schema.Types.ObjectId, ref:"POST" }],
    isBlockedByAdmin: { type: Boolean, default: false },
    interest:[{type:String}],
    registerOn:{type:Number,default:(new Date()).getTime()},
    isAdmin:{type:Boolean,default:false}
})

const USER=mongoose.model("USER",schema)
module.exports=USER