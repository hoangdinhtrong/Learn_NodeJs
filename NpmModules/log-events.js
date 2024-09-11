const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyy/MM/dd HH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fs.promises.mkdir(path.join(__dirname, 'logs'));
        }
        await fs.promises.appendFile(path.join(__dirname, 'logs', 'event-logs.txt'), logItem);
    } catch (error) {
        console.error(error);
    }
}

module.exports = logEvents;
