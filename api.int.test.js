const got = require("got");
const logger = require("./logging");
// const {app, type} = require('./nano-server');
const {app, type} = require('./express-server');
const API = "http://localhost:3000/v1", BFF = "http://localhost:3000/bff";

test('get user', async (done) => {
    let response = await got(`${API}/users/1234`, { headers: getAuthHeader() }).json();
    expect(response.success).toBeTruthy();
    expect(response.data).toBeDefined();
    let profile = response.data;
    expect(profile.bio.nickname).toBe("leos");
    expect(profile.auth.email).toBe("leos@email.bud");

    done();
});

/*
curl -v -X options http://127.0.0.1:3000/v1/polls/1234
 */
test('cors empty body', async (done) => {
    let response = await got(`${API}/polls/1234`, {method: "OPTIONS"});
    expect(response.statusCode).toBe(204);
    done();
});

/*
curl -v -X options http://127.0.0.1:3000/v1/users/1234
 */
test('cors only', async (done) => {
    let response = await got(`${API}/users/1234`, { method: "OPTIONS" });
    expect(response.statusCode).toBe(204);
/*
GotError: Parse Error: Duplicate Content-Length
    at onError (node_modules\got\dist\source\request-as-event-emitter.js:140:29)
    at ClientRequest.<anonymous> (node_modules\got\dist\source\request-as-event-emitter.js:157:17)
    at ClientRequest.emit (events.js:322:22)
    at ClientRequest.origin.emit (node_modules\@szmarczak\http-timer\dist\source\index.js:39:20)
    at Socket.socketOnData (_http_client.js:483:9)
    at Socket.emit (events.js:310:20)
    at addChunk (_stream_readable.js:286:12)
    at readableAddChunk (_stream_readable.js:268:9)
    at Socket.Readable.push (_stream_readable.js:209:10)
    at Socket.socketOnData (_http_client.js:476:22)
 */
    done();
});

test.skip('bad test', async () => {
    let response = await got(`${BFF}/polls/1234`, { headers: getAuthHeader() }).json();
    expect(response.success).toBeTruthy();
});

function getAuthHeader() {
    const config = { headers: { } };
    config.headers.Authorization = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZTQwdjBiMWo1Iiwibmlja25hbWUiOiJsaXRlcmFrbCIsInB3ZFRpbWVzdGFtcCI6IjIwMjAtMDMtMjJUMTE6MTA6NDkuNDg2WiIsInJvbGVzIjpbImFkbWluOnBvbGwiXSwiaWF0IjoxNTg2NjkwNzc2LCJleHAiOjE1ODkzNjkxNzZ9.N5MfpZ9i9Sjv-izdYItR4gXCmzVkqkuVcVSEL_6Q89c";
    return config;
}

beforeEach(() => {
    jest.setTimeout(10000);
});

let instance;
beforeAll(() => {
    if (type === "express") {
        instance = app.listen(3000, () => console.log("Server started"));
    } else {
        app.listen(3000, '0.0.0.0')
            .then(r => logger.info("Server started"));
    }
});

afterAll(() => {
    if (type === "express") {
        instance.close();
        logger.info("Server stopped");
    } else {
        if (app.close())
            logger.info("Server stopped");
    }
});
