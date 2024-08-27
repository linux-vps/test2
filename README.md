## __DEMO:__
- https://d028-47-84-81-252.ngrok-free.app

## Description

Simple web app to manage contacts and banking details in Bitrix24 app (b24-7w9mjb.bitrix24.vn)
Using NodeJS, for client and server. Display HTML by simple EJS view engine.
- web app with ngrok tunel: https://d028-47-84-81-252.ngrok-free.app/
- web app in bitrix24: check this video below

https://github.com/user-attachments/assets/3a37ddf4-9047-4180-aaa7-08a4dc0ee3d5



### Some documentation about this project:
 1. OAuth 2.0 Protocol:
    https://training.bitrix24.com/support/training/course/?COURSE_ID=169&LESSON_ID=20110
    https://training.bitrix24.com/rest_help/oauth/index.php
 3. Ngrok:
    https://ngrok.com/download
 4. REST
    https://training.bitrix24.com/rest_help/
 5. Batch method:
    https://training.bitrix24.com/rest_help/general/batch.php
### An little collection for postman for the crm module of bitrix24.
***Example in postman***:
    - https://gist.github.com/gowizzard/3ae79b5fb3b4a73494e3c790c6d820c6

## Prepare
- Bitrix24 OAuth 2.0: https://api.postman.com/collections/34247664-f81670c2-998b-4f5c-abcb-e9ec6aca61a3?access_key=PMAT-01J6AEPZ7CZG6K36PCYK5EGGP2
 
## Quick install
paste this section bellow in your terminal.
```
bash <(curl -Ls https://raw.githubusercontent.com/linux-vps/test2/main/install.sh)
```

## Installation

### Step 1: Install NodeJS and NPM using nvm

First, log in as the root user or a user with sudo privileges.

```bash
sudo su
```

Install node version manager (nvm) by typing the following at the command line.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```
Activate nvm by typing the following at the command line.

```bash
. ~/.nvm/nvm.sh
```

Use nvm to install the latest version of Node.js by typing the following at the command line.

```bash
nvm install node
```

Test that node and npm are installed and running correctly by typing the following at the terminal:

```bash
node -v
npm -v
```

### Step 2: Install Git and clone repository from GitHub
To install git, run below commands in the terminal window:

```bash
sudo apt-get update -y
sudo apt-get install git -y
```
or 
```bash
sudo yum update -y
sudo yum install git -y
```

Just to verify if system has git installed or not, please run below command in terminal:
```bash
git --version
```

This command will print the git version in the terminal.

Run below command to clone the code repository from Github:

```bash
git clone https://github.com/linux-vps/test2.git
```

Navigate to the test2 first.
```bash
cd test2
```


 Change all .env.example to .env
 Return to the test2 folder and typing this.
 ```bash
 cd public
 mv .env.example .env
 cd ..
 cd server
 mv .env.example .env
 cd ..
 
 ```
Now just run it

Navigate to the server directory, install dependencies, and start the server:
```bash
cd server
npm install
npm start
```
Open a new terminal, navigate to the public directory, install dependencies, build the project, and start the front-end:
this can take long time and might show some warn, don't be worried about that. Keep waiting :D ...
```bash
cd public
npm install
npm run build
npm start
```

## We can keep the web alive with PM2

