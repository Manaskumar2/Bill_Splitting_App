import bcrypt from 'bcryptjs';
export const encryptWithBcrypt = (text) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text, salt);
};
export const verifyWithBcrypt = (text, hash) => {
    return bcrypt.compareSync(text, hash);
};
