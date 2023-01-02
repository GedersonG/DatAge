import app from "./app";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import sockets from "./sockets";
import { PORT } from "./config";
import { connectDB } from "./db";

connectDB();

const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log("Server is listening on port ", PORT);

const io = new WebSocketServer(httpServer);
sockets(io);
