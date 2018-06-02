const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const { Subject } = require('rxjs');
const { fork } = require('child_process');


const subject = new Subject();
subject.subscribe(serveFileForDownload);

function serveFileForDownload(reqRes) {
    qs = url.parse(reqRes.request.url);
    query = querystring.parse(qs.query);
    const childProcess = fork('Exercise1_child.js');
    childProcess.send(query.url)

    childProcess.on('message', (fileStr) => {
        reqRes.response.writeHead(200, { 'Content-Type': 'application/x' });
        reqRes.response.end(fileStr);
    });
}



http.createServer((request, response) => {
    subject.next({ request, response });
}).listen(3000);