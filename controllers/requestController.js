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