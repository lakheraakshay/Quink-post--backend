const USER = require("../Schema/USER")

const Follow =async (req, res, next) => {
   try{
    const followerId = req.body.followerId
    const followingToId = req.body.followingToId
    const follower=await USER.findByIdAndUpdate(followerId,{$push:{followings:followingToId}},{new:true})
    const followingTo=await USER.findByIdAndUpdate(followingToId,{$push:{followers:followerId}},{new:true})
    next()
    
    
   }catch(e){console.log("error while following>>>>>".red,e)
        
    }

  

}
module.exports = { Follow }