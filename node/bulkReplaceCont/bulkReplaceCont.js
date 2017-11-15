/*
* @author: feke9432
* @introduction: 批量改文件内容
* @params: {opts.rootPath} 批量修改的根路径文件夹。
*          {opts.oldStr} 需要修改的文件内容，可使用正则和字符串。
*          {opts.newStr} 修改后内容。
* @date:   2017-11-15
*/

const fs = require('fs');

function readDir(opts) {
    return new Promise((resolve, reject) => {
        fs.readdir(__dirname + opts.rootPath, (err, files) => {
            if (err) return console.log(err);
            resolve(files);
        });
    });
}

function readFlie(url, opts) {
    return new Promise((resolve, reject) => {
        var fileName;

        // 循环找出文件夹下所需文件。
        var fileDefaultArr = ['index.html', 'index.htm', 'default.html', 'default.htm','index.php', 'index.jsp', 'index.asp'];
        var pathStr = __dirname + opts.rootPath + url + '/';

        for (let i = 0; i < fileDefaultArr.length; i++) {
            if (isExists(pathStr + fileDefaultArr[i])) {
                pathStr += fileDefaultArr[i];
                break;
            }
        }
        
        fs.readFile(pathStr, { encoding: 'utf-8' }, (err, data) => {
            if (err) return console.log(err);

            var oldStr = opts.oldStr || ''
            var newStr = opts.newStr || ''

            var cData = data;
            function replaceAll() {
                if (cData.indexOf(oldStr) >= 0) {
                    cData = cData.replace(oldStr, newStr);
                    replaceAll();
                }
            }
            replaceAll();
            fs.writeFile(pathStr, cData);
            resolve(data);
        })
    });
}

function isExists(path) {
    return fs.existsSync(path)
}

function brandFile(files, opts) {
    var pArr = [];
    // return readFlie(files[0])
    for (var f of files) {
        pArr.push(readFlie(f, opts));
    }

    return Promise.all(pArr);
}

module.exports = async function (opts) {
    var opts = opts || {}
    opts.rootPath = opts.rootPath || 'public';
    if (opts.oldStr == null || opts.newStr == null ) return console.error('请输入需要批量修改的内容');

    var files = await readDir(opts); // 文件夹内文件夹名字数组。
    // readFlie(files[0])
    var htmlArr = await brandFile(files, opts); // 返回修改前的内容数组。

    return console.log('批量修改成功');
}