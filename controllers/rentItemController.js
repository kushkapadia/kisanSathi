const RentItem = require ('../models/RentItem')
const fileUpload = require('express-fileupload')
const path = require('path')

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