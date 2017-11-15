var bulkReplaceCont = require('./bulkReplaceCont')

bulkReplaceCont({
    rootPath: 'test',
    oldStr: '改之前的内容，支持正则和字符串',
    newStr: '改之后的内容，注意，过程不可变，请做好备份'
});