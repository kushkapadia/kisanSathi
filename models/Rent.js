const { ObjectId } = require('mongodb');

const rentsCollection = require('../db').collection('rents')

let Rent = function(data) {
    this.data = data;
    this.errors = [];
}



Rent.prototype.cleanUp = function() {
    this.data = {
        borrowerId : new ObjectId(this.data.borrowerId),
        lenderId : new ObjectId(this.data.lenderId),
        itemId: new ObjectId(this.data.itemId),
        rentAmount : null,
        rentDuration : null,
        PaymentStatus : "pending",
        rentStatus : "notStarted",
        rentedDate: new Date()
    }
};

Rent.prototype.rentItem = async function(){
    this.cleanUp()
   let rentId = await rentsCollection.insertOne(this.data)
   console.log(rentId)
   return rentId
}

Rent.prototype.getRentById = async function(rentId){
   let rentDoc = await rentsCollection.findOne({_id: new ObjectId(rentId)})
    return rentDoc
}

Rent.prototype.changeStatusToStarted = async function(rentId){
   await rentsCollection.findOneAndUpdate({_id:new ObjectId(rentId)}, {$set:{rentDuration: {startTime: new Date(), endTime: null}, rentStatus: "started" }})
}

Rent.prototype.changeStatusToCompleted = async function(rentId){
   await rentsCollection.findOneAndUpdate({_id:new ObjectId(rentId)}, {$set:{"rentDuration.endTime": new Date(), rentStatus: "completed" }})
}

module.exports = Rent