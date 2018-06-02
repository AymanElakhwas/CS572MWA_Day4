const rxjs = require('rxjs');
const { Observable, Subject, ReplaySubject, from, of, range } = rxjs;
const os = require('os');



function checkMemoryAndCpu() {
    return new Promise((resolve, reject) => {
        let freeMem = os.freemem() / (1024 * 1024 * 1024);
        if (freeMem >= 4)
            resolve(freeMem);
        else
            reject("This app needs at least 4 GB of RAM");

        let noOfCpus = os.cpus().length;
        if (noOfCpus >= 2)
            resolve(noOfCpus);
        else
            reject("Processor is not supported");
    });
}

function checkSystem() {
    console.log("Checking your system");
    from(checkMemoryAndCpu()).subscribe(null, (err) => { console.log(err) }, () => console.log('checked successfully'));
}

checkSystem();



