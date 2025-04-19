//testing
const express = require("express");
const app = express();
const port = 5174;

app.listen(port);
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname});
})

app.post("https://p7ojjk0jt9.execute-api.us-east-1.amazonaws.com/test1/login", (req, res) => {
    console.log(req.body);
})