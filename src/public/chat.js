const socket = io();

// DOM Elements
let myID = 0;
let message = document.getElementById("message");
let username = new URLSearchParams(location.search).get("txtUser");
let btnSend = document.getElementById("send");
let btnDelete = document.getElementById("delete");
let output = document.getElementById("output");
let actions = document.getElementById("actions");
let container = document.getElementById("#chat-window");

const messageUI = (messages) => {
  const p = document.createElement("p");
  p.innerHTML = `<p class="animate__animated animate__fadeIn">
    <strong>${messages.username}: </strong> ${messages.message}
    </p>`;
  return p;
};

socket.on("server:loadmessages", function (messages) {
  output.innerHTML = "";
  messages.forEach((message) => output.append(messageUI(message)));
});

btnSend.addEventListener("click", function () {
  socket.emit("chat:message", {
    message: message.value,
    username: username,
  });
});

btnSend.addEventListener("onload", socket.emit("chat:obtenerid"));

btnDelete.addEventListener("click", function () {
  socket.emit("chat:delete");
});

message.addEventListener("keypress", function () {
  socket.emit("chat:typing", username);
});

socket.on("server:deleteNote", function (){
  output.innerHTML="";
});

socket.on("chat:getid", function (data) {
  myID = data;
});

socket.on("chat:message", function (data) {
  actions.innerHTML = "";
  output.innerHTML += `<p class="animate__animated animate__fadeIn">
    <strong>${data.savedMessage.username}: </strong> ${data.savedMessage.message}
    </p>`;
  if (data.id == myID) {
    message.value = "";
  }
});

socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
