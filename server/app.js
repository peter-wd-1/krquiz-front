var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/api/*", function (req, res) {
    const username = req.body.data;
    const password = req.body.data;
    res.send({
        token: 109381298410984,
    });
});

const port = 3002;

app.listen(port, () => console.log(`listening on port ${port}`));
