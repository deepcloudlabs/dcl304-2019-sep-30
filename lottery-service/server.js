const port = 7001;

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let lottery = require('lottery');

let app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Types, Accept");
    next();
});

// http://localhost:7001/lottery?min=1&max=49&size=6
app.get('/lottery', async (req, res) => {
    res.set('Content-Type', 'application/json');
    let min = req.query.min;
    let max = req.query.max;
    let size = req.query.size;
    let numbers = await lottery.draw(min, max, size);
    res.status(200).send(numbers);
});

let server = app.listen(port); // http
console.log('Server is running at port', port);