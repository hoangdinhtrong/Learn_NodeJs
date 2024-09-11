// How Nodejs differs from Vanilla JS
// 1) Node runs on a server - not in a browser (BE not FE)
// 2) The console is the terminal window
// 3) global object instead of window object
// 4) Has common core modules that we will explore
// CommonJs module instead of ES6 modules
// run: node server

const os = require('os');
const path = require('path');

const math = require('./math')

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log('--------------------------------------------------------------');
console.log(__dirname);
console.log(__filename);

console.log('--------------------------------------------------------------');
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log('--------------------------------------------------------------');
console.log(path.parse(__filename));


console.log(math.add(2,3));
console.log('--------------------------------------------------------------');
