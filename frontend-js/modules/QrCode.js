import axios from 'axios'

export default class QrCode{
    constructor(){
        this.rentId = document.querySelector("#qr-result")
        this.events()
    }

    events(){
console.log("From Front end js; " + this.rentId)
    }
}