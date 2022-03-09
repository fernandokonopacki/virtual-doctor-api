const server = require('./config/server');
const config = require('config')

const app = server();

app.listen(config.get('api.porta'), function(){
    console.log("[server]: Server On");
})