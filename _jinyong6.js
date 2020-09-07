const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true, width: 512, height: 480 });
const fs = require('fs');

//引入 jQuery 機制
const { JSDOM } = require('jsdom');
const { window } = new JSDOM("");
const $ = require('jquery')(window);

//設定 request headers
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
};

//放置網頁元素(物件)
const arrLink = [];

//初始化設定
async function init() {
    //若沒有資料夾，則新增
    if (!await fs.existsSync(`download`)) {
        await fs.mkdirSync(`download`, { recursive: true });
    }
}

Name = []

async function getName() {

    await nightmare
        .goto('https://www.bookwormzz.com/zh/')
        .wait(1500)

    let html = await nightmare.evaluate(function() {
        return document.documentElement.innerHTML;
    });

    $(html)
        .find('a.ui-btn.ui-btn-icon-right.ui-icon-carat-r')
        .each((index, element) => {
            Name.push($(element).text())
        })
}

async function getTitle() {
    for (let i = 0; i < Name.length; i++) {
        await nightmare
            .goto('https://www.bookwormzz.com/' + Name[i] + '.php/0.xhtml#book_toc')
            .wait(1500)
        let html = await nightmare.evaluate(function() {
            return document.documentElement.innerHTML;
        });

        $(html)
            .find('div.ui-content div ul li a.ui-link')
            .each((index, element) => {
                arrLink.push(Name[i] + $(element).text())
            })
    }
    console.log(arrLink)
}

Content = []

async function getInfo() {
    for (let i = 0; i < Name.length; i++) {
        count = []
        await nightmare
            .goto('https://www.bookwormzz.com/' + Name[i] + '.php/0.xhtml#book_toc')
            .wait(500)
        let html = await nightmare.evaluate(function() {
            return document.documentElement.innerHTML;
        });

        $(html)
            .find('div.ui-content div ul li a.ui-link')
            .each((index, element) => {
                count.push($(element).text())
            })

        for (let j = 1; j <= count.length; j++) {
            await nightmare
                .goto('https://www.bookwormzz.com/' + Name[i] + '.php/' + j + '.xhtml', headers)
                .wait(1500)

            let html = await nightmare.evaluate(function() {
                return document.documentElement.innerHTML;
            });
            Content.push($(html).find('div#html.ui-content').text())
        }
    }
}

//關閉 nightmare
async function close() {
    await nightmare.end((err) => {
        if (err) { throw err; }
        console.log('關閉 nightmare...');
    })
}

//透過迴圈特性，將陣列中的各個 function 透過 await 逐一執行
async function asyncArray(functionList) {
    for (let func of functionList) {
        await func();
    }
}

(
    async function() {
        await asyncArray([
                init,
                getName,
                getTitle,
                getInfo,
                close
            ])
            .then(async() => {
                for (let i = 0; i < arrLink.length; i++) {
                    //console.dir(Content[i], { depth: null });
                    //新增檔案，同時寫入內容
                    await fs.writeFileSync(`download/` + arrLink[i] + `.txt`, JSON.stringify(Content[i], null, 4));
                }
                console.log('Done');
            });
    }
)();