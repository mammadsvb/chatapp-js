const express = require("express");
const config = require("config");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require("connect-flash");
const mongoose = require("mongoose");
const app = express();
const http =require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server)

const router = require('./src/routes')

mongoose.connect("mongodb://127.0.0.1:27017/Chatusers")
.then(()=>console.log("connected to database."))
.catch(()=>console.log("couldn't connect."));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(cookieParser(config.get("cookie-secret")));
app.use(session({
    secret: config.get('session-key'),
    resave: true,
    saveUninitialized: true
}));
app.use(flash())


app.use('/',router);

io.on("connection",socket =>{
    console.log("user connected.");
    socket.on("chat-massage",(msg,name) =>{
        io.emit("massage",msg,name);
    });
    // socket.on("logout",msg =>{
    //     re
    // })
})

const port = process.env.PORT || 3000

server.listen(port,()=> console.log(`connected to port ${port}.`));