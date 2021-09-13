// const socket = io('http://localhost:8000');
const socket = io('http://localhost:8000', { transports: ['websocket'] });

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const aud = new Audio('samsung-good-news-54001.mp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You : ${message}`, 'right');
    socket.emit('send',message);
    messageInp.value='';
})

const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement.innerText=message;
    messageContainer.append(messageElement);
    if(position="left"){
        aud.play();
    }
    
}

const username = prompt("Enter your name to join!")
socket.emit('new-user-joined',username);  

socket.on('user-joined',name =>{
    append(`${name} joined the chat`, 'right');
});

socket.on('recieve',data =>{
    append(`${data.name} - ${data.message}`, 'left');
});

socket.on('left',name =>{
    append(`${name} left the chat`, 'left');
});