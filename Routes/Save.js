const express = require('express');
const USER = require('../Schema/USER');
const router=express.Router()

router.patch("/",async (req,res)=>{
  try{
    const userId=req.body.userId
    const postId=req.body.postId
    await USER.findByIdAndUpdate(userId,{$push:{savedPost:postId}})
    res.status(200).send({success:true,msg:"post saved"})
  }catch(e){console.log("error while saving post ->>>>".red,e)}
    
})
router.patch("/unsave",async (req,res)=>{
  try{
    const userId=req.body.userId
    const postId=req.body.postId
    await USER.findByIdAndUpdate(userId,{$pull:{savedPost:postId}})
    res.status(200).send({success:true,msg:"post unsaved"})
  }catch(e){console.log("error while saving post ->>>>".red,e)}
    
})
module.exports=router
