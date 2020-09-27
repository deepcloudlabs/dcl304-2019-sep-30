const port = 7001;

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let lottery = require('lottery');
let WebSocket = require('ws');
let fetch = require('node-fetch');

let app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Types, Accept");
    next();
});

let server = app.listen(port); // http

// WebSocket Server Code
let io = require('socket.io').listen(server); // websocket
let sockets = [];
io.set("origins", "*:*");
io.on('connection', socket => {
    sockets.push(socket);
    console.log("Connection is open for socket", socket.id);
    socket.on('disconnect', () => {
        let index = sockets.indexOf(socket);
        if (index >= 0) sockets.splice(index, 1);
    })
})

console.log('Server is running at port', port);

// WebSocket Client Code
const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";
let ws = new WebSocket(BINANCE_WS_URL);
ws.on('message', data => {
    let frame = JSON.parse(data);
    let {p, q, s, T, ...rest} = frame;
    let trade = {p, q, s, T, v: Number(p) * Number(q)};
    sockets.forEach(socket => {
        socket.emit('trade', trade);
    })
    if (trade.v > 100000) console.log(trade.v);
});

const BINANCE_REST_URL =
    'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
setInterval(() => {
    fetch(BINANCE_REST_URL).then(res => res.json())
        .then(ticker => console.log(ticker));
}, 10000);
