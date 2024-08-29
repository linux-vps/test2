// server/utils/BX24.js

import fetch from 'node-fetch';
import { refreshToken, getToken } from '../services/authService.js';
import { BITRIX24_DOMAIN } from '../config/config.js';
import { response } from 'express';

/**
 * Bitrix24 REST API.
 * @param {String} method - ví dụ: 'user.get'
 * @param {Object} params - Đối tượng 
 * @returns {Promise<Object>} - promise
 */

async function callMethod(action, payload = {}) {
    let url = `https://${BITRIX24_DOMAIN}/rest/${action}.json`;

    let token = await getToken(); // lấy token
    url = new URL(url);
    url.searchParams.append('auth', token.access_token);
    const params = payload.params || null;
    const id = payload.ID || null;
    delete payload.params;
    delete payload.id;

    try {
        // call API
        let response = null;
        response = await callApi(url, payload, id, params);

        // Nếu token hết hạn
        if (response.status === 401 && response.statusText==='Unauthorized') {
            console.log("Renew token");

            token = await refreshToken(); // làm mới token
            url.searchParams.set('auth', token.access_token);

            
            // call API again
            response = await callApi(url, payload, id, params);
        }
        if (!response.ok) {
            const error = new Error(`Lỗi HTTP! status: ${response.status}`);
            error.response = response;
            throw error;
        }        

        // const result = await response.json();
        const result = await response;
        return result;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
};

async function callApi(url, payload, id, params){
    let addParams = "";
    let addId = "";
    if (params!=null){
        addParams = new URLSearchParams(params).toString();
    }
    if (id!=null){
        addId = `id=${id}`
    }
    let finalUrl = `${url}&${addId}&${addParams}`;
    console.log(finalUrl);
    const response = await fetch(finalUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response;
}

export default callMethod;