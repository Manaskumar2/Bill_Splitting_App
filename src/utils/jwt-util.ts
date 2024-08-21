import jwt from 'jsonwebtoken';
import config from '../config/app-config.js';



export const  generateJWTToken = async(tokenKey:any,id:string) => {
    let data = {
			id: id,
			TOKEN_KEY: tokenKey,
		};
    return jwt.sign(data, config.JWT_SECRET, { expiresIn:config.JWT_REFRESH_EXPIRY_TIME, });
};

export const generateRefreshToken = async(tokenKey:any,id:string) => {
     let data = {
			id: id,
			TOKEN_KEY: tokenKey,
		};
    return jwt.sign(data, config.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken =  async(token: string) => {
    try {
        return jwt.verify(token, config.JWT_SECRET);
    } catch (err) {
        throw new Error('Invalid token');
    }
};
