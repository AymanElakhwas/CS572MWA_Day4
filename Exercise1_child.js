const fs = require('fs');

process.on('message', (filePath) => {
    let fileStr = fs.readFileSync(filePath, 'utf8');
    process.send(fileStr);
});