const nanoexpress = require('nanoexpress');
const cors = require('cors');

const app = nanoexpress();
app.options('/v1/users/:userId', cors());

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

app.setErrorHandler(
    (err, req, res) => {
        console.log("ERROR", err);
        return res.send({
            status: 'error',
            status_code: 500,
            message: 'oops'
        })
    }
);

app.setNotFoundHandler((res, req) => {
    return res.send({ code: 404, message: 'You entered wrong url' });
});

app.listen(3000, '0.0.0.0')
    .then(r => console.log("Server started"));
