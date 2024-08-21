import { createUser, authenticateUser, getUserById, updateUser, getAllUsers } from '../services/user-service.js';
import { validateName, validateEmail, validatePassword } from '../utils/validators.js';
import ErrorHandler from '../utils/utility-class.js';
import { TryCatch } from '../middlewares/error.js';
export const createUserHandler = TryCatch(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!validateName(name))
        return next(new ErrorHandler('Invalid name format', 400));
    if (!validateEmail(email))
        return next(new ErrorHandler('Invalid email format', 400));
    if (password && !validatePassword(password))
        return next(new ErrorHandler('Password must be at least 6 characters long', 400));
    const newUser = await createUser({ name, email, password });
    if (newUser instanceof ErrorHandler) {
        return next(newUser);
    }
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: newUser
    });
});
export const loginHandler = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!validateEmail(email))
        return next(new ErrorHandler('Invalid email format', 400));
    if (!validatePassword(password))
        return next(new ErrorHandler('Password must be at least 6 characters long', 400));
    const user = await authenticateUser(email, password);
    if (user instanceof ErrorHandler)
        return next(user);
    res.status(200).json({
        success: true,
        user
    });
});
export const getUserByIdHandler = TryCatch(async (req, res, next) => {
    const user = await getUserById(req.params.id);
    if (!user)
        return next(new ErrorHandler('User not found', 404));
    res.status(200).json({
        success: true,
        user
    });
});
export const updateUserHandler = TryCatch(async (req, res, next) => {
    const { name, email, password } = req.body;
    const updateData = {};
    if (name) {
        if (!validateName(name))
            return next(new ErrorHandler('Invalid name format', 400));
        updateData.name = name;
    }
    if (email) {
        if (!validateEmail(email))
            return next(new ErrorHandler('Invalid email format', 400));
        updateData.email = email;
    }
    if (password) {
        if (!validatePassword(password))
            return next(new ErrorHandler('Password must be at least 6 characters long', 400));
        updateData.password = password;
    }
    const updatedUser = await updateUser(req.decodedToken.id, updateData);
    if (!updatedUser)
        return next(new ErrorHandler('User not found', 404));
    if (updatedUser instanceof ErrorHandler)
        return next(updatedUser);
    res.status(200).json({
        success: true,
        updatedUser
    });
});
export const getAllUsersHandler = TryCatch(async (req, res, next) => {
    const users = await getAllUsers();
    res.status(200).json({
        success: true,
        users
    });
});
