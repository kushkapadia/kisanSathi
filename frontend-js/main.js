import  Chat  from './modules/Chat'
import QrCode from './modules/QrCode'
import Test from './modules/Test'
import AskForRentForm from './modules/AskForRentForm'

if(document.querySelector("#test")){
    new Test()

}

if(document.querySelector("#chat-history")){
    new Chat()
}

if(document.querySelector("#qr-reader")){ 
    new QrCode()
}

if(document.querySelector("#askForRentForm")){
    
    new AskForRentForm()
}