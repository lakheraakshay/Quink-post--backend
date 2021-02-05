const express = require('express');
const COMMENT = require('../Schema/COMMENT.js');
const POST = require("../Schema/Post")
const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const data = req.body
        const comment = new COMMENT(data)
        await comment.save()
        console.log("ok".green, comment)
        const post = await POST.findByIdAndUpdate(req.body.post, { $push: { comment: comment._id } }, { new: true })
        res.status(200).send({success:true,msg:"comment send"})
    } catch (e) { console.log("error while posting comment---->>>>".red, e) }

})

router.get("/inPost", async (req, res) => {
    try {
        const comments = await POST.findById(req.body.postId).populate({ path: "comment", select: "text time likedBy reply author", populate: { path: "author", select: "userName" } })
        console.log(comments)
        res.status(200).send({ success: true, comments: comments.comment })
    } catch (e) { console.log("error while getting all comments--->>>".red, e) }
})

router.delete("/deleteComment", async (req, res) => {
    try {
        const postId = req.body.postId
        const commentId = req.body.commentId
        const comment = await COMMENT.findByIdAndDelete(commentId)
        const post = await POST.findByIdAndUpdate(postId, { $pull: { comment: commentId } })

        res.status(200).send({ success: true, comment: comment })


        // console.log(comment)
    } catch (e) { console.log("error while deleting comment".red, e) }
})

router.patch("/like",async(req,res)=>{
        const comment=await COMMENT.findByIdAndUpdate(req.body.commentId,{$push:{likedBy:req.body.userId}})
        res.status(200).send({success:true,likedBy:comment.likedBy})
})
router.patch("/dislike",async(req,res)=>{
    const comment=await COMMENT.findByIdAndUpdate(req.body.commentId,{$pull:{likedBy:req.body.userId}})
    res.status(200).send({success:true,likedBy:comment.likedBy})
})



module.exports = router