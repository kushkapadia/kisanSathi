const { ObjectId } = require('mongodb')

const rentItemsCollection = require('../db').collection('rentItems')
let RentItem = function(data){
    this.data = data;
    this.errors = [];
}

RentItem.prototype.cleanUp = function(){
    this.data = {
        itemName: this.data.itemName,
        itemDescription: this.data.itemDescription,
        rentPerDay: this.data.rentPerDay,
        itemQuantity: this.data.itemQuantity,
        itemAddDate: this.data.itemAddDate,
        lenderId: new ObjectId(this.data.lenderId),
        address: this.data.address,
        rentItemPhoto : this.data.itemPhotoName,
        itemCategory: this.data.itemCategory,
        itemAddDate : new Date()
    }
}

RentItem.prototype.leaseItem = async function(){
    this.cleanUp()
    await rentItemsCollection.insertOne(this.data)
}

RentItem.prototype.getOtherRentItems = async function(id){
    let rentItems = await rentItemsCollection.find({lenderId: {$ne : new ObjectId(id)}}).toArray()
    console.log(rentItems)
    return rentItems
}

RentItem.prototype.getItemById = async function(itemId){
let itemDoc = await rentItemsCollection.findOne({_id: new ObjectId(itemId)})
return itemDoc
}

module.exports = RentItem;