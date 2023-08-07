const form = document.getElementById("form");
const input = document.getElementById("msg-input");
const massage = document.getElementById("massage");
// const logout = document.getElementById("logout");
const socket = io();


socket.on("connect",()=>{
    console.log(socket.id);
    
    // console.log()
})

input.addEventListener("keydown", e =>{
    if(e.key ==="Enter" && input.value.trim()){
        e.preventDefault();
        socket.emit("chat-massage",input.value,input.getAttribute("username"));
        input.value ="";   
    }
})

form.addEventListener("submit",e=>{
    e.preventDefault();
    if(input.value ==="")  return;
    socket.emit("chat-massage",input.value,input.getAttribute("username"));
    input.value = "";
})

// logout.addEventListener("click",(e)=>{
//     socket.emit("logout",input.getAttribute("username"));
// })

socket.on("massage", (msg,name)=>{
            const div = document.createElement("div");
            div.textContent = name + " : " + msg;
            massage.appendChild(div);
        })