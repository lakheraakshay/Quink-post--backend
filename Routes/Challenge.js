const express = require('express');
const CHALLENGE = require('../Schema/Challenge');
const POST = require('../Schema/POST');
const USER = require('../Schema/USER');
const router=express.Router()

router.post("/",async(req,res)=>{
    const challenge=await new CHALLENGE(req.body)
    await challenge.save()
    res.status(200).send({success:true,challenge})
})
router.get("/all",async(req,res)=>{
 try{
    const challenge=await CHALLENGE.find().populate({path:"posts",select:"title"}).populate({path:"participants",select:"userName"})
    res.status(200).send({success:true,challenge})

 }catch(e){console.log("error while getting all  challenges".red,e)}

})


router.post("/participate",async(req,res)=>{
   try{
    const post=await new POST(req.body)
    await post.save()
    
    await USER.findByIdAndUpdate(req.body.author,{$push:{post:post._id}},{new:true})
   const challenge= await CHALLENGE.findByIdAndUpdate(req.body.challengeId,{$push:{posts:post._id,participants:post.author}},{new:true})
    res.status(200).send({success:true,challenge})
   }catch(e){console.log("error while participating----->>>".red,e)}

})

router.patch("/deleteParticipate",async(req,res)=>{
    const challenge=await CHALLENGE.findByIdAndUpdate(req.body.challengeId,{$pull:{participants:req.body.participantId}})
    res.status(200).send({success:true,challenge})
})
module.exports=router