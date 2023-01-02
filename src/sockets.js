import Note from "./models/Note";

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New connection --> ", socket.id);
    const emitNotes = async () => {
      const notes = await Note.find();

      io.emit("server:loadnotes", notes);
    };
    emitNotes();

    socket.on("client:newnote", async (data) => {
      const newData = new Note(data);
      /*
      También sirve -->
      const newData = new Note({
        title: data.title,
        description: data.descripcion
      })
      */
      const savedNote = await newData.save();
      io.emit("server:newnote", savedNote);
    });

    socket.on("client:deleteNote", async (id) => {
      await Note.findByIdAndDelete(id);
      emitNotes();
    });

    socket.on("client:getNote", async (id) => {
      const note = await Note.findById(id);
      io.emit("server:noteselected", note);
    });

    socket.on("client:updateNote", async (updatedNote) => {
      await Note.findByIdAndUpdate(updatedNote._id, {
        title: updatedNote.title,
        description: updatedNote.description,
      });
      emitNotes();
    });

    socket.on("chat:message", (data) => {
      data.id = socket.id;
      io.emit("chat:message", data);
    });

    socket.on("chat:typing", (data) => {
      socket.broadcast.emit("chat:typing", data);
    });

    socket.on("chat:obtenerid", (data) => {
      socket.emit("chat:getid", socket.id)
    });
  });
};
