const { ObjectId } = require('mongodb')

const requestsCollection = require('../db').collection('requests')


let Request = function(data){
    this.data = data
    this.errors = []
}

Request.prototype.cleanUp = function(){
    this.data = {
    borrowerName : this.data.farmerName,
    itemName: this.data.itemName,
    fromDate : new Date(this.data.fromDate),
    toDate:new Date(this.data.toDate),
    rentItemId: new ObjectId(this.data.rentItemId),
    borrowerId : new ObjectId(this.data.borrowerId),
    lenderId: new ObjectId(this.data.lenderId),
    totalRentingAmount: Number(this.data.totalRentingAmount),
    requestStatus: "pending", //approved //cancelled
    requestDate: new Date()
    }
}

Request.prototype.request = async function(){
    this.cleanUp()
await requestsCollection.insertOne(this.data)
}

Request.prototype.changeRequestStatus = async function(reqId, status){
let reqDoc = await requestsCollection.findOneAndUpdate({_id: new ObjectId(reqId)}, {$set:{requestStatus: status}}, {returnDocument: 'after'})
console.log(reqDoc)
return reqDoc
}

Request.prototype.getAllPendingRequest = async function(id){
  let pendingRequests = await requestsCollection.find({lenderId: new ObjectId(id),requestStatus: "pending"}).toArray()
  return pendingRequests
}
module.exports = Request