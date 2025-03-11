require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const orderRoutes = require("./routes/orderRoutes/orderRoutes");
const ConnectDB = require("./config/db");
const { initializeSocket } = require("./socket/socket"); // Import WebSocket

const app = express();
const PORT = process.env.PORT || 9000;

// Create an HTTP server and pass it to WebSocket
const server = http.createServer(app);

// Initialize WebSocket (Fixes unexpected response error)
initializeSocket(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect Database
ConnectDB();

// Attach WebSocket instance to request object (Optional)
app.use((req, res, next) => {
    req.io = require("./socket/socket").io; // Attach io instance
    next();
});

// Routes
app.use("/api", routes);
app.use("/order",orderRoutes);

app.get("/", (req, res) => {
    res.send("Hello Node.js");
});

// Start Server
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
