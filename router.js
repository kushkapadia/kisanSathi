const express= require('express')
//middleware function, which allows you to define multiple route handlers on a single path prefix.
const router = express.Router()
const farmerController = require('./controllers/farmerController')
const sellerController = require('./controllers/sellerController')
const chatController = require('./controllers/chatController.js')



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




router.get('/chat/:id', function(req, res){
    console.log(req.params.id)
    res.render('chat',{
        rId : req.params.id 
    })
})

router.get('/allFarmers', farmerController.getAllFarmers)

//test - chat - routes
router.post("/send-chat", chatController.sendChat)
router.get('/get-current-texts/:senderId/:recieverId', chatController.getCurrentTexts)
module.exports = router