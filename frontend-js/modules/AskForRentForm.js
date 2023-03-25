export default class AskForRentForm{
    constructor(){
         this.amountField = document.getElementById("totalRentingAmount")
         this.dailyRate = document.getElementById("dailyRate")
       
         this.fromDate = document.getElementById("fromDate")
         this.toDate = document.getElementById("toDate")
         this.events()
    }
    events(){

        this.toDate.addEventListener('blur', ()=>{
            let timeInMs = new Date(this.toDate.value) -new Date(this.fromDate.value)
            console.log(timeInMs)
let rateInMs =    Number(this.dailyRate.value) / (24 * 60 * 60 * 1000);
console.log(rateInMs)
            this.amountField.value = timeInMs * rateInMs
        })
        }
    
}