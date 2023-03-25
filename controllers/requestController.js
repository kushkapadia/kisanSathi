const Farmer = require('../models/Farmer')
const RentItem = require('../models/RentItem')
let Request = require('../models/Request')
let Rent = require('../models/Rent')

exports.request = async function(req, res){
  let rentItem = new RentItem()
  let itemDoc= await rentItem.getItemById(req.params.id)
  console.log(itemDoc)
  req.body.itemName = itemDoc.itemName
  req.body.rentItemId = req.params.id
  req.body.lenderId = itemDoc.lenderId
  
  let farmer = new Farmer()
  let farmerDoc = await  farmer.getFarmerById(req.session.user._id)
  req.body.farmerName = farmerDoc.fName + " " + farmerDoc.lName
  req.body.borrowerRating = farmerDoc.reputationScore
  req.body.borrowerId = req.session.user._id
    let request = new Request(req.body)
   await request.request()
    res.send("requested chk db")
}

exports.changeStatus = async function(req, res){
    let request = new Request()
let requestDoc = await request.changeRequestStatus(req.params.id, req.body.status)
if(requestDoc.value.requestStatus == "approved"){
  let data = {
    borrowerId : req.params.id,
    lenderId : req.session.user._id
  }
  console.log(data)
  let rent = new Rent(data)
  let rentAk = await rent.rentItem()
  console.log(rentAk.insertedId)
  res.redirect(`/rent-qr-code/${rentAk.insertedId}`)
  res.render("farmer/qr-Code",{
    rentId : rentAk.insertedId
  })
} else{
res.send("rejected")
}
}

// exports.getAllPendingRequest = async function(req, res){
//     let request = new Request()
//   let pendingRequests = await  request.getAllPendingRequest(req.session.user._id)
//   res.json(pendingRequests)
// }

exports.displayRequestForm = async function(req , res){
  let rentItem = new RentItem()
 let itemDoc = await rentItem.getItemById(req.params.id)
  res.render('farmer/request-item-form', {
  itemDoc: itemDoc
})
}

exports.displayPendingRequestsPage = async function(req, res){
  let request = new Request()
  let pendingRequests = await request.getAllPendingRequest(req.session.user._id)
  res.render('farmer/pending-rent-requests', {
    pendingRequests: pendingRequests
  })
}





exports.getRequestsByDate = async function(req, res){
  console.log("Hittttt")
  let request = new Request()
let requestsByDate = await  request.getRequestsByDate(req.body.date, req.body.itemId)
let flag = 0
for(i=0; i< requestsByDate.length; i++){

// console.log(requestsByDate[i].fromDate.getTime())


  if(requestsByDate[i].toDate.getTime() > new Date(req.body.date.fromDate).getTime()){
     if(      requestsByDate[i].fromDate.getTime() > new Date(req.body.date.fromDate).getTime()  ){

      if(requestsByDate[i].fromDate.getTime() > new Date(req.body.date.toDate).getTime()){
          console.log("free1")
          flag=1
          res.send("free")
          break;
      } else{
          flag=1

      console.log("booked1")
      console.log("")
      // console.log("You have : " + requestsByDate[i].title + "from: " +  requestsByDate[i].fromDate + "-" + requestsByDate[i].toDate)
      res.send("booked")
      break;
      }
     
     } else{
      flag=1

      console.log("booked2")
      console.log("You have : " + requestsByDate[i].title + "from: " +  requestsByDate[i].fromDate + "-" + requestsByDate[i].toDate)

      res.send("booked")
      break;
     }
  }

}

if(flag ==0){
  console.log("free2")
  res.send("free")
}
}



exports.getMyApprovedRequests = async function(req, res){
  let request = new Request()
  let approvedReqs = await request.getMyApprovedRequests(req.session.user._id)
  res.json(approvedReqs)
}