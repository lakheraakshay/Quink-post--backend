const express = require('express');
const COMMUNITYCHAT = require('../Schema/Chat');
const COMMUNITY = require('../Schema/Community');
const POST = require('../Schema/POST');
const USER = require('../Schema/USER');
const router = express.Router()


router.post("/", async (req, res) => {
    try {
        const community = await new COMMUNITY(req.body)
        await community.save()
        res.status(200).send({ success: true, community })
    }
    catch (e) { console.log("error while making community====>>>".red, e) }
})


router.post("/post", async (req, res) => {
    const post = await new POST(req.body)
    await post.save()
    await USER.findByIdAndUpdate(req.body.author, { $push: { post: post._id } }, { new: true })
    const community = await COMMUNITY.findByIdAndUpdate(req.body.communityId, { $push: { post: post._id } }, { new: true })
    res.status(200).send({ success: true, community })
})


router.post("/chat", async (req, res) => {
    const chat = await new COMMUNITYCHAT(req.body)
    chat.save()
    res.status(200).send({ success: true, chat })
})

router.get("/chat", async (req, res) => {
    const chat = await COMMUNITYCHAT.find().populate({ path: "user", select: "userName" })
    res.status(200).send({ success: true, chat })
})

module.exports = router