const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config()
const port = process.env.PORT
const mongoUrl = process.env.MONGODB_URL;
const userRoutes = require("./routes/userRoute")
const messageRoutes = require("./routes/messageRoute");
const socket = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)

mongoose.connect(mongoUrl, {useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Database connected successfully!")
}).catch((error)=>{
    console.log(error.message)
})

const server = app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

const io = socket(server, { 
    cors:{
        origin: 'https//localhost:3000',
        credentials:true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("socket", socket);
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });
    
    socket.on("send-msg", (data) => {
        console.log("message", {data})
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.message)
        }
    });
})