require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
// const swaggerJson = require("./swagger.json");
const app = express();
const { UserRouter, SecurityRouter, PostRouter, ProfileRouter, FeedRouter } = require("./routers");
const authenticateToken = require("./middleware/auth");
// const pubsub = require("./pubsub");
const socketio = require("socket.io");
const jwt = require('jsonwebtoken');
const { User } = require('./models');

// const io = socketio(app, {
//     cors: {
//         origin: "*",
//     }
// })


// const liveData = io.of('/v1');

// liveData.use((socket, next) => {
//     if(socket.handshake.auth && socket.handshake.auth.token) {
//         jwt.verify(socket.handshake.auth.token, process.env.TOKEN_SECRET, (err, user) => {
//             if(err) return next(new Error("Authentication error"));
//             User.findOne({user}).populate('profile')
//             .then(userFound => {
//                 if(user){
//                     socket.profile = userFound.profile;
//                     next();
//                 } else {
//                     next(new Error("Authentication error"));
//                 }
//             })
//         });
//     } else {
//         next(new Error("Authentication error"));
//     }
// })

// liveData.on('connection', socket => {
//     console.warn(`a user connected live ${socket.profile.name}`);

//     socket.on('disconnect', () => console.log(socket.connected));
//     socket.on('error', (err) => console.error(err));
//     socket.emit('connect_profile', socket.profile);
// });
app.use(cors());
app.use(express.json());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
// app.use(pubsub.pub); 

// pubsub.sub().then((sub) => {
//     sub.on('message', (message, content, ackOrNack) => {
//         ackOrNack();
//         Object.entries(Object.fromEntries(liveData.sockets))
//             .filter(([, v]) => content.keys.includes(v.profile._id.toString()))
//             .map(([k, v]) => v.emit(content.type, content.payload));
//     })
// }).catch(console.error);

app.use("/api/v1/users", authenticateToken, UserRouter);
app.use("/api/v1/security", SecurityRouter);
app.use("/api/v1/posts", authenticateToken, PostRouter);
app.use("/api/v1/profile", authenticateToken, ProfileRouter);
app.use("/api/v1/feed", authenticateToken, FeedRouter);


app.listen(3000, () => {
    console.log("Backend server is working!");
});