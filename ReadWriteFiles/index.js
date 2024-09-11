const fs = require('fs');

const path = require('path');

fs.readFile(path.join(__dirname, 'Files', 'starter.txt'), 'utf8',(err, data) => {
    if(err) throw err;
    console.log(data);
});

console.log('hello...');

fs.writeFile(path.join(__dirname, 'Files', 'reply.txt'), 'Nice to meet you',(err) => {
    if(err) throw err;

    console.log('Write complete');

    fs.appendFile(path.join(__dirname, 'Files', 'reply.txt'), '\n\nTesting text',(err) => {
        if(err) throw err;
    
        console.log('Append complete');
        fs.rename(path.join(__dirname, 'Files', 'reply.txt'), path.join(__dirname, 'Files', 'new-reply.txt'),(err) => {
            if(err) throw err;
        
            console.log('Rename complete');
        });
    });
});

process.on('uncaughtException', err => {
    console.error(`There was a uncaught error: ${err}`);
    process.exit(1);
})