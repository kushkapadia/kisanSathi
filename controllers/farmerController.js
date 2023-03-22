
const Farmer = require('../models/Farmer')


exports.home = async function(req, res){
    if (req.session.user) {
     res.send("display homepage")
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
        req.session.user = { fName: farmer.data.fName, lName: farmer.data.lName, email: farmer.data.email, _id: farmer.data._id}
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
      req.session.user = { fName: farmer.data.fName, lName: farmer.data.lName, email: farmer.data.email, _id: farmer.data._id}
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

