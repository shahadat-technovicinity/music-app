import { User } from "../users/model.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";


const registerService = async ({ name, email, password, role,fileUrl }) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        photo: fileUrl?.secure_url
        });
    
        // Save the user to the database
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}   

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    }
    catch (error) {
        console.error("Error finding user by email:", error);
        throw error;
    }  
}

export { registerService, findUserByEmail };