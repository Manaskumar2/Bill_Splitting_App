import { IUser, User } from '../models/user.js';
import { encryptWithBcrypt, verifyWithBcrypt } from '../utils/encryption-util.js';
import { generateJWTToken } from '../utils/jwt-util.js';
import ErrorHandler from '../utils/utility-class.js';

export const createUser = async (data: any): Promise<IUser | ErrorHandler> => {
    try {

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return new ErrorHandler('User already exists. Please login.', 401);
        }
        const password = data.password;
        const hashedPassword = encryptWithBcrypt(password);

        const newUser: IUser = new User({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });

        return await newUser.save();

    } catch (err: any) {
        return new ErrorHandler(`User creation failed: ${err.message}`, 500);
    }
};

export const authenticateUser = async (email: string, password: string) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return new ErrorHandler('User not found', 404);

        const isMatch = verifyWithBcrypt(password, user.password);
        if (!isMatch) return new ErrorHandler('Invalid password', 401);

        const token = await generateJWTToken(user.id.toString() + new Date().getTime(),user.id)

        return {user,token};
    } catch (err:any) {
        return new ErrorHandler(`Authentication failed: ${err.message}`, 500);
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await User.findById(id);
        if (!user) return new ErrorHandler('User not found', 404);

        return user;
    } catch (err:any) {
        throw new ErrorHandler(`Failed to get user: ${err.message}`, 500);
    }
};

export const updateUser = async (id: string, updateData: Partial<IUser>) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) return new ErrorHandler('User not found', 404);

        return updatedUser;
    } catch (err:any) {
        return new ErrorHandler(`Failed to update user: ${err.message}`, 500);
    }
};

export const getAllUsers = async () => {
    try {
        return await User.find().select({password:0});
    } catch (err:any) {
        return new ErrorHandler(`Failed to get users: ${err.message}`, 500);
    }
};
