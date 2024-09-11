const fsPromises = require('fs').promises;
const path = require('path');



fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'Files', 'starter.txt'), 'utf8');
        console.log(data);
        console.log('-------------------------------------------------------------------------------');

        await fsPromises.writeFile(path.join(__dirname, 'Files', 'promise-write.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'Files', 'promise-write.txt'), '\n\nNice to meet you!');
        await fsPromises.rename(path.join(__dirname, 'Files', 'promise-write.txt'), path.join(__dirname, 'Files', 'promise-complete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'Files', 'promise-complete.txt'), 'utf8');
        console.log(newData);
    } catch (error) {
        console.error(error);
    }
}

deleteFile = async(fileName) => {
    try {
        await fsPromises.unlink(path.join(__dirname, 'Files', `${fileName}`));
        console.log(`Delete file: ${fileName} successfull`);
    } catch (error) {
        console.error(error);
    }
}

fileOps();
deleteFile('test.txt');


