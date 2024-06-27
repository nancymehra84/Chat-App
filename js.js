var socket = io();
let name;
let messageArea = document.querySelector(".message_area")
let textarea = document.querySelector("#textarea")
textarea.addEventListener("keyup",(e) =>{
    if(e.key === "Enter"){
sendMessage(e.target.value)
    }
})
do{
name = prompt("please enter your name")
}while(!name)
function sendMessage(message){
    let msg = { 
        user :name,
        message:message.trim()
    }
    appendMessage(msg,"outgoing")
    textarea.value = ''
    scrollToBottom()
    socket.emit('text',msg)
}
function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')
    let markup = 
    `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML= markup
    messageArea.appendChild(mainDiv)
}

socket.on('text',(msg) =>{
appendMessage(msg,"incoming")
scrollToBottom()
})
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}