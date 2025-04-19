//testing
const express = require("express");
const app = express();
const port = 5174;

app.use(express.json());
app.use(express.static("src"));

app.get("/message", (req, res) => {
    res.json({message: "hi"})
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})