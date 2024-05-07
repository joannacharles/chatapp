const express=require("express")
const dotenv=require("dotenv")
const userRoutes=require('./routes/userRoutes')
const chatRoutes=require('./routes/chatRoutes')
const messageRoute=require('./routes/messageRoute')

const connectDB = require("./config/db")
const {notFound,errorHandler} = require("./controllers/errorController")
dotenv.config()

connectDB()
const app=express()

app.use(express.json())// to acceot json data

app.get('/',(req,res)=>{
    res.send("API is running")
})

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoute)

app.use(notFound)
app.use(errorHandler)

const PORT= process.env.PORT || 5000
const server= app.listen(PORT,console.log("server running on 5000"))
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

io.on("connection", (socket) => {
    console.log("Connected to socket.io hii"); 

    socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log("josocket ",userData.name)
      socket.emit("connected");
    });
    
    socket.on("join chat",(room)=>{
      socket.join(room)
      console.log(" joined room "+room)

    })

    socket.on("new message",(newMsgRecieved)=>{
      var chat=newMsgRecieved.chat
      
      if(!chat.users) return console.log("chat.users not defined")
       // console.log("Users are there jojo",chat)
      chat.users.forEach(u=>{
        if(u._id===newMsgRecieved.sender._id) return;

        socket.in(u._id).emit('message recieved',newMsgRecieved)
      })
    })

    socket.off("setup",()=>{
      console.log("USER DISCONNECTED")
      socket.leave(userData._id);
    })
})
  