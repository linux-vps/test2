import cron from 'node-cron';
import { refreshToken } from '../services/authService.js';

async function periodicTask() {
    try {
        await refreshToken();
    } catch (error) {
        console.error("Lỗi file cronJob.js:", error);
    }
}

// Thiết lập cron job để chạy mỗi 30 phút
cron.schedule('*/30 * * * *', periodicTask);

export default periodicTask;
