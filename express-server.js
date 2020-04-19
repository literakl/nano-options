const express = require('express');
const cors = require('cors');
const {createDefaultResponse} = require("./responses");

const app = express();

app.options('/v1/users/:userId', cors());

app.options('/v1/polls/:pollId', cors(), () => {});

app.get('/slow', cors(), async (req, res) => {
    console.log("slow handler starts");
    const response = createDefaultResponse(res);
    setTimeout(() => res.send(response), 2000);
    return res;
});

app.get('/v1/users/:userId', cors(), async (req, res) => {
    console.log("getUser handler starts");
    const response = createDefaultResponse(res);
    res.send(response);
    return res;
});

module.exports = app;
