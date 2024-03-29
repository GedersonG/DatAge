import { saveNote, deleteNote, getNoteById, updateNote } from "./socket.js";

const noteList = document.querySelector("#notes");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

let saveId = "";

const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-title rounded-0 animate__animated animate__fadeInUp">
    <h3>${note.title}</h3>
    <div class="d card-body justify-content-between mb-2">
    <p>${note.description}</p>    
    </div>
    <div class="btns-container">
    <button class="btn btn-danger btn-sm delete" data-id="${note._id}">Delete</button>
    <button class="btn btn-secondary btn-sm update" data-id="${note._id}">Update</button>
    </div>
    
    
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

export const fillForm = (note) => {
  title.value = note.title;
  description.value = note.description;
  saveId = note._id;
};

export const onHandleSubmit = (e) => {
  e.preventDefault();

  if (saveId) {
    updateNote(saveId, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }

  saveId = "";
  title.value = "";
  description.value = "";
};

export const appendNote = (note) => {
  noteList.append(noteUI(note));
};
