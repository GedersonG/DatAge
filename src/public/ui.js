import { saveNote } from "./socket.js";

export const onHandleSubmit = (e) => {
  e.preventDefault();

  saveNote(noteForm["title"].value, noteForm["description"].value);
};
