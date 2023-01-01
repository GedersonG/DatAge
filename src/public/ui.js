import { saveNote } from "./socket.js";

const noteUI = note => {
  const div = document.createElement('div')
  div.innerHTML = `
  <div>
    <h1>${note.title}</h1>
    <p>${note.description}</p>
    <button>Delete</button>
    <button>Update</button>
  </div>
`;
return div;
}

const noteList = document.querySelector("#notes");
export const renderNotes = (notes) => {
  notes.forEach((note) => noteList.append(noteUI(note)));
};

export const onHandleSubmit = (e) => {
  e.preventDefault();

  saveNote(noteForm["title"].value, noteForm["description"].value);
};

export const appendNote = note => {
  noteList.append(noteUI(note))
}