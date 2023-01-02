const socket = io();

// DOM Elements

let message = document.getElementById("message");
let username = document.getElementById("username");
let btnSend = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btnSend.addEventListener("click", function () {
  socket.emit("chat:message", {
    message: message.value,
    username: username.value,
  });
});

message.addEventListener("keypress", function () {
  socket.emit("chat:typing", username.value);
});

socket.on("chat:message", function (data) {
  actions.innerHTML = "";
  output.innerHTML += `<p class="animate__animated animate__fadeIn">
    <strong>${data.username}: </strong> ${data.message}
    </p>`;
});

socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
