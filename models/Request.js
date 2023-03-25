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




Request.prototype.getRequestsByDate = async function(date, itemId){
    //     var today = moment();
    // var tomorrow = moment(today).add(1, 'days');
    console.log(date)
    
    let requestedDate = new Date(date.fromDate);
    requestedDate.setHours(0,0,0,0);
    console.log("Requested Date: " + requestedDate)
    
    let nextDate = new Date(date.toDate);
    nextDate.setHours(0,0,0,0);
    console.log("OG Date: "  + nextDate)
    
    nextDate.setTime(nextDate.getTime() + (24*60*60*1000))
    
     console.log("next Date" + nextDate)
    
    
    let getRequestsByDate = await requestsCollection.find({
        "fromDate" : {"$gte": requestedDate,
                  "$lt": nextDate }, rentItemId: new ObjectId(itemId), requestStatus: "approved"
      }).toArray()
    
    
    
    // find({fromDate: new Date(date)}).toArray()
    console.log(getRequestsByDate)
    return getRequestsByDate
    }


    Request.prototype.getMyApprovedRequests = async function(id){
        console.log(id)
    let myReqs  =  await requestsCollection.find({lenderId: new ObjectId(id), requestStatus: "approved" }).toArray()
    console.log("My reqs" +  myReqs)    
    return myReqs
    }
module.exports = Request