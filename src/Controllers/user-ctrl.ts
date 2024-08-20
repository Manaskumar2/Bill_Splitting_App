import { Request, Response, NextFunction } from 'express';
import { createUser, authenticateUser, getUserById, updateUser, getAllUsers } from '../services/userService.js';
import { validateName, validateEmail, validatePassword } from '../utils/validators.js';
import ErrorHandler from '../utils/utility-class.js';
import { TryCatch } from '../middlewares/error.js';

export const createUserHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!validateName(name)) return next(new ErrorHandler('Invalid name format', 400));
    if (!validateEmail(email)) return next(new ErrorHandler('Invalid email format', 400));
    if (password && !validatePassword(password)) return next(new ErrorHandler('Password must be at least 6 characters long', 400));

    const newUser = await createUser({ name, email, password });
    res.status(201).json({
        success: true,
        user: newUser
    });
});

export const login = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);
    res.status(200).json({
        success: true,
        user
    });
});

export const getUserByIdHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserById(req.params.id);
    res.status(200).json({
        success: true,
        user
    });
});

export const updateUserHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.status(200).json({
        success: true,
        updatedUser
    });
});

export const getAllUsersHandler = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const users = await getAllUsers();
    res.status(200).json({
        success: true,
        users
    });
});
