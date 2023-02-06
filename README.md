# Expense Tracker [2023/2/6更新]
![image](https://github.com/ElynnaChuang/expense-tracker/blob/main/public/home-page.png)

## 功能：
1. 註冊帳號（註冊之後，可以登入/登出，只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁）
2. 在首頁瀏覽所有支出的清單＆總金額（只能看到自己的記帳紀錄）
3. 新增一筆支出
4. 編輯支出的屬性 (一次只能編輯一筆)
5. 刪除任何一筆支出 (一次只能刪除一筆)
6. 根據「類別」篩選支出


## 開發工具
- Node.js 16.17.1
- Express 4.16.4
- Express-Handlebars 3.0.0
- Express-Session 1.17.1
- passport 0.4.1
- bcryptjs 2.4.3
- connect-flash 0.1.1 
- mongoose 6.0.0
- Bootstrap 5.2.2
- Font Awesome 6.2.1


## 使用資料庫
- MongoDB

## 執行專案
請先確認有安裝 node.js、npm、nodemon

1. 將專案 clone 到本地

2. 在本地開啟之後，輸入：
   ```bash
   npm install
   ```

3. 透過終端機進入資料夾，輸入：
   ```bash
   npm run dev
   ```

4. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
   ```bash
   Running on http://localhost:3000
   mongodb connecting!

   ```

5. 若欲暫停使用，至終端機輸入：
   ```bash
   ctrl + c
   ```
