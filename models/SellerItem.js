let SellerItem = function (data) {
  this.data = data;
  this.errors = [];
};

SellerItem.prototype.cleanUp = function () {
  this.data = {
    itemName: this.data.itemName,
    itemDescription: this.data.itemDescription,
    itemCost : this.data.itemCost,
    itemQuantity: this.data.itemQuantity,
    itemAddDate: this.data.itemAddDate,
    sellerId: this.data.sellerId
  };
};

module.exports = SellerItem;