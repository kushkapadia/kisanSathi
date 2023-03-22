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
  var fetchInterval = 10000; // 5 seconds.

  // Invoke the request every 5 seconds.
  setInterval(  this.fetchMessages, fetchInterval);
});

        // setInterval(10000, this.fetchMessages())

this.chatForm.addEventListener('submit',  (e)=>{
    e.preventDefault()
//     this.chatHistory.innerHTML +=` <div class="spinner-border text-primary" role="status">
//   <span class="visually-hidden">Loading...</span>
// </div>`
axios.post('/send-chat', {
    senderId: this.senderId.value,
    rId: this.rId.value,
    messageText: this.chatField.value
  }).then(()=>{
    this.chatHistory.innerHTML += `<div><p> ${this.chatField.value}</p></div>`
    this.chatField.value = ""
    this.chatField.focus()
}).catch((e)=>{

})

    // alert("Tested")
})
    }


    //Methods
    startFetch(){
        alert("start called")
    }

    fetchMessages = ()=>{
        axios.get(`/get-current-texts/${this.senderId.value}/${this.rId.value}`).then((response)=>{
            console.log(response.data)
            this.chatHistory.innerHTML = ""
            response.data.forEach((data)=>{
                this.chatHistory.innerHTML += `<div><p style="color: red"> ${data.messageText}</p></div>`
            })

        }).catch((e)=>{
            console.log(e)

        })
        console.log("5 sec done")

    }
}