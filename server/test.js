import fetch from 'node-fetch';

async function getFinalUrlAndParams() {
    try {
        let url = 'https://b24-r089mi.bitrix24.vn/oauth/authorize/?client_id=local.66ccd88ee28e20.41158133';

        while (true) {
            // Gửi yêu cầu đến URL hiện tại
            const response = await fetch(url, {
                redirect: 'manual' // Không tự động theo dõi redirect
            });

            // Kiểm tra nếu có chuyển hướng
            const location = response.headers.get('location');
            if (location) {
                url = location; // Cập nhật URL với địa chỉ chuyển hướng
                console.log('Chuyển hướng đến:', url);
            } else {
                // Không còn chuyển hướng nữa, dừng vòng lặp
                break;
            }
        }

        // Lấy URL cuối cùng và phân tích tham số
        const finalUrl = url;
        console.log('URL cuối cùng:', finalUrl);

        // Phân tích URL cuối cùng để trích xuất tham số
        const parsedUrl = new URL(finalUrl);
        const params = new URLSearchParams(parsedUrl.search);

        // In ra các tham số
        console.log('Tham số query string:');
        for (const [key, value] of params) {
            console.log(`${key}: ${value}`);
        }
    } catch (error) {
        console.error('Lỗi khi xử lý yêu cầu:', error);
    }
}

getFinalUrlAndParams();
