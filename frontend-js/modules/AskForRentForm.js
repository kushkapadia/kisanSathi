import axios from "axios"
export default class AskForRentForm{
    constructor(){
       
        this.statusBox = document.getElementById("status-box")
        this.itemId = document.getElementById("itemId")
        this.response = null
        this.allotBtn = document.querySelector("#reqAvailability")
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
    let rateInMs =   Number(this.dailyRate.value) / (24 * 60 * 60 * 1000);
        console.log(rateInMs)
            this.amountField.value = timeInMs * rateInMs


            alert("Clicked")
                if(this.fromDate.value && this.toDate.value){
                  if (new Date(this.fromDate.value).getTime() > new Date(this.toDate.value).getTime()) {
                    this.statusBox.innerHTML = `<p style="color: red;">Start Date cannot be greater </p>`
                  }
                  else {
                    let totalTime = this.msToTime(new Date(this.toDate.value).getTime() - new Date(this.fromDate.value).getTime())
                  
                    axios.post('/getRequestByDate', {
                      date: {
                        fromDate: (this.fromDate.value),
                        toDate: (this.toDate.value)
                      },
                      itemId: this.itemId.value
                      //moment(this.fromDate.value).format('MM/DD/YYYY') ,
            
                    })
                      .then((response) => {
                        this.response = response.data
                        if (this.response == "free") {
                          this.statusBox.innerHTML = `<p style="color: green;">Dates are Available </p><p style="color: green;">Total Time = ${totalTime} </p> `
                          this.allotBtn.disabled = false
                        } else if (this.response == "booked") {
                          this.statusBox.innerHTML = `<p style="color: red;">Items already rented</p>`
            
                        }
            
                      })
                      .catch((error) => {
                        // this.statusBox.innerHtml = `<p style="color: green;">Internal Server Error</p>` 
                        alert(error)
                      });
            
                  }
                }else{
                  this.statusBox.innerHTML = `<p style="color: red;">Enter Start & End Date</p>`
                }
          
              
          
          
            }
          
        )}
        
        msToTime(milliseconds) {
          var hours = milliseconds / (1000 * 60 * 60);
          var absoluteHours = Math.floor(hours);
          var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
      
          //Get remainder from hours and convert to minutes
          var minutes = (hours - absoluteHours) * 60;
          var absoluteMinutes = Math.floor(minutes);
          var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;
      
          //Get remainder from minutes and convert to seconds
          var seconds = (minutes - absoluteMinutes) * 60;
          var absoluteSeconds = Math.floor(seconds);
          var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
      
      
          return h + ':' + m + ':' + s;
        }
    
}