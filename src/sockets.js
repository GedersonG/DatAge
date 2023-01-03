import Note from "./models/Note";
import Message from "./models/Message";

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New connection --> ", socket.id);
    const emitNotes = async () => {
      const notes = await Note.find();

      io.emit("server:loadnotes", notes);
    };
    emitNotes();

    const emitMessages = async () => {
      const messages = await Message.find();
      socket.emit("server:loadmessages", messages);
    };
    emitMessages();

    socket.on("client:newnote", async (data) => {
      console.log("Data is --> ", data);
      const newData = new Note(data);
      console.log("NewData is --> ", newData);
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

    socket.on("chat:delete", async () =>{
      await Message.deleteMany();
      io.emit("server:deleteNote")
    })

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

    socket.on("chat:message", async (data) => {
      const newMessage = new Message(data);
      const savedMessage = await newMessage.save();
      io.emit("chat:message", {
        savedMessage,
        id: socket.id
      });
    });

    socket.on("chat:typing", (data) => {
      socket.broadcast.emit("chat:typing", data);
    });

    socket.on("chat:obtenerid", (data) => {
      socket.emit("chat:getid", socket.id);
    });
  });
};
