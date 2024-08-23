import mongoose from 'mongoose';


export const validateName = (name: any) => typeof name === 'string' && name.trim() !== '';
export const validatePassword = (password: any) => typeof password === 'string' && password.length >= 6;
export const validateEmail = (email: any) => typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidObjectId = (id: string): boolean => {
    return mongoose.Types.ObjectId.isValid(id);
};
export const validateGroupName = (name: string): boolean => {
    return typeof name === 'string' && name.trim().length > 0;
};

export const validateGroupDescription = (description?: string): boolean => {
    return !description || typeof description === 'string';
};
export const validPaymentMethods = ["CASH", "BANK_TRANSFER", "UPI"] as const;

export function validatePaymentMethod(method: string): boolean {
    return validPaymentMethods.includes(method as typeof validPaymentMethods[number]);
}