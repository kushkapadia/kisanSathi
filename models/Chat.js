const { ObjectId } = require('bson')

const chatsCollection = require('../db').collection('chats')
let Chat = function(data){
this.data = data,
this.errors = []
}

Chat.prototype.cleanUp = function(){
    this.data = {
        from: new ObjectId(this.data.senderId),
        to: new ObjectId(this.data.rId),
        // to: this.data.recieverId,
        messageText: this.data.messageText,
        date: new Date()
    }
}


Chat.prototype.saveChat = async function(){
    this.cleanUp()
    await chatsCollection.insertOne(this.data)
}

Chat.prototype.getCurrentTexts = async function(senderId, rId){
  let currentChats = await chatsCollection.find({from:  { $in: [ new ObjectId(senderId), new ObjectId(rId) ] }}).toArray()
  return currentChats
}
module.exports = Chat