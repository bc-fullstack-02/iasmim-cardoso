require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
// const swaggerJson = require("./swagger.json");
const app = express();
const { UserRouter, SecurityRouter, PostRouter, ProfileRouter, CommentsRouter } = require("./routers");
const authenticateToken = require("./middleware/auth");

app.use(cors());
app.use(express.json());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use("/api/v1/users", authenticateToken, UserRouter);
app.use("/api/v1/security", SecurityRouter);
app.use("/api/v1/posts", PostRouter);
app.use("/api/v1/profile", authenticateToken, ProfileRouter);
app.use("/api/v1/posts/", CommentsRouter);


app.listen(3000, () => {
    console.log("Backend server is working!");
});