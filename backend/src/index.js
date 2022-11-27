const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

mongoose.connect('mongodb://localhost:27017/myapp',()=>{
    console.log("Connected to MongoDB!!!")
});

app.use(express.json());

app.use("/api/users" , userRoute);
app.use("/api/auth" , authRoute);



app.listen(3000,()=>{
    console.log("Backend server is working!")
});