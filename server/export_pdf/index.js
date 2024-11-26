const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors'); // 引入cors中间件
const path = require('path');
const app = express();
const port = 3030; // 你可以根据需要修改端口号


// 使用cors中间件，并配置允许的源
// app.use(cors({
//     origin: 'http://192.168.1.113:5173', // 设置允许的源，这里根据你的实际情况填写
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // 设置允许的请求方法，可根据需求调整
//     allowedHeaders: ['Content-Type', 'Authorization'] // 设置允许的请求头，可根据需求调整
// }));
app.use(cors())

// 内置方式处理POST请求体中的urlencoded数据（如表单提交的数据）
app.use(express.urlencoded({
    extended: false
}));
// 内置方式处理POST请求体中的json数据
app.use(express.json());
app.post("/", (req, res) => {
    res.send("Hello World");
})

// 设置http://192.168.1.1:3030/ufactory_docs.pdf 可以下载该文件
app.get('/ufactory_docs_en.pdf', (req, res) => {
    const file_path = path.join(__dirname, '../../pdf/ufactory_docs_en.pdf');
    res.sendFile(file_path);
});

app.get('/ufactory_docs_cn.pdf', (req, res) => {
    const file_path = path.join(__dirname, '../../pdf/ufactory_docs_cn.pdf');
    res.sendFile(file_path);
});

// 定义一个路由，用于处理生成PDF并返回下载资源的请求
app.post('/generate-pdf', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();


        // 根据请求中的参数（这里假设可以通过查询参数传递要访问的网址）
        const {
            url,
            name
        } = req.body;

        if (!url) {
            throw new Error('请提供要转换为PDF的网址，例如：/generate-pdf?url=http://example.com');
        }

        if (!name) {
            throw new Error('请提下载文件名称');
        }

        await page.goto(url, {
            waitUntil: 'networkidle2'
        });

        // 生成 PDF Buffer 数据
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            encoding: 'UTF-8'
        });

        await browser.close();

        // 设置响应头，返回 Buffer 数据
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="output.pdf"`);
        res.write(pdfBuffer, 'binary');
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
});

// 启动Express服务器
app.listen(port, () => {
    console.log(`服务器正在监听端口 ${port}`);
});