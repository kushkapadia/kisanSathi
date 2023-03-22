const Chat = require("../models/Chat")


exports.sendChat = async function(req, res){
    let chat = new Chat(req.body)
await chat.saveChat()
res.send("done")
}

exports.getCurrentTexts = async function(req, res){
    console.log(req.params.senderId)
    console.log(req.params.recieverId)
    console.log("Hittt")
let chat = new Chat()
let currentChats = await chat.getCurrentTexts(req.params.senderId , req.params.recieverId)
console.log(currentChats)
res.json(currentChats)
}