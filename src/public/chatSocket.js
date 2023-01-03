const socket = io()

export const loadMessages = (callback) => {
    socket.on("server:loadmessages", callback)
}