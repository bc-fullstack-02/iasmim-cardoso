require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
// const swaggerJson = require("./swagger.json");
const app = express();
const { UserRouter, SecurityRouter, PostRouter, ProfileRouter, FeedRouter } = require("./routers");
const authenticateToken = require("./middleware/auth");
const pubsub = require("./pubsub");
const bodyParser = require("body-parser");
const path = require("path");

app.use(cors());
app.use(pubsub.pub);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const urlencodendMiddleware = bodyParser.urlencoded({
    extended: true
})
app.use((req, res, next) => (/ˆmultipart\//i.test(req.get('Content-type'))) ? next() : urlencodendMiddleware(req, res, next))
app.use(bodyParser.json({
    defer: true
}))
app.use("/api/v1/users", authenticateToken, UserRouter);
app.use("/api/v1/security", SecurityRouter);
app.use("/api/v1/posts", authenticateToken, PostRouter);
app.use("/api/v1/profiles", authenticateToken, ProfileRouter);
app.use("/api/v1/feed", authenticateToken, FeedRouter);


module.exports = app;