const Rent = require('../models/Rent')


exports.rent = async function(req, res){
    let rent = new Rent(req.body)
  await rent.rentItem()
  res.send("rented")
  }