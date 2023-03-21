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
        PaymentStatus : this.data.paymentStatus
    }
};

module.exports = Rent