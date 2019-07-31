# 短綱址產生器

## Contents
- [簡介](#簡介)
- [環境建置與需求](#環境建置與需求)
- [軟體](#軟體)
- [clone 與安裝相依套件](#clone-與安裝相依套件)
- [執行方式](#執行方式)
- [系統網址](#系統網址)
- [相關 API 說明](#相關-api-說明)
- [功能](#功能)
- [畫面](#畫面)
- [Change Logs](#change-logs)
- [Contributor](#contributor)

## 簡介
* 將原始長網址產生短網址

## 環境建置與需求
* body-parser: ^1.19.0
* connect-flash: ^0.1.1
* crypto: ^1.0.1
* express: ^4.17.1
* express-handlebars: ^3.1.0
* express-session: ^1.16.2
* express-validator: ^6.1.1
* handlebars: ^4.1.2
* moment: ^2.24.0
* mongoose: ^5.6.5

## 軟體
* Visual Studio Code
* Git
* MongoDB

## clone 與安裝相依套件
* 請在 `Console` 輸入下方指令
  * 從 GitHub Clone 專案
  ```
  git clone https://github.com/ArcherHuang/URL-Shortener.git
  ```
  * 切換路徑到專案資料夾
  ```
  cd ./URL-Shortener
  ``` 
  * 安裝相關套件
  ``` 
  npm install
  ``` 
  * 透過 Visual Studio Code 開啟專案
  ``` 
  code .
  ``` 

## 執行方式
* 請在 `Console` 輸入下方指令
  * 啟動專案
  ```
  npm run dev
  ```

## 系統網址

* 本地端啟動程式
  * IP Address
    * http://localhost:3000/

## 相關 API 說明

| 編號 | API | 說明  |
|:---:|---|---|
| 1 | 產生短網址頁面 | GET http://localhost:3000/ |
| 2 | 產生短網址 | GET http://localhost:3000/shortUrl |
| 3 | 解析短網址 | GET http://localhost:3000/:shortId |

## 功能

| 編號 | 功能 | 說明  |
|:---:|:---:|---|
| 1 | 產生短網址 | ① 使用者輸入長網址後產生一組短網址並顯示於畫面上 |
| 2 | 解析短網址 | ① 將短網址解析成相對應的長網址後開啟新頁籤 |

## 畫面

![](https://oranwind.s3.amazonaws.com/2019/Jul/_____2019_07_23___8_27_02-1563842054438.png)

## Change Logs

* https://github.com/ArcherHuang/AC/commits/master/Third/URL-Shortener

## Contributor
* [Archer Huang](https://github.com/archerhuang)
