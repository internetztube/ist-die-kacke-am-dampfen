const puppeteer = require('puppeteer')
const fs = require('fs')

const service = async () => {
    const url = 'https://orf.at/'
    const path = `${__dirname}/screenshot.jpg`
    if (fs.existsSync(path)) { fs.unlinkSync(path) }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
        defaultViewport: { width: 1100,  height: 800, deviceScaleFactor: 10 }
    });
    const page = await browser.newPage()
    await page.setJavaScriptEnabled(false)
    await page.goto(url);

    const check = await page.evaluate(() => {
        return !document.querySelector('.oon-grid-item-version-4k')
    });

    if (!check) { return null }
    await page.screenshot({ path })
    return path
}

module.exports = service