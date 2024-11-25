import {
    Webhooks,
    createNodeMiddleware
} from "@octokit/webhooks";
import http from "http";


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
    console.log('Head commit:', head_commit);
    // 在这里可以添加你对 push 事件的具体处理逻辑，比如自动部署、更新文档等
});

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