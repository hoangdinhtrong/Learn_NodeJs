const logEvents = require('./log-events');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name} : ${err.message}`, 'err-logs.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
}

module.exports = errorHandler;
