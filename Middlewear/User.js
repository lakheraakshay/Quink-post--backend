const bcrypt = require("bcryptjs");
const USER = require("../Schema/USER");
const jwt = require("jsonwebtoken")




// getting hashed password

const hashedPassword = (req, res, next) => {
    const password = req.body.password
    var salt = bcrypt.genSaltSync(10);
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) { console.log("error at 7".red, err) }
            req.hashedPassword = hash
            next()
        });
    });
}



const checkEmailOrUserName = (req, res, next) => {
    const userName = req.body.userName
    const email = req.body.email
    // console.log(userName)
    // console.log(email)

    if (email) {
        USER.findOne({ email: email }).then((result) => {
            if (result) {
                bcrypt.compare(req.body.password, result.password).then((resBcrypt) => {
                    if (resBcrypt == true) {
                        req.user = result
                        console.log("email matched".green)
                        next()
                    }
                    else { res.status(401).send({ success: false, msg: "incorrect email address/password" }) }
                });
            } else {
                res.status(404).send({ success: false, msg: "user not found with givin email address" })
            }
        }).catch((err) => {
            console.log("error while finding email of user>>>>>>".red, err)
        });
    }
    if (userName) {
        USER.findOne({ userName: userName }).then((result) => {
            if (result) {

                bcrypt.compare(req.body.password, result.password).then(async (resBcrypt) => {
                    if (resBcrypt == true) {
                        const token = await jwt.sign({ _id: result._id }, process.env.JWT_SEC_KEY.toString())
                        req.token=token
                        console.log(token)
                        req.user = result
                        console.log("email matched".green)
                        next()
                     
                    }
                    else { res.status(401).send({ success: false, msg: "incorrect user name or password" }) }
                });
            }
            else {
                res.status(404).send({ success: false, msg: "user not found with given user name" })
            }
        }).catch((err) => {
            console.log("error while finding user with userName >>>>>>".red, err)
        });
    }


}








module.exports = { hashedPassword, checkEmailOrUserName }