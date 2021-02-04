const { red } = require('colors');
const express = require('express');
const POST = require("../Schema/POST");
const USER = require('../Schema/USER');
const router = express.Router()
router.post("/upload", async (req, res) => {
    try {
        const data = req.body
        const post = await new POST(data)
        const checkSaved=await post.save()
        await USER.findByIdAndUpdate(req.body.author,{$push:{post:checkSaved._id}})
        res.status(200).send({ success: true,post:checkSaved })

    } catch (e) { console.log("error while uploading post--->>>>>".red, e) 
        res.status(200).send({success:false,error:e.errors.type.properties})    
}

})

router.delete("/:postId", async (req, res) => {
    try {
        const post = await POST.findByIdAndDelete(req.params.postId)
        res.status(200).send({ success: true, post, msg: "post deleted" })
    } catch (e) { console.log("error while deleting post --->>>>".red, e) }
})

router.get("/ofUser/:userId",async(req,res)=>{
    try{
        const user=await USER.findById(req.params.userId).populate({path:"post",select:"title body createdOn image comment likedBy"})
        res.status(200).send({success:true,posts:user.post})
    }catch(e){console.log("error while fetching posts of user===>>".red,e)}
})

router.get("/all",async(req,res)=>{
   try{
   
    const posts=await POST.find().populate({path:"likedBy",select:"userName"})
    res.status(200).send({success:true,posts})
   
}catch(e){console.log("error while fetching all posts-->>>",red,e)}
})



module.exports = router