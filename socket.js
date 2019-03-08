const { port } = require("./config");
const socket = require("socket.io");

module.exports = (app) => {
    const server = app.listen(port, () => {
        console.log("Server started on port " + port);
    });

    const io = socket(server);
    io.on("connection", (socket) => {
        console.log("Made a socket connection",socket.id);
        socket.on("chat", (data) => {
            io.sockets.emit("chat", data);
        });
        
        socket.on("typing", (user) => {
            socket.broadcast.emit("typing", user);
        });
    });

}
