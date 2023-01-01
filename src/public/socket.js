const socket = io();

export const loadNotes = () => {
  socket.on("loadnotes", (data) => {
    console.log(data);
  });
};

export const saveNote = (title, description) => {
    socket.emit('newnote', {
        title,
        description
    })
}
