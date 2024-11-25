import {
    Webhooks,
    createNodeMiddleware
} from "@octokit/webhooks";
import {
    createServer
} from "http";

import {
    exec
} from "child_process";


const webhooks = new Webhooks({
    secret: "uf@docs_2024_10?",
});

// 监听提交事件
webhooks.on('push', async (event) => {
    const {
        ref,
        repository,
        head_commit
    } = event.payload;
    console.log(`Received a push event on ${ref} in ${repository.name}`);
    // console.log('Head commit:', head_commit);
    // 在这里可以添加你对 push 事件的具体处理逻辑，比如自动部署、更新文档等
    // 在这里执行autobuild.sh脚本
    try {
        console.log("执行autobuild.sh...");

        // 使用child_process模块来执行shell脚本
        await exec('bash autobuild.sh', (err, stdout, stderr) => {
            if (err) {
                console.error('执行autobuild.sh时出错：', err);
                return;
            }
            console.log('执行成功，输出：', stdout);
        });
    } catch (error) {
        console.error('执行autobuild.sh时出现异常：', error);
    }
});

// 监听所有的
webhooks.onAny(({
    id,
    name,
    payload
}) => {
    console.log(name, "event received");
});

const middleware = createNodeMiddleware(webhooks, {
    path: "/webhooks"
});

createServer(async (req, res) => {
    console.log('createServer==>');
    // `middleware` returns `false` when `req` is unhandled (beyond `/webhooks`)
    if (await middleware(req, res)) return;
    res.writeHead(404);
    res.end();
}).listen(3020);