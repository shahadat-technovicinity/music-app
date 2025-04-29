// import dotenv from "dotenv";
// import express from 'express';
// import {app} from "./app.js";
// import {connectDB} from "./config/db.js";
// import { Server } from "socket.io";
// dotenv.config();
// const PORT = process.env.PORT || 8080;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.IO server
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });


// connectDB()
//   .then(() => {
//     console.log("Connected to MongoDB");
//     // Start the server
//     server.listen(PORT, () => {
//       console.log("Server is running at http://localhost:${PORT}");
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//     // stop the server if the connection fails
//     process.exit(1);
//   });


import dotenv from "dotenv";
import express from "express";
import http from "http"; // ✅ Import http module
import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 8081;

// Use middleware before server creation
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    credentials: true,
  },
});

// Optional: handle connection events
io.on("connection", (socket) => {
  // console.log(`🔌 New client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    // console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Connect to DB and start server
connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`); // ✅ Use backticks
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Stop the server on DB connection failure
  });
