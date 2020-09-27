//const {text} = require("body-parser");

// connection to server by calling io
const socket =io()
//<----------------Logic-----------------> 

//login enter name
let name;
// its for msg
let textarea =document.querySelector('#textarea')
let messageArea =document.querySelector('.message__area')



do{
  name =  prompt('Please Enter your name: ')
}while(!name)


//when your clcik enter sent msg
textarea.addEventListener('keyup',(e)=>{
    if(e.key ==='Enter'){
        sendMessage(e.target.value)
    }
})


//logic how to send msg & sender name
function sendMessage(message){
    let msg = {
        user:name,
        message:message.trim()
    }

    //Append (firt show the msg and then snt it to server)

    appendMessage(msg, 'outgoing')

    //Clear Previous msg
        textarea.value=''
        scrollToBottom()    

    //Semd to Server 
    socket.emit('message',msg) 


}

// Msg type (income or outgoing) 

function appendMessage(msg, type){
    let mainDiv =document.createElement('div')
    let className = type

    mainDiv.classList.add(className,'message')


    let markup =`
        <h4> ${msg.user}  </h4>
        <p> ${msg.message} </P>
    `
    mainDiv.innerHTML =markup 

    messageArea.appendChild(mainDiv)
}


// Recive msg

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})


// Automatically Scroll to last msg

function scrollToBottom(){
    messageArea.scrollTop =messageArea.scrollHeight 
}