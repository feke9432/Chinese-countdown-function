const fs = require('fs');
const config = require('./config');

function readDir () {
    return new Promise((resolve, reject) => {
        fs.readdir(__dirname + '/test', (err, files) => {
            if (err) return console.log(err);
            resolve(files);
        });
    });
}

function readFlie (url) {
    return new Promise((resolve, reject) => {
        var pathStr = __dirname + '/test/' + url + '/index.html';
        fs.readFile( pathStr, { encoding: 'utf-8' }, (err, data) => {
            if (err) return console.log(err);
            var cData = data;

            for (let i in config) {
                loop(config[i]);
            }

            function loop(opts) {
                if (cData.indexOf(opts.oldStr) >= 0) {
                    cData = cData.replace(opts.oldStr, opts.newStr);
                    loop(opts)
                }
            }

            fs.writeFile(pathStr, cData);
            resolve(data);
        })
    });
}

function brandFile(files) {
    var pArr = [];
    // return readFlie(files[0])
    for (var f of files) {
        pArr.push(readFlie(f));
    }

    return Promise.all(pArr);
}

(async () => {
    var files = await readDir();
    // readFlie(files[0])
    var htmlArr = await brandFile(files);
})();