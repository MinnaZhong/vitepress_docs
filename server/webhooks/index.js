import {
    Webhooks,
    createNodeMiddleware
} from "@octokit/webhooks";
import http from "http";


const webhooks = new Webhooks({
    secret: "uf@docs_2024_10?",
});


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

http.createServer(createNodeMiddleware(webhooks)).listen(3020);