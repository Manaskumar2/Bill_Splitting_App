import jwt from 'jsonwebtoken';
import config from '../config/app-config.js';

export const generateJWTToken = (payload: any) => {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn:config.JWT_REFRESH_EXPIRY_TIME, });
};

export const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, config.JWT_SECRET);
    } catch (err) {
        throw new Error('Invalid token');
    }
};
