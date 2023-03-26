const Farmer = require('../models/Farmer')
const Rent = require('../models/Rent')
const RentItem = require('../models/RentItem')
const path = require('path')

exports.rent = async function(req, res){
    let rent = new Rent(req.body)
  await rent.rentItem()
  res.send("rented")
  }


  exports.showRentSummary = async function(req, res){
    console.log(req.params.id)
    let rent = new Rent()
    let rentDoc = await rent.getRentById(req.params.id)
    let rentItem = new RentItem()
    console.log(rentDoc)
   let rentItemDoc = await rentItem.getItemById(rentDoc.itemId.toString())
   console.log(rentItemDoc)

   let billableTimeInMs = rentDoc.rentDuration.endTime - rentDoc.rentDuration.startTime
   console.log(billableTimeInMs)
   let dailyRate = rentItemDoc.rentPerDay
   console.log(dailyRate)

   const ratePerMs = dailyRate / (24 * 60 * 60 * 1000);
   let finalBill = ratePerMs * billableTimeInMs
   console.log(finalBill)

let hours = billableTimeInMs / 3600000;

let farmer = new Farmer()
let lenderDoc = await farmer.getFarmerById(rentDoc.lenderId.toString())
let borrowerDoc = await farmer.getFarmerById(rentDoc.borrowerId.toString())
console.log(borrowerDoc)
let data = {
  lenderName: lenderDoc.fName + " " + lenderDoc.lName ,
  borrowerName: borrowerDoc.fName + " " + borrowerDoc.lName ,
  paymentStatus: rentDoc.PaymentStatus,
  finalBill: finalBill.toFixed(2),
  hours: hours.toFixed(2),
  rentStatus: rentDoc.rentStatus
}
    res.render('farmer/payment', {
      data: data
    })
  }


  exports.updateRentStatus = async function(req, res){
    let rent = new Rent()
    let rentDoc = await  rent.getRentById(req.body.rentId)
    if(rentDoc.rentStatus == "notStarted"){
      await rent.changeStatusToStarted(req.body.rentId)
    res.json({
      status: "started",
      lenderId: rentDoc.lenderId
    })
  } else{
    await  rent.changeStatusToCompleted(req.body.rentId)
    res.json({
      status: "completed",
      lenderId: rentDoc.lenderId
    })
  
  
    }
  }

  
exports.dsiplayQrCode = function(req, res){
  res.render('farmer/qr-code', {
      rentId: req.params.id
  })
  }

  exports.displayUploadPicsPage = function(req, res){
    res.render('farmer/add-multiple-photos', {
      rentId: req.params.id
    })
  }


  exports.uploadMultiplePics = async function(req, res){
    console.log(req.params.id)
    let fileNames =[]
if(req.files){

  req.files.itemPics.forEach(async (img)=>{

    const file = img
    console.log(file);
    const fileName = new Date().getTime().toString() + path.extname(file.name)
    const savePath = path.join(__dirname, '../public' , 'uploads', fileName)
    fileNames.push(fileName)
    await file.mv(savePath)

 
  })
let rent = new Rent()
await rent.uploadItemPicNames(req.params.id, fileNames)

  }
  res.redirect('/')
}


exports.showRentTable = async function(req, res){
let rent = new Rent()
let rents = await rent.getMyRent(req.session.user._id)
res.render('farmer/viewimage', {
rents : rents
})
}


exports.viewImages = async function(req, res){
let rent = new Rent()
let images = await rent.getImagesName(req.params.id)
console.log(images)
res.render('farmer/slide-Multiple-Photos', {
  images: images
})
}