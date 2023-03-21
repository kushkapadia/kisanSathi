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
        lenderId: this.data.lenderId
    }
}

module.exports = RentItem;