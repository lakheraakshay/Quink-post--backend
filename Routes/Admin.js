const express = require('express');
const ADMINPOST = require('../Schema/Admin');

const router=express.Router()

router.post("/",async(req,res)=>{
    const adminPost=await new ADMINPOST(req.body)
    await adminPost.save()
    res.status(200).send({success:true,adminPost})
})
router.get("/",async(req,res)=>{
    const adminPost=await ADMINPOST.find()
    res.status(200).send({success:true,adminPost})
})

module.exports=router