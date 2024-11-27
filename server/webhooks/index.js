import express from "express";
import {
    Webhooks,
    createNodeMiddleware
} from "@octokit/webhooks";
import {
    spawn
} from "child_process";
const cors = require('cors'); // 引入cors中间件

// Initialize Express application
const app = express();

app.use(cors())

// Initialize the Octokit Webhooks instance with the secret key
const webhooks = new Webhooks({
    secret: "uf@docs_2024_10?", // Your webhook secret
});

// Define the push event handler (similar to your original logic)
webhooks.on("push", async (event) => {
    const {
        ref,
        repository,
        head_commit
    } = event.payload;
    console.log(`Received a push event on ${ref} in ${repository.name}`);

    try {
        // Run the shell command (e.g., autobuild.sh script)
        run_cmd("sh", ["./autobuild.sh"], function (text) {
            console.log(text);
        });
    } catch (error) {
        console.error("Error while executing autobuild.sh:", error);
    }
});

// Middleware to handle webhook events
const webhookMiddleware = createNodeMiddleware(webhooks);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Use the webhook middleware in Express
app.use(webhookMiddleware);

// Default route (404 for any unhandled routes)
app.use((req, res) => {
    res.status(404).send("Not Found");
});

// Start the Express server
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Function to run shell commands (similar to the original logic)
function run_cmd(cmd, args, callback) {
    const child = spawn(cmd, args);
    child.stdout.on("data", (buffer) => {
        console.log(buffer.toString());
    });
    child.stdout.on("end", () => {
        callback("run_cmd end");
    });
    child.on("error", (err) => {
        console.error("Error running command:", err);
    });
}