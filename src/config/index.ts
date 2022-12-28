import * as dotenv from 'dotenv';
dotenv.config();

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const onMaintenance = process.env.ON_MAINTENANCE;
export const databaseUrl = process.env.DATABASE_URL;
export const signature = process.env.SIGNATURE;
export const appKey = process.env.APP_KEY;
export const serverUrl = process.env.SERVER_URL;
export const frontendUrl = process.env.FRONTEND_URL;
export const logDir = process.env.LOG_DIR;
export const emailUser = process.env.EMAIL_USER;
export const emailpass = process.env.EMAIL_PASS;
export const emailhost = process.env.EMAIL_HOST;
export const emailfrom = process.env.EMAIL_FROM;
