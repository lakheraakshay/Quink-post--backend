const express = require('express');
const COMMENT = require('../Schema/COMMENT');
const REPLY = require('../Schema/Reply');
const router=express.Router()

router.post("/",async (req,res)=>{
    const reply=await new REPLY(req.body)
    reply.save()
   const  comment =await COMMENT.findByIdAndUpdate(reply.comment,{$push:{reply:reply._id}})
   console.log(comment)
    res.status(200).send({success:true,msg:comment.reply})

})


router.get("/all/inComment",async(req,res)=>{
console.log('i am here'.green)
    const comment=await COMMENT.findById(req.body.commentId).populate({path:"reply",select:"text time",populate:{path:"author",select:"userName"}})
    res.status(200).send({success:true,reply:comment.reply})
})



module.exports=router