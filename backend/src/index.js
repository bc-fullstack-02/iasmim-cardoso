const express = require("express");
const app = express();
const userRoute = require("./routers/users")
const authRoute = require("./routers/security");
const { User } = require("./models");

app.use(express.json());

app.use("/api/v1/users" , userRoute);
app.use("/api/v1/auth" , authRoute);

app.listen(3000,()=>{
    console.log("Backend server is working!");
});