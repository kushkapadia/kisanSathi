let Purchase = function (data){
    this.data = data;
    this.errors = [];
}

Purchase.prototype.cleanUp = function (){
    this.data = {
        purchaserId : this.data.purchaserId,
        sellerId : this.data.sellerId,
        paymentStatus : this.data.paymentStatus,
        purchaseDate : this.data.purchaseDate,
        purchaseCost : this.data.purchaseCost
    }
}

module.exports = Purchase