// config/config.js
import dotenv from 'dotenv';

dotenv.config();
// config từ file .env

export const BITRIX24_DOMAIN = process.env.BITRIX24_DOMAIN;
export const APP_SECRET = process.env.APP_SECRET;
export const APP_ID = process.env.APP_ID;
export const CODE = process.env.CODE;
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
export const CLIENT_URL = process.env.CLIENT_URL;
export const PORT = process.env.PORT || 5000;

if (!APP_SECRET || !BITRIX24_DOMAIN || !APP_ID || !CLIENT_URL) {
    throw new Error('Missing required environment variable');
}

// else
export const AUTHORIZATION_SERVER="https://oauth.bitrix.info/oauth/token/?grant_type=refresh_token";
export const TOKEN_STORAGE_FILE = "config/tokenStorage.json";
export const REFRESH_TOKEN_URL = `${AUTHORIZATION_SERVER}&client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${CODE}&refresh_token=${REFRESH_TOKEN}`;
//https://oauth.bitrix.info/oauth/token/?grant_type=refresh_token&client_id=local.xxx&client_secret=xxx&code=xxx&refresh_token=xxx