const express= require('express')
//middleware function, which allows you to define multiple route handlers on a single path prefix.
const router = express.Router()
const farmerController = require('./controllers/farmerController')
const sellerController = require('./controllers/sellerController')
const chatController = require('./controllers/chatController')
const requestController = require('./controllers/requestController')
const rentItemController = require('./controllers/rentItemController')
const rentController = require('./controllers/rentItemController')

//endpoint api //hit
router.get('/', farmerController.home)
//Farmer related routes
router.get('/login-page-farmer', farmerController.displayLoginPage)
router.get('/register-page-farmer', farmerController.displayRegisterPage)
router.post('/register-farmer', farmerController.register)
router.post('/login-farmer', farmerController.login)
// router.post('/rent', farmerController.rent)
//seller related routes
router.get('/login-page-seller', sellerController.displayLoginPage)
router.get('/register-page-seller', sellerController.displayRegisterPage)


router.get('/market-place', function (req,res){
    res.render("farmer/market-place");
})

router.get('/market-item-profile', function (req,res){
    res.render("farmer/market-item-profile");
})

router.post('/ask-for-availability/:id', requestController.request)

// router.get('/all-pending-requests', requestController.getAllPendingRequest)
router.post('/change-request-status/:id', requestController.changeStatus)
router.post('/lease-item', rentItemController.leaseItem )
router.get('/ask-rent-form/:id', requestController.displayRequestForm)
router.get('/lender-form', farmerController.displayLenderForm)
router.get('/pending-requests', requestController.displayPendingRequestsPage)
router.get('/qr-reader-page', function(req, res){
    res.render('farmer/qr-code-reader')
})
router.get('/rent-qr-code/:id', rentController.dsiplayQrCode)

router.get('/chat/:id', function(req, res){
    console.log(req.params.id)
    res.render('farmer/chat',{
        rId : req.params.id 
    })
})

router.get('/allFarmers', farmerController.getAllFarmers)
router.get('/view-item/:id', rentItemController.displayItemProfile )
//test - chat - routes
router.post("/send-chat", chatController.sendChat)
router.get('/get-current-texts/:senderId/:recieverId', chatController.getCurrentTexts)

//API for QR code 
router.post('/update-rent-status', rentController.updateRentStatus)
module.exports = router