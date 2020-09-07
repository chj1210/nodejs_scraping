# nodejs_scraping
2020_my_learning
Node.js 網路爬蟲
1. 使用 [cURL](https://curl.haxx.se/ "command line tool and library for transferring data with URLs") 來取得動態、靜態的網頁資訊。
2. 使用 [nightmare.js](https://github.com/segmentio/nightmare "A high-level browser automation library") 來取得動態網頁元素生成的頁面資訊。
3. 使用 [Selenium Dev](https://selenium.dev/documentation/en/ "Selenium Dev") 來取得動態網頁元素生成的頁面資訊。


## 用途
1. 為 node.js 開發者建立的深度爬蟲操作範例
2. 爬取結果轉換成 JSON，可以進行資料交換


## 建議使用套件列表
- nightmare
- jquery
- jsdom
- moment
- selenium-webdriver
```
$ npm i nightmare jquery jsdom moment selenium-webdriver --save
```
若是你已經取得本專案，尤其專題資料夾裡面有 package.json，請直接使用：
```
$ npm i --save
```
