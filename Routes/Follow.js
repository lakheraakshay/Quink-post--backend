const express = require('express');
const router=express.Router()
const midFollow=require("../Middlewear/Follow");
const USER = require('../Schema/USER');
const followToUser=midFollow.Follow

router.post("/",followToUser,(req,res)=>{
res.status(200).send({success:true,msg:"done"})
})

router.post("/unfollow",async (req,res)=>{
   try{
    const followingToId=req.body.followingToId
    const followerId=req.body.followerId
    const follower=await USER.findByIdAndUpdate(followerId,{$pull:{followings:followingToId}},{new:true})
    const followingTo=await USER.findByIdAndUpdate(followingToId,{$pull:{followers:followerId}},{new:true})
        res.status(200).send({success:true,follower,followingTo})
   }catch(e){console.log("error while unfollowing...>>>>>>".red,e)}

})

router.get("/:userId/followers",async(req,res)=>{
try{
    const followers=await USER.findById(req.params.userId).populate({path:"followers",select:"userName"})
    if(!followers.followers.length){ res.status(404).send({success:true,msg:"no followers yet"}) }
    res.status(200).send({success:true,followers:followers.followers})
  
}catch(e){console.log("error while fetching follwers.....".red,e)}
})

router.get("/:userId/followings",async (req,res)=>{
    try{
        const followings=await USER.findById (req.params.userId).populate({path:"followings",select:"userName"})
            if(!followings.followings.length){res.status(404).send({success:true,msg:"no followings yet"})}
            res.status(200).send({success:true,followings:followings.followings})
        }catch(e){console.log("error while fetching followings--->>".red,e)}
})
module.exports=router