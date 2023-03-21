let Farmer = function (data) {
  this.data = data;
  this.errors = [];
};

Farmer.prototype.cleanUp = function () {
  this.data = {
    fname: this.data.fname,
    lname: this.data.lname,
    email: this.data.email,
    contactNo: this.data.contactNo,
    address: this.data.address,
    birthDate: this.data.birthDate,
    noOfItemsBorrowed: this.data.noOfItemsBorrowed,
    noOfItemsLent: this.data.noOfItemsLent,
    joinedDate: this.data.joinedDate,
    reputationScore: this.data.reputationScore,
    documents:{
      aadhar: this.data.aadhar,
      pan: this.data.pan,
    },
  };
};

module.exports = Farmer
