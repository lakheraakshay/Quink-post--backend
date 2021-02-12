const express = require('express');
const app = express()
const dotenv = require("dotenv").config()
const PORT = dotenv.parsed.PORT
const Pusher = require("pusher")

require("./Schema/MongooseConnection")


app.use(express.json())



// ---------------------------------------PUSHER------------
// frontend
//  npm install pusher-js
// import Pusher from "pusher-js"
// inside useEffect
// var pusher = new Pusher('dddc42be48dfb32df22b', {
//     cluster: 'ap2'
//   });

// const channel = pusher.subscribe('messages');
//   channel.bind("inserted", (data)=> {
//     alert(JSON.stringify(data));
//   });




// const pusher = new Pusher({
//     appId: "1139738",
//     key: "dddc42be48dfb32df22b",
//     secret: "ce88c604df26417050b4",
//     cluster: "ap2",
//     useTLS: true
// });

// mongoose.connection.once("open", () => {
//     console.log("db connected")
//     const msgCollection = mongoose.connection.collection("communitychats")
//     const changeStream = msgCollection.watch()
//     changeStream.on("change", (change) => {
//         if(change.operationType=="insert")
//         {
//             const messageDetails=change.fullDocument
//             pusher.trigger("messages","inserted",{
//                 name:messageDetails.userName,
//                 text:messageDetails.text,
//                 userId:messageDetails.userId,
//                 time:messageDetails.time
                
//             })
//             console.log(messageDetails)
//         }
//         else{
//             console.log("ERROR WHILE TRIGGERING PUSHER")
//         }
//         // console.log("something change>>>>", change)
//         // console.log()
//     })
// })





// ---------------------------------------ROUTES-----------

app.use("/user", require("./Routes/User"))
app.use("/follow", require("./Routes/Follow"))
app.use("/post", require("./Routes/Post"))
app.use("/comment", require("./Routes/Comment"))
app.use("/like", require("./Routes/Like"))
app.use("/save", require("./Routes/Save"))
app.use("/reply", require("./Routes/Reply"))
app.use("/challenge", require("./Routes/Challenge"))
app.use("/community", require("./Routes/Community"))
app.use("/feed", require("./Routes/Feed"))
app.use("/admin", require("./Routes/Admin"))


// ---------------------------------------SERVER-------------
app.listen(process.env.PORT || 5000, () => console.log("server is running at".yellow, PORT))
