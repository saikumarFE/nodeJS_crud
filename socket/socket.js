const { Server } = require("socket.io");

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        //console.log(io, socket.id);
        console.log(`✅ Client Connected: ${socket.id}`);

        socket.on("new_user", (data) => {
            console.log("📩 New User Event Received:", data);

            // Send acknowledgment back to the sender
            socket.emit("new_user_response", { message: "New user added!", user: data });
        });

        socket.on("update_user", (data) => {
            console.log("📩 Update User Event Received:", data);

            // Send acknowledgment back to the sender
            socket.emit("update_user_response", { message: "Update user added!", user: data });
        });


        // Example: Listening for a custom event from client
        socket.on("message", (data) => {
            console.log("Received message:", data);
            // Emit response event
            socket.emit("response", { message: "Message received from backend", data });
            //io.emit("response", { message: "Message received", data });

        });

        // Handle client disconnect
        socket.on("disconnect", () => {
            console.log(`❌ Client Disconnected: ${socket.id}`);
        });
    });
}

function emitEvent(event, data) {
    if (io) {
        console.log("EVENT DETAIL",event,data);
        io.emit(event, data);
    } else {
        console.error("🚨 WebSocket not initialized!");
    }
}

module.exports = { initializeSocket, emitEvent };
