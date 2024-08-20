import bcrypt from 'bcryptjs';

export const encryptWithBcrypt = (text: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text, salt);
};

export const verifyWithBcrypt = (text: string, hash: string): boolean => {
    return bcrypt.compareSync(text, hash);
};