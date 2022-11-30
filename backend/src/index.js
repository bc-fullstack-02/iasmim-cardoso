const express = require("express");
const app = express();
const userRoute = require("./routers/users.js")
const securityRoute = require("./routers/security.js");
// const postsRoute = require("./routers/posts");
// const profileRoute = require("./routers/profile.js");
const { User } = require("./models");

app.use(express.json());

app.use("/api/v1/users" , userRoute);
app.use("/api/v1/security", securityRoute);
// app.use("/api/v1/posts" , postsRoute);
// app.use("/api/v1/profile", profileRoute);



app.listen(3000,()=>{
    console.log("Backend server is working!");
});