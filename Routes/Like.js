const express = require('express');
const POST = require('../Schema/SPost');
const router=express.Router()




router.patch("/",async (req,res)=>{
    try{
  
  const post=await POST.findByIdAndUpdate(req.body.postId,{$push:{likedBy:req.body.userId}})
        res.status(200).send({success:true})
    }catch(e){console.log("error while liking post--->>>>".red,e)}
  })

router.patch("/dislike",async (req,res)=>{
    try{
        
        const postId=req.body.postId
        const userId=req.body.userId
        const post=await POST.findByIdAndUpdate(postId,{$pull:{likedBy:userId}})
        res.status(200).send({success:true,post})
       }catch(e){console.log("error while liking post -->>>".red,e)}

})

module.exports=router