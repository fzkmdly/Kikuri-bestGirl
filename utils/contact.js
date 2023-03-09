const fs = require('fs')

//Create a Folder
const Folder = ('./Datas')
if(!fs.existsSync(Folder)) {
    fs.mkdirSync(Folder)
}

//Create a file
const File = ('./Datas/contact.json')
if (!fs.existsSync(File)) {
    fs.writeFileSync(File, '[]', 'utf-8')
}

//load datas
const loadDatas = () => {
    const file = fs.readFileSync('./Datas/contact.json', 'utf-8')
    const change = JSON.parse(file)
    return change;
}

module.exports = {loadDatas}