import dotenv from "dotenv";
import {app} from "./app.js";
import {connectDB} from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
