const socket = io();

export const loadNotes = (callback) => {
  socket.on("server:loadnotes", callback);
};

export const saveNote = (title, description) => {
    socket.emit('client:newnote', {
        title,
        description
    })
}

export const onNewNote = (callback) => {
  socket.on('server:newnote', callback)
}
