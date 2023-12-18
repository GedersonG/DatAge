import { loadNotes, onNewNote, onSelectedNote } from "./socket.js";
import { onHandleSubmit, renderNotes, appendNote, fillForm } from "./ui.js";

onNewNote(appendNote);
loadNotes(renderNotes);
onSelectedNote(fillForm);
const noteForm = document.querySelector("#noteForm");
const fastChat = document.querySelector("#fastChatForm")
const username = document.querySelector("#username")

noteForm.addEventListener("submit", onHandleSubmit);
fastChat.addEventListener("submit", (e) => { 
    console.log("event: ",JSON.stringify(e))
    localStorage.setItem('user', JSON.stringify({ username: username.value }))
})