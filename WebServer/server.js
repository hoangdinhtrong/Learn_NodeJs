const http = require('http');
const path = require('path');
const fs = require('fs');
const logEvents = require('./log-events');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { };

// initialize object
const myEmitter = new MyEmitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const hostname = process.env.host || '127.0.0.1';
const port = process.env.port || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'req-log.txt');
    let extensionUrl = path.extname(req.url);
    let contentType = getContentType(extensionUrl);
    let filePath = getFilePath(req.url, contentType);

    if (!extensionUrl && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExist = fs.existsSync(filePath);

    if (fileExist) {
        serveFile(filePath, contentType, 200, res);
    } else {
        //404 301 redirect
        console.log(path.parse(filePath));
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'location': '/' });
                res.end();
                break;

            default:
                serveFile(path.join(__dirname, 'views', 'not-found.html'), 'text/html', 404, res);
                break;
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running on port ${port}`);
});

const serveFile = async (filePath, contentType, statusCode, res) => {
    try {
        const rawData = await fs.promises.readFile(filePath, !contentType.includes('image') ? 'utf8' : '');
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (error) {
        console.error(error);
        myEmitter.emit('log', `${error.name}: ${error.message}`, 'req-log.txt');
        res.statusCode = 500;
        res.end();
    }
}

const getFilePath = (url, contentType) => {
    if (contentType === 'text/html' && url === '/')
        return path.join(__dirname, 'views', 'index.html');

    if (contentType === 'text/html' && url.slice(-1) === '/')
        return path.join(__dirname, 'views', url, 'index.html');

    if (contentType === 'text/html')
        return path.join(__dirname, 'views', url);

    return path.join(__dirname, url);
}

const getContentType = (extensionUrl) => {
    switch (extensionUrl) {
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.jpg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.txt':
            return 'text/plain';
        default:
            return 'text/html';
    }
}

