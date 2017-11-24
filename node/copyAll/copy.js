const fs = require('fs');

var oldPath = __dirname + '/public/';
var newPath = __dirname + '/test/';

function copyAll (oldPath, newPath) {
    var files = fs.readdirSync(oldPath)
    var oldPath = oldPath + '/'
    var newPath = newPath + '/'
    if (!exists(newPath)) fs.mkdirSync(newPath);

    for (var f of files) {
        if (isDir(oldPath + f)) {
            if (!exists(newPath + f)) fs.mkdirSync(newPath + f);

            copyAll(oldPath + f, newPath + f)
        } else {
            fs.copyFileSync(oldPath + f, newPath + f);
        }
    }
}

function exists(path) {
    return fs.existsSync(path) 
}

function isDir(path) {
    return fs.existsSync(path)  && fs.statSync(path).isDirectory();
}

function log(str) {
    console.log('[' + new Date().toLocaleString() + ']=>',str);
}

module.exports = copyAll;