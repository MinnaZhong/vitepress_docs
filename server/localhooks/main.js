const express = require('express');

const app = express();

const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/build', (req, res) => {
    runSh("sh", ["./autobuild.sh"], function (text) {
        console.log(text);
    });
    res.send('new build')
})



function runSh(cmd, args, callback) {
    const child = spawn(cmd, args);
    child.stdout.on("data", (buffer) => {
        console.log(buffer.toString());
    });
    child.stdout.on("end", () => {
        callback("build end!");
    });
    child.on("error", (err) => {
        console.error("Error running command:", err);
    });
}