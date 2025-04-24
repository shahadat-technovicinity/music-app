import dotenv from "dotenv";
import express from 'express';
import {app} from "./app.js";
import {connectDB} from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
// connectDB();
// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log("Server is running at http://localhost:${PORT}");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // stop the server if the connection fails
    process.exit(1);
  });

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
