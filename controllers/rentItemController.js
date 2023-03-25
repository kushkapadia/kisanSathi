const RentItem = require ('../models/RentItem')
const fileUpload = require('express-fileupload')
const path = require('path')
const Rent = require('../models/Rent')
const Farmer = require('../models/Farmer')

exports.leaseItem = async function(req, res){

        const file = req.files.itemFile
        console.log(file);
        const fileName = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join(__dirname, '../public' , 'uploads', fileName)
        await file.mv(savePath)

req.body.itemPhotoName = fileName
req.body.lenderId = req.session.user._id

    let rentItem = new RentItem(req.body)
    await rentItem.leaseItem()
    res.send("Uploaded")
}


exports.dsiplayQrCode = function(req, res){
res.render('farmer/qr-code', {
    rentId: req.params.id
})
}

exports.updateRentStatus = async function(req, res){
  let rent = new Rent()
  let rentDoc = await  rent.getRentById(req.body.rentId)
  if(rentDoc.rentStatus == "notStarted"){
    await rent.changeStatusToStarted(req.body.rentId)
  res.json("started")


  } else{
  await  rent.changeStatusToCompleted(req.body.rentId)
  res.json("completed")


  }
}


exports.displayItemProfile = async function(req, res){
    let rentItem = new RentItem()
    let farmer = new Farmer()
   let rentItemDoc = await rentItem.getItemById(req.params.id)
   let farmerDoc = await farmer.getFarmerById(rentItemDoc.lenderId)
    res.render('farmer/itemProfile', {
        rentItem: rentItemDoc,
        lender:farmerDoc
    })
}