import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const __dirName = path.resolve();
const io = new Server(server);

app.get("/", (req, res) => {
  // res.send("Hello from web sockets");
  res.sendFile(__dirName + "/public/index.html");
});

// setting up ws connection
io.on("connection", (socket) => {

  // for displaying messages to all users
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // emitting the messages to all joined users.
  });

  // Handling user is typing info
  socket.on("user typing", () => {
     socket.broadcast.emit("user typing", "A user is typing message...");
  });

   // Handling user stopped typing event
  socket.on("user stopped typing", () => {
    socket.broadcast.emit("user stopped typing");
  });

});

server.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
