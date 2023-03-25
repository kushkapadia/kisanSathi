const farmersCollection = require('../db').collection('farmers')
const bcrypt = require("bcryptjs")
const { ObjectId } = require('mongodb')

let Farmer = function (data) {
  this.data = data;
  this.errors = [];
};

Farmer.prototype.cleanUp = function () {
  this.data = {
    fName: this.data.fname,
    lName: this.data.lname,
    email: this.data.email,
    password: this.data.password,
    contactNo: this.data.contactNo,
    address: this.data.address,
    birthDate: this.data.birthDate,
    noOfItemsBorrowed: this.data.noOfItemsBorrowed,
    noOfItemsLent: this.data.noOfItemsLent,
    reputationScore: 0,
    documents:{
      aadhar: this.data.aadhar,
      pan: this.data.pan,
    },
    joinedDate: new Date()
  }
}

Farmer.prototype.login = function () {
  console.log(this.data.email)
  return new Promise((resolve, reject) => {
      this.cleanUp()
      farmersCollection.findOne({ email: this.data.email }).then((attemptedUser) => {
          console.log("Found! based on email")
          console.log(attemptedUser)
          if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
              this.data = attemptedUser
              console.log(this.data)
              resolve(this.data)
          } else {
              console.log("Invalidd")
              reject("Invalid username / password.")
          }
      }).catch(function () {
          console.log("Failed")
          reject("Please try again later.")

      })
  })
}


Farmer.prototype.register = function() {
  return new Promise(async (resolve, reject) => {
    // Step #1: Validate user data
    this.cleanUp()
  //   await this.validate()
    // Step #2: Only if there are no validation errors 
    // then save the user data into a database
    if (!this.errors.length) {
      // hash user password
      let salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt)
      await farmersCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}


Farmer.prototype.getAllFarmers = async function(){
let farmers=  await farmersCollection.find({}).toArray()
return farmers
}

Farmer.prototype.getFarmerById = async function(id){
  let farmerDoc = await farmersCollection.findOne({_id: new ObjectId(id)})
  return farmerDoc
}
module.exports = Farmer
