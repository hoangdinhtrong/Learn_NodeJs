const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'Files', 'lorem.txt'), {encoding: 'utf8'});
const writeStream = fs.createWriteStream(path.join(__dirname, 'Files', 'new-lorem.txt'));

/* -----------------read a file and write to another file-------------------------------------------------- */
/* -----------------two functions are same-------------------------------------------------- */
readStream.on('data', (dataChuck) => {
    writeStream.write(dataChuck);
});

readStream.pipe(writeStream);
/* -----------------read a file and write to another file-------------------------------------------------- */
