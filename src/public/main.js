import { loadNotes, onNewNote, onSelectedNote } from "./socket.js";
import { onHandleSubmit, renderNotes, appendNote, fillForm } from "./ui.js";

onNewNote(appendNote);
loadNotes(renderNotes);
onSelectedNote(fillForm);
const noteForm = document.querySelector("#noteForm");

noteForm.addEventListener("submit", onHandleSubmit);
