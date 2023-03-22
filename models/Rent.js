const rentsCollection = require('../db').collection('rents')

let Rent = function(data) {
    this.data = data;
    this.errors = [];
}



Rent.prototype.cleanUp = function() {
    this.data = {
        borrowerId : this.data.borrowerId,
        lenderId : this.data.lenderId,
        rentAmount : this.data.rentAmount,
        rentDuration : this.data.rentDuration,
        PaymentStatus : this.data.paymentStatus,
        rentedDate: new Date()
    }
};

Rent.prototype.rentItem = async function(){
    this.cleanUp()
    await rentsCollection.insertOne(this.data)
}

module.exports = Rent