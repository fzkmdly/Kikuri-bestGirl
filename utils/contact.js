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

//Find Datas By Name to show the detail
const findDatas = (Name) => {
    //Name has to declared
    const Datas = loadDatas()
    const Filtered = Datas.find((contact) => contact.Name.toLowerCase() === Name.toLowerCase())
    //toLowerCase means that Server search for datas is very specific
    return Filtered
}

module.exports = {loadDatas , findDatas}