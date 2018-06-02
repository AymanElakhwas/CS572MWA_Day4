var os = require('os');

function checkCpu() {
    return new Promise((resolve, reject) => {
        let noOfCpus = os.cpus().length;
        if (noOfCpus >= 2)
            resolve(noOfCpus);
        else
            reject("Processor is not supported");
    });
}

function checkMemory() {
    return new Promise((resolve, reject) => {
        let freeMem = os.freemem() / (1024 * 1024 * 1024);
        if (freeMem >= 4)
            resolve(freeMem);
        else
            reject("This app needs at least 4 GB of RAM");
    });
}

function checkSystem() {
    console.log("Checking your system");
    checkMemory().then(checkCpu).then((data) => { console.log("checked successfully") }).catch((err) => { console.log(err) });
}

checkSystem();