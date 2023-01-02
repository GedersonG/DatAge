import { saveNote, deleteNote, getNoteById, updateNote } from "./socket.js";

const noteList = document.querySelector("#notes");
const title = document.querySelector("#title")
const description = document.querySelector("#description")

let saveId = "";

const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div>
    <h1>${note.title}</h1>
    <p>${note.description}</p>
    <button class="delete" data-id="${note._id}">Delete</button>
    <button class="update" data-id="${note._id}">Update</button>
  </div>
`;

  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", (e) => deleteNote(btnDelete.dataset.id));
  btnUpdate.addEventListener("click", (e) => getNoteById(btnUpdate.dataset.id));
  
  return div;
};

export const renderNotes = (notes) => {
  noteList.innerHTML = "";
  notes.forEach((note) => noteList.append(noteUI(note)));
};

export const fillForm = note => {
  title.value = note.title
  description.value = note.description
  saveId = note._id;
}

export const onHandleSubmit = (e) => {
  e.preventDefault();

  if(saveId) {
    updateNote(saveId, title.value, description.value);
  } else{
    saveNote(title.value, description.value);
  }

  saveId =""
  title.value=""
  description.value=""

};

export const appendNote = (note) => {
  noteList.append(noteUI(note));
};
