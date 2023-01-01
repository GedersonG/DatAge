import Note from "./models/Note";

export default (io) => {
  io.on("connection", (socket) => {
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
      socket.emit("server:newnote", savedNote);
    });
  });
};
