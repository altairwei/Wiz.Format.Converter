const argv = require('yargs').argv;
require('winax');

const objWord = new ActiveXObject('Word.Application');
for (let i = 1; i < objWord.FileConverters.Count; i ++) {
    console.log(objWord.FileConverters.Item(i).FormatName)
}
objWord.Quit()

//