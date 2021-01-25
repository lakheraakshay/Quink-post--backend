const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: { type: String, required: "title of challenge cant be empty" },
    duration: { type: Object, start: { type: Number, required: true }, end: { type: Number, required: true } },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "POST" }],
    leaderboard: { first: { type: mongoose.Schema.Types.ObjectId, ref: "POST", second: { type: mongoose.Schema.Types.ObjectId, ref: "POST" }, third: { type: mongoose.Schema.Types.ObjectId, ref: "POST" } } },
    description: { type: String },
    image: { type: String }
})
const CHALLENGE = mongoose.model("CHALLENGE", schema)
module.exports = CHALLENGE