import { User } from '../Models/user.js';
import { encryptWithBcrypt, verifyWithBcrypt } from '../utils/encryption-util.js';
import ErrorHandler from '../utils/utility-class.js';
// Import ErrorHandler class
// Create a new user
export const createUser = async (data) => {
    try {
        const password = data.password;
        const hashedPassword = encryptWithBcrypt(password);
        const newUser = new User({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });
        return await newUser.save();
    }
    catch (err) {
        throw new ErrorHandler(`User creation failed: ${err.message}`, 500);
    }
};
// Authenticate a user
export const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user)
            throw new ErrorHandler('User not found', 404);
        const isMatch = verifyWithBcrypt(password, user.password);
        if (!isMatch)
            throw new ErrorHandler('Invalid password', 401);
        return user;
    }
    catch (err) {
        throw new ErrorHandler(`Authentication failed: ${err.message}`, 500);
    }
};
export const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user)
            throw new ErrorHandler('User not found', 404);
        return user;
    }
    catch (err) {
        throw new ErrorHandler(`Failed to get user: ${err.message}`, 500);
    }
};
export const updateUser = async (id, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser)
            throw new ErrorHandler('User not found', 404);
        return updatedUser;
    }
    catch (err) {
        throw new ErrorHandler(`Failed to update user: ${err.message}`, 500);
    }
};
export const getAllUsers = async () => {
    try {
        return await User.find();
    }
    catch (err) {
        throw new ErrorHandler(`Failed to get users: ${err.message}`, 500);
    }
};
