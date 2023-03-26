const express= require('express')
//middleware function, which allows you to define multiple route handlers on a single path prefix.
const router = express.Router()

var Publishable_Key = 'pk_test_51MpDLQSCZQPwhvX4lyeSRt379sdip9IJYFt0JgYThAvvDXCBzUp1ERrUzezmJZ6PDu8rfn12wOOif0BkHb2va0fz0057TTbdS7'
var Secret_Key = 'sk_test_51MpDLQSCZQPwhvX40Cnl3CppBjfomAusJDHVpSucJO0XCjKQGjtry1V7NaIqpRv0hi33WeqaIoAbpl0PtTySYGQB00XWVfSGvT'


const farmerController = require('./controllers/farmerController')
const sellerController = require('./controllers/sellerController')
const chatController = require('./controllers/chatController')
const requestController = require('./controllers/requestController')
const rentItemController = require('./controllers/rentItemController')
const rentController = require('./controllers/rentController')

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

router.get('/chat/:id', farmerController.displayChatPage )


router.get('/allFarmers', farmerController.getAllFarmers)
router.get('/view-item/:id', rentItemController.displayItemProfile )
//test - chat - routes
router.post("/send-chat", chatController.sendChat)
router.get('/get-current-texts/:senderId/:recieverId', chatController.getCurrentTexts)
router.post('/logout', function(req, res){
    req.session.destroy(function(){
        res.redirect('/')
    })
  
})

router.get('/cal', function(req, res){
    res.render('farmer/calender')
})

router.post('/getRequestByDate', requestController.getRequestsByDate)
//API for QR code 
router.post('/update-rent-status', rentController.updateRentStatus)

router.get('/published-items', rentItemController.displayLeasedItems)

router.get('/getMyApprovedRequests', requestController.getMyApprovedRequests)

router.get('/getMyApprovedRequests', requestController.getMyApprovedRequests)

router.get('/borrower-res-page', function(req, res){
res.render("farmer/borrower-res-page")
})



router.get('/payment', function(req, res){
res.render("farmer/payment")
})

router.post('/invoice', function(req, res){
res.render("farmer/invoice")
})



router.get('/payment', function(req, res){
res.render("farmer/payment")
})

router.post('/payment', function(req, res){
res.render("farmer/invoice")
})

router.post('/stripe-page/' ,function(req, res){
res.render("farmer/stripe-page", {
    lenderId: req.body.lenderId,
        totalBill: req.body.totalBill,    
        key: Publishable_Key      
})
})

router.get('/lendor-review-page/:id', function(req, res){
    res.render('farmer/review-page',{
        lenderId : req.params.id
    })
})

router.get('/show-rent-summary/:id', rentController.showRentSummary)
router.get('/upload-pics/:id', rentController.displayUploadPicsPage)
router.post('/change-lender-reputation/:value', farmerController.changeLendorReputation)
router.get('/view-images/:id', rentController.viewImages)
router.post('/upload-item-pics/:id', rentController.uploadMultiplePics)
router.get('/view-completed-rent', rentController.showRentTable)
module.exports = router