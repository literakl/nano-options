const express = require('express');
const cors = require('cors');

const app = express();
app.options('/v1/users/:userId', cors(), () => {});

app.get('/v1/users/:userId', cors(), async (req, res) => {
    console.log("getUser handler starts");
    const response = {
        api: '1.0',
        status: 'OK'
    };
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response);
    return res;
});

app.listen(3000, () => console.log("Server started"));
