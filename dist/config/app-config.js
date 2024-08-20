import dotenv from 'dotenv';
dotenv.config();
const config = {
    port: process.env.PORT || 3000,
    JWT_REFRESH_EXPIRY_TIME: process.env.JWT_REFRESH_EXPIRY_TIME,
    DB_CONNECTION: process.env.DB_CONNECTION,
    JWT_SECRET: process.env.JWT_SECRET
};
export default config;
