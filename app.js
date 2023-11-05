const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();


//Connection To DataBase:
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('Connect With Success ^_^'))
    .catch((err)=>console.log(err.message))



// Init Server:
const app = express();

// Meddlewares:
app.use(express.json());

//Routers:
app.use("/api/auth", require("./routers/authRouter"));
app.use("/api/users", require("./routers/usersRouter"));

//Runing The Services:
app.listen(process.env.PORT,(req,res)=>{
          console.log("Server Is Runing");
})


