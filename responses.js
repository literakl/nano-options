module.exports.createDefaultResponse = createDefaultResponse;
module.exports.createUserResponse = createUserResponse;

function createDefaultResponse(res) {
    const response = {
        api: '1.0',
        status: 'OK'
    };
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return response;
}

function createUserResponse(res) {
    const response = {
        success: true,
        data: {
            bio: {
                nickname: "leos"
            },
            auth: {
                email: "leos@email.bud"
            }
        }
    };
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return response;
}
