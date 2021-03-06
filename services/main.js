const puppeteer = require('puppeteer')
const fs = require('fs')

const main = async () => {
    const url = 'https://orf.at/'

    const { default: fetch } = await import('node-fetch')
    const request = await fetch(url)
    const response = await request.text()

    const check = response.includes('oon-grid-item-version-4k')
    if (!check) { return null }


    const path = `${__dirname}/screenshot.jpg`
    if (fs.existsSync(path)) { fs.unlinkSync(path) }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
        defaultViewport: { width: 1100,  height: 700, deviceScaleFactor: 2 }
    });
    const page = await browser.newPage()
    await page.setJavaScriptEnabled(false)
    await page.goto(url);
    await page.screenshot({ path })
    return path
}

module.exports = main