import dotenv from 'dotenv';

dotenv.config();

export const __port__ = process.env.PORT || 5005;
export const __prod__ = process.env.NODE_ENV === 'production' ? true : false;
export const __db__ = process.env.MONGO_URI;
