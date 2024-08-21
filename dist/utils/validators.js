import mongoose from 'mongoose';
export const validateName = (name) => typeof name === 'string' && name.trim() !== '';
export const validatePassword = (password) => typeof password === 'string' && password.length >= 6;
export const validateEmail = (email) => typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};
export const validateGroupName = (name) => {
    return typeof name === 'string' && name.trim().length > 0;
};
export const validateGroupDescription = (description) => {
    return !description || typeof description === 'string';
};
