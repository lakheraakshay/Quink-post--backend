const express = require('express');
const USER = require('../Schema/USER');
const router = express.Router()
const POST = require("../Schema/POST")

// --get feed for user accordint to his interest

router.get("/", async (req, res) => {
    try {
        let feed = []
        const userInterest = req.body.interest
        const allPost = await POST.find()
        allPost.map(post => {
            return post.tags.map(tag => {
                return userInterest.map(interest => {
                    if (tag == interest) {
                        console.log(tag)
                        feed = [...feed, post]
                    }
                })
            })
        })
        res.status(200).send({ success: true, feed })


        res.status(200).send({ interest: userInterest, allPost })
    } catch (e) { console.log("error".red, e) }

})
router.get("/type", async (req, res) => {
    try {

        const post = await POST.find()
        const feed = post.filter(post => post.type == req.body.type)
        if (!feed.length) { res.status(200).send({ success: false, msg: "no post found" }) }
        else { res.status(200).send({ success: true, feed }) }

    } catch (e) {
        console.log("error --->>>".red, e)
    }

})


module.exports = router