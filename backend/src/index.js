const express = require("express");
const app = express();
const {UserRouter, SecurityRouter , PostRouter, ProfileRouter} = require("./routers")
const { User } = require("./models");

app.use(express.json());

app.use("/api/v1/users" , UserRouter);
app.use("/api/v1/security", SecurityRouter);
app.use("/api/v1/posts" , PostRouter);
app.use("/api/v1/profile", ProfileRouter);



app.listen(3000,()=>{
    console.log("Backend server is working!");
});