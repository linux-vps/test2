## Demo
- Web app với ngrok tunel: ( Nếu trang không có dữ liệu trong bảng, vui lòng refresh lại ạ )
  - https://d028-47-84-81-252.ngrok-free.app/
  - https://ef61-3-1-203-129.ngrok-free.app/
- Video demo dưới đây dài 5 phút

[![Demo video](https://img.youtube.com/vi/BJ2MwkFwYYs/0.jpg)](https://www.youtube.com/watch?v=BJ2MwkFwYYs)

## Chuẩn bị
##### Bitrix24 OAuth 2.0: https://api.postman.com/collections/34247664-f81670c2-998b-4f5c-abcb-e9ec6aca61a3?access_key=PMAT-01J6AEPZ7CZG6K36PCYK5EGGP2
##### File biến môi trường .env:
###### server:
  - CLIENT_URL=<https://domain/path> (frontend url))
  - APP_ID=<application_id> (Application ID (client_id), e.g.: local.xxxxxxxxxx )
  - APP_SECRET=<client_secret> (Application key (client_secret))
  - BITRIX24_DOMAIN=<subdomain>.bitrix24.vn
  - CODE=<code ở url> ( bước chuẩn bị oauth )
  - REFRESH_TOKEN=<refresh_token>
  - PORT=<server_port> ( 5000).

###### public:
  - BACKEND_SERVER_URL=<server_address>/api/ 
  - PORT=<client_port> (5001)
## Cài đặt nhanh
lệnh bên dưới hỗ trợ cài Node và các thư viện cần thiết
```
bash <(curl -Ls https://raw.githubusercontent.com/linux-vps/test2/main/install.sh)
```
để deploy, chạy lệnh dưới đây trong thư mục dự án:
```bash
./deploy.sh
```

## Các bước cài đặt cho linux

### Bước 1: Cài đặt NodeJS và NPM sử dụng nvm

Đầu tiên, cần đăng nhập bằng tài khoản root hoặc user có quyền root

```bash
sudo su
```

Cài đặt node version manager (nvm).

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```
Activate nvm.

```bash
. ~/.nvm/nvm.sh
```

Dùng nvm để cài đặt Nodejs
```bash
nvm install node
```

Kiểm tra đã có node và npm chưa:

```bash
node -v
npm -v
```

### Bước 2: Cài PM2
- PM2 giúp web app luôn chạy.
```bash
npm install pm2@latest -g && pm2 update
```
kiểm tra:
 ```bash
 pm2 --version
 ```

### Bước 3: Cài Git và clone repository từ GitHub

```bash
sudo apt-get update -y
sudo apt-get install git -y
```

Kiểm tra git đã được cài hay chưa:

```bash
git --version
```

clone project từ github:

```bash
git clone https://github.com/linux-vps/test2.git
```

chuyển vào thư mục test2
```bash
cd test2
```


Đổi tên file ".env.example" thành ".env"

 ```bash
 cd public
 mv .env.example .env
 cd ..
 cd server
 mv .env.example .env
 cd ..
 
 ```
Chạy web app

Navigate vào thư mục server:
```bash
cd server
npm install
pm2 start index.js --watch --ignore-watch "node_modules,config" --name "server"
```
Navigate vào thư mục public:
Có thể do web app xây dựng trên window nên khi cài thư viện trên linux mất thời gian.
Còn thư mục public này cài hơi lâu.
```bash
cd public
npm install
npm run build
pm2 start index.js --watch --ignore-watch "node_modules,config" --name "public"
```
### Một số tài liệu tham khảo:
 1. OAuth 2.0 Protocol:
    https://training.bitrix24.com/support/training/course/?COURSE_ID=169&LESSON_ID=20110
    https://training.bitrix24.com/rest_help/oauth/index.php
 3. Ngrok:
    https://ngrok.com/download
 4. REST
    https://training.bitrix24.com/rest_help/
 5. Batch method:
    https://training.bitrix24.com/rest_help/general/batch.php
### Postman ví dụ về việc sử dụng CRM REST API của Bitrix24.
***Example in postman***:
    - https://gist.github.com/gowizzard/3ae79b5fb3b4a73494e3c790c6d820c6
