import puppeteer from "puppeteer";

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        devtools: true,
    });

    const page = await browser.newPage();

    await page.goto("http://192.168.1.113:3040/xarm_python_sdk/continuous_inear_motion.html", {
        // waitUntil: "networkidle2"
    });


    const height = await page.evaluate(() => document.documentElement);

    console.log('height==>', page.browserContext().documentElement);



    await page.pdf({
        path: "hni.pdf",
        format: 'A4',
        printBackground: true, // 是否打印背景
        margin: {
            bottom: 50,
            left: 25,
            right: 25,
            top: 50,
        },
    });

    await browser.close();
})();