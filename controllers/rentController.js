const Rent = require('../models/Rent')
const RentItem = require('../models/RentItem')


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

    // res.render('/')
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