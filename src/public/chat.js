const socket = io();

// DOM Elements
let myID = 0;
let message = document.getElementById("message");
let username = new URLSearchParams(location.search).get('txtUser');
let btnSend = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btnSend.addEventListener("click", function () {
  socket.emit("chat:message", {
    message: message.value,
    username: username,
  });
});

btnSend.addEventListener("onload", socket.emit("chat:obtenerid"));

message.addEventListener("keypress", function () {
  socket.emit("chat:typing", username);
});

socket.on("chat:getid", function(data){
  myID = data;
});

socket.on("chat:message", function (data) {
  actions.innerHTML = "";
  output.innerHTML += `<p class="animate__animated animate__fadeIn">
    <strong>${data.username}: </strong> ${data.message}
    </p>`;
  if(data.id == myID){
    message.value = "";
  }
});

socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
