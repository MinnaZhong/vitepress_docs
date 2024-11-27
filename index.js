fetch("http://docs.hooks.ufactory.cc/webhooks", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "docs"
    })
}).then(res => {
    console.log("res==>", res)
}).catch(err => {
    console.log(err)
})