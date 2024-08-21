import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt-util.js';
import ErrorHandler from '../utils/utility-class.js';

export const authenticateJWT = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return next(new ErrorHandler('Access denied', 403));

    try {
        const decoded = await verifyToken(token);
        req.decodedToken= decoded; 
        next();
    } catch (err) {
        next(new ErrorHandler('Invalid token', 401));
    }
};
