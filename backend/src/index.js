const app = require("./app");
const server = require("http").createServer(app);
const pubsub = require("./pubsub");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const { User } = require("./models");

const io = socketio(server, {
    cors: {
        origin: "*",
    }
})

const liveData = io.of('/v1');

liveData.use((socket, next) => {
    if(socket.handshake.auth && socket.handshake.auth.token) {
        jwt.verify(socket.handshake.auth.token, process.env.TOKEN_SECRET, (err, user) => {
            if(err) return next(new Error("Authentication error"));
            User.findOne({user}).populate('profile')
            .then(userFound => {
                if(user){
                    socket.profile = userFound.profile;
                    next();
                } else {
                    next(new Error("Authentication error"));
                }
            })
        });
    } else {
        next(new Error("Authentication error"));
    }
});

liveData.on('connection', socket => {
    console.warn(`a user connected live ${socket.profile.name}`);

    socket.on('disconnect', () => console.log(socket.connected));
    socket.on('error', (err) => console.error(err));
    socket.emit('connect_profile', socket.profile);
});

pubsub.sub().then((sub) => {
    sub.on('message', (message, content, ackOrNack) => {
        ackOrNack();
        Object.entries(Object.fromEntries(liveData.sockets))
            .filter(([, v]) => content.keys.includes(v.profile._id.toString()))
            .map(([k, v]) => v.emit(content.type, content.payload));
    })
}).catch(console.error);

server.listen(process.env.PORT || 3000, () => {
    console.log('Backend server is working!');
});