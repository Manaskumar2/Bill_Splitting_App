export const validateName = (name: any) => typeof name === 'string' && name.trim() !== '';
export const validateEmail = (email: any) => typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePassword = (password: any) => typeof password === 'string' && password.length >= 6;
