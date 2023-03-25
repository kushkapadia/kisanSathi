import  Chat  from './modules/Chat'
import QrCode from './modules/QrCode'
import Test from './modules/Test'
import AskForRentForm from './modules/AskForRentForm'

if(document.querySelector("#test")){
    // alert("Milaa")
    new Test()

}

if(document.querySelector("#chat-history")){
    alert("Milaa")
    new Chat()
}

if(document.querySelector("#qr-reader")){
    alert("Milaa")
    new QrCode()
}

if(document.querySelector("#askForRentForm")){
    alert("Milaa")
    new AskForRentForm()
}