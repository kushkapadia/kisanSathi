import axios from 'axios'

export default class Chat{
    constructor(){
        this.chatForm = document.querySelector("#chat-form-send")
        this.chatField = document.querySelector("#chatBody")
        this.chatHistory = document.querySelector("#chat-history")
        this.senderId = document.querySelector("#senderId")
        this.rId = document.querySelector("#rId")
        this.startFetch()
        this.events()
    }

    events(){

        

window.addEventListener('load',  ()=> {
  // Your document is loaded.
  var fetchInterval = 3000; // 5 seconds.

  // Invoke the request every 5 seconds.
  setInterval(  this.fetchMessages, fetchInterval);
});

        // setInterval(10000, this.fetchMessages())

this.chatForm.addEventListener('submit',  (e)=>{
    e.preventDefault()
//     this.chatHistory.innerHTML +=` <div class="spinner-border text-primary" role="status">
//   <span class="visually-hidden">Loading...</span>
// </div>`
if( this.chatField.value.trim() == ""){
    this.senderId.value =""
}else{


axios.post('/send-chat', {
    senderId: this.senderId.value,
    rId: this.rId.value,
    messageText: this.chatField.value
  }).then(()=>{
    this.chatHistory.innerHTML += `<div><p> ${this.chatField.value}</p></div>`
    this.chatField.value = ""
    this.chatField.focus()
    this.scroll()
}).catch((e)=>{

})
}
    // alert("Tested")
})
    }


    //Methods

    scroll()  { 
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight; }
    

    startFetch(){

    }

    fetchMessages = ()=>{
        axios.get(`/get-current-texts/${this.senderId.value}/${this.rId.value}`).then((response)=>{
            console.log(response.data)
            this.chatHistory.innerHTML = ""
            response.data.forEach((data)=>{
                if(data.from.toString() == this.senderId.value){

                    this.chatHistory.innerHTML +=  `   <div class="row">
                    <div class="container darker">
                        <img src="/assets/images/avatars/01.png" alt="Avatar"
                            class="right">
                        <p>${data.messageText}</p>
                        <span class="time-left">11:01</span>
                    </div>
                </div>`
                this.scroll()
                } else{
                    this.chatHistory.innerHTML +=
 
                    `  <div class="row">
                    <div class="container">
                        <img src="/assets/images/avatars/avtar_3.png" alt="Avatar">
                        <p> ${data.messageText}</p>
                        <span class="time-right">${data.date}</span>
                    </div>
                </div>`
                this.scroll()
                }
            })

        }).catch((e)=>{
            console.log(e)

        })
        console.log("5 sec done")

    }
}