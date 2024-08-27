import path from 'path';
import fs from 'fs';
import { CLIENT_URL } from '../config/config.js';

const handleError = (res, error, status = 500, statusText = 'Internal server') => {
    console.error('Error:', error); 
    if (status == 400 && statusText =='Bad Request' && error.error_description=='Not found'){
        return res.status(status).json({ 
            error: error.error_description,
            error_description: error.error_description, 
            message: 'Thông tin không tồn tại' });
    }
    if (status == 401 && statusText =='Unauthorized'){
        if(error.error=='invalid_token' && error.error_description=='Unable to get application by token'){
            return res.status(status).json({ 
                error: error.error_description,
                error_description: error.error_description, 
                message: 'Token không hợp lệ, có thể là do refresh token đã hết hạn' });
        }
        if(error.error=='expired_token' && error.error_description=='The access token provided has expired.'){
            return res.status(status).json({ 
                error: error.error_description,
                error_description: error.error_description, 
                message: 'Token đã hết hạn, vui lòng refresh và sử dụng token mới' });
        }    
    }
    return res.status(status).json({ 
        status: status, 
        statusText: statusText, 
        error: error, 
        error_description: 'callBatch error', 
        message: 'Báo cáo lỗi này cho lập trình viên' });
}; 


const dataFilePath = "./config/member_id.json";

const readData = () => {
    if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath);
        return JSON.parse(rawData);
    }
    return {};
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export const install = async (req, res) => {
    const { DOMAIN, PROTOCOL, LANG, APP_SID } = req.query;
    const { REFRESH_ID, member_id, AUTH_ID } = req.body;

    const data = readData();
    if(!member_id){
        return res.send({error: "Không ở trong ứng dụng bitrix24", message: 'Hãy đăng nhập vào bitrix24 và cài đặt' });
    }
    let fist_install = false;
    if (data[member_id]) {
        //  member_id đã tồn tại => cập nhật REFRESH_ID
        data[member_id].REFRESH_ID = REFRESH_ID;
        data[member_id].AUTH_ID = AUTH_ID;
        data[member_id].APP_SID = APP_SID;
        data[member_id].DOMAIN = DOMAIN;
        writeData(data);
    } else {
        // xác thực lần đầu => thêm mới
        data[member_id] = { REFRESH_ID, AUTH_ID, APP_SID, DOMAIN };
        writeData(data);
        fist_install = true;
    }
    
    const redirectUrl = `${CLIENT_URL}/?member_id=${member_id}&first_install=${fist_install}&message=${encodeURIComponent(fist_install ? 'Cài đặt lần đầu' : 'Đã từng cài đặt')}`;

    // frontend
    return res.redirect(redirectUrl);
};