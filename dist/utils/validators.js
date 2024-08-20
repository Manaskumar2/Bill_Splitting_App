export const validateName = (name) => typeof name === 'string' && name.trim() !== '';
export const validateEmail = (email) => typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePassword = (password) => typeof password === 'string' && password.length >= 6;
