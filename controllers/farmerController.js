
const Farmer = require('../models/Farmer')
const RentItem = require('../models/RentItem')


exports.home = async function(req, res){
    if (req.session.user) {
      if(req.session.user.loginType="farmer"){
        let rentItem = new RentItem()
       let rentItems = await rentItem.getOtherRentItems(req.session.user._id)
        res.render("farmer/homepage-farmer",{
          rentItems: rentItems
        })
      } else if(req.session.user.loginType="seller"){
        res.send("display Seller homepage")
      }
      } else {
        res.render('lock-screen')
      }
}

exports.getAllFarmers = async function(req, res){
  let farmer = new Farmer()
let farmers = await farmer.getAllFarmers()
res.render('farmers', {
  farmers: farmers
})
}


exports.login = function (req, res) {
    console.log(req.body)
    let farmer = new Farmer(req.body)
    farmer.login().then(function (result) {
        req.session.user = { fName: farmer.data.fName, lName: farmer.data.lName, email: farmer.data.email, _id: farmer.data._id, loginType:"farmer"}
        console.log("here")
        req.session.save(function () {
        res.redirect('/')
        })
    }).catch(function (e) {
        console.log(e);
        // req.flash('errors', e)
        // req.session.save(function () {
        res.redirect('/')
        // })
    })
}



exports.register = function(req, res) {
    let farmer = new Farmer(req.body)
    farmer.register().then(() => {
      req.session.user = { fName: farmer.data.fName, lName: farmer.data.lName, email: farmer.data.email, _id: farmer.data._id, loginType:"farmer"}
      req.session.save(function() {
        res.redirect('/')

      })
    }).catch((regErrors) => {
      regErrors.forEach(function(error) {
        req.flash('regErrors', error)
      })
      req.session.save(function() {
        res.redirect('/')
      })
    })
  }


  exports.displayLoginPage = function(req, res){
    res.render('farmer/login-farmer')
  }

  exports.displayRegisterPage = function(req, res){
    if(req.session.user){
      res.redirect('/')
    }
    res.render("farmer/register-farmer")
  }

exports.displayLenderForm =  function(req,res){
res.render('farmer/lender-form')
}

exports.changeLendorReputation = async function(req, res){
  console.log(req.body.lenderId)
  console.log(req.params.value)
  let farmer = new Farmer()
 await farmer.changeLendorReputation(req.body.lenderId, req.params.value)
 res.redirect("/")
}