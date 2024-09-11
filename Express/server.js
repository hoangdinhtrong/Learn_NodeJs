const express = require('express');
const path = require('path');
const logEvents = require('./middlewares/log-events');
const errorHandler = require('./middlewares/error-handler');
const verifyJWT = require('./middlewares/verifyJWT');
const credentials = require('./middlewares/credentials');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const db = require('./config/dbConnect');
const app = express();
const port = process.env.port || 3500;

require('dotenv').config();

// Connect to MongoDB
db.connectDB();

// custom middleware logger
app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'req-logs.txt');
    next();
});

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// build-in middleware to handle urlencoded data
// in other words, form data
// content-type : application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// build-in middleware
app.use(express.json());

// middleware for cookie
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use('/subdir', require('./routes/subdir'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/', require('./routes/root'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.get('/*', (req, res) => {
    res.status(400);
    if (req.accepts('html')) {
        res.sendFile('./views/not-found.html', { root: __dirname })
    }
    else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
