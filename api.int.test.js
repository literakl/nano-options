const got = require("got");
const logger = require("./logging");
const app = require('./nano-server');
const API = "http://localhost:3000/v1", BFF = "http://localhost:3000/bff";

describe("user accounts", () => {
    test.skip('get user incorrect', async () => {
        let response = await got(`${BFF}/polls/1234`, { headers: getAuthHeader() }).json();
        expect(response.success).toBeTruthy();
        expect(response.data).toBeDefined();
        let profile = response.data;
        expect(profile.bio.nickname).toBe("leos");
        expect(profile.auth.email).toBe("leos@email.bud");
    });
    test('get user correct', async () => {
        let response = await got(`${API}/users/1234`, { headers: getAuthHeader() }).json();
        expect(response.success).toBeTruthy();
        expect(response.data).toBeDefined();
        let profile = response.data;
        expect(profile.bio.nickname).toBe("leos");
        expect(profile.auth.email).toBe("leos@email.bud");
    });
});

function getAuthHeader() {
    const config = { headers: { } };
    config.headers.Authorization = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZTQwdjBiMWo1Iiwibmlja25hbWUiOiJsaXRlcmFrbCIsInB3ZFRpbWVzdGFtcCI6IjIwMjAtMDMtMjJUMTE6MTA6NDkuNDg2WiIsInJvbGVzIjpbImFkbWluOnBvbGwiXSwiaWF0IjoxNTg2NjkwNzc2LCJleHAiOjE1ODkzNjkxNzZ9.N5MfpZ9i9Sjv-izdYItR4gXCmzVkqkuVcVSEL_6Q89c";
    return config;
}

beforeEach(() => {
    jest.setTimeout(10000);
});

beforeAll(() => {
    app.listen(3000, '0.0.0.0')
        .then(r => logger.info("Server started"));
});

afterAll(() => {
    if (app.close())
        logger.info("Server stopped");
});
