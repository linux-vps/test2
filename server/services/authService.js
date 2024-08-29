// services/authService.js

import fetch from 'node-fetch';
import jsonfile from 'jsonfile';
import { APP_ID, APP_SECRET } from '../config/config.js';
const TOKEN_STORAGE_FILE = "config/tokenStorage.json";
//           làm mới token
export const refreshToken = async (req, res) => {
    const REFRESH_TOKEN_URL = 'https://oauth.bitrix.info/oauth/token';
    try {
        const token = await getToken();
        const url = new URL(REFRESH_TOKEN_URL);
        url.searchParams.append('grant_type', 'refresh_token');
        url.searchParams.append('client_id', APP_ID);
        url.searchParams.append('client_secret', APP_SECRET);
        url.searchParams.append('refresh_token', token.refresh_token);
        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(`Lấy access token thất bại: ${response.statusText}`);
        }

        const data = await response.json();
        await jsonfile.writeFile(TOKEN_STORAGE_FILE, { 
            refresh_token: data.refresh_token, 
            access_token: data.access_token 
        }); 

        return data;
    } catch (error) {
        console.error('Error getting access_token:', error.message);
        throw error; 
    }
};

export const getToken = async () => {
    try {
        const data = await jsonfile.readFile(TOKEN_STORAGE_FILE);
        return data;
    } catch (error) {
        console.error('Error reading token :', error.message);
        throw error; 
    }
};
