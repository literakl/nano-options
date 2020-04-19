const app = require('./express-server');

app.listen(3000, '0.0.0.0')
    .then(r => console.log("Server started"));
