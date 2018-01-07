const puppeteer = require('puppeteer');
const config = require('./config');

const loginPage = 'https://kyfw.12306.cn/otn/login/init';
const queryTicketPage = 'https://kyfw.12306.cn/otn/leftTicket/init';
const loginApi = 'https://kyfw.12306.cn/passport/web/login';

(async () => {
    const browser = await puppeteer.launch({
        devtools: true,
        timeout: 5 * 60 * 1000, // 5 minute
    });

    const pages = await browser.pages();
    const page = pages.length ? pages[0] : await browser.newPage();
    page.setViewport({width: 1440, height: 900});

    page.on('response', async resp => {
        if (resp.url === loginApi && resp.status === 200) {
            await page.goto(queryTicketPage);
            // await page.type('#fromStationText', '上海');
        }
    });

    await page.goto(loginPage);
    await page.type('#username', config.username);
    await page.type('#password', config.password);
})();