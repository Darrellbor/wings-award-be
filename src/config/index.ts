import * as dotenv from 'dotenv';
dotenv.config();

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const onMaintenance = process.env.ON_MAINTENANCE;
export const databaseUrl = process.env.DATABASE_URL;
export const serverUrl = process.env.SERVER_URL;
export const logDir = process.env.LOG_DIR;
