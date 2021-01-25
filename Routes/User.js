const express = require('express');
const router = express.Router()
const bcrypt = require("bcryptjs")
const USER = require('../Schema/USER');

const midUser = require("../Middlewear/User");
const hashedPassword = midUser.hashedPassword
const checkEmailOrUserName = midUser.checkEmailOrUserName


router.get("/all", async (req, res) => {
  const users = await USER.find()
  res.status(200).send({ success: true, users })
})


router.post("/signUp", hashedPassword, async (req, res) => {
  try {
    const user = { ...req.body, password: req.hashedPassword }
    const setInModel = new USER(user)
    setInModel.save().then((resultUser) => {
      res.status(201).send(resultUser)
    }).catch((err) => {
      var msg1 = ""

      console.log("error while saving user>>>>>>".red, err)
      if (err.keyValue.userName) { msg1 = "user name already exist" }
      if (err.keyValue.email) { msg1 = "email already exist" }
      res.status(201).send({ success: false, msg: msg1 })
    });
  } catch (e) {
    console.log(" error at catch ".red, e)

  }

})


router.post("/login", checkEmailOrUserName, async (req, res) => {
  try {
    console.log("yes you are here")
    if (req.user) {
      res.status(200).send({ success: true, user: req.user, token: req.token })
    }
  } catch (e) { console.log("error while login in router user>>>>>>>".red, err) }


})
router.get("/:userId", async (req, res) => {
  try {
    console.log("user is >>>>>".green)
    const user = await USER.findById(req.params.userId).populate({ path: "followings", select: "userName" })
    res.status(200).send({ success: true, user })
  } catch (e) {
    console.log("error while getting user with userId".red, e)
  }
})


router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await USER.findByIdAndDelete(req.params.userId)
    res.status(200).send({ success: true, deletedUser })

  } catch (e) { console.log("error while deleting user".red, e) }
})




router.post("/save/:userId/post/:postId", async (req, res) => {
  try {
    const user = await USER.findByIdAndUpdate(req.params.userId, { $push: { savedPost: req.params.postId } })
    res.status(200).send({ success: true, msg: "done",savePost:user.savedPost })
  } catch (e) { console.log("error while saving post by user--->>>>".red, e) 
res.status({success:false,e})}
})


router.patch("/update", async (req, res) => {
  //  req.body.userId
  // req.body all
  try {
      const user=await USER.findByIdAndUpdate(req.body.userId,req.body,{new:true})
      res.status(200).send({success:true,user})
  } catch (error) {
    console.log("error while updating user---->", error)
    res.status(404).send({ success: false, error })
  }


})

module.exports = router