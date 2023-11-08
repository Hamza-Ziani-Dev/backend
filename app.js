const express = require("express");
const mongoose = require("mongoose");
const { errorHandler, notFound } = require("./middlewares/error");
require('dotenv').config();


//Connection To DataBase:
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('Connect With Success ^_^'))
    .catch((err)=>console.log(err.message))



// Init Server:
const app = express();

// Meddlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers:
app.use("/api/auth", require("./routers/authRouter"));
app.use("/api/users", require("./routers/usersRouter"));
app.use("/api/posts", require("./routers/postRouter"));
app.use("/api/comments", require("./routers/commentsRouter"));
app.use("/api/categories", require("./routers/categoriesRouter"));


// Error Handler Middleware
app.use(errorHandler);
app.use(notFound);

//Runing The Services:
app.listen(process.env.PORT,(req,res)=>{
          console.log("Server Is Runing");
})



