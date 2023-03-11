const express = require('express')
const app = express()
const ejs = require('ejs')

//Imported File
const {loadDatas, findDatas} = require('./utils/contact')

//MiddleWare
//Menambah Fungsionalitas pada web di belakang layar
app.set('view engine', 'ejs')
app.use(express.static('public'))


//Main config
app.get('/', (req, res)=> {
    res.render('index', {
        title : 'Home',
    })
})


//About page and Profile Page
app.get('/about', (req, res) => {
    const Datas = loadDatas()
    res.render('about', {
        title : 'About Us',
        Datas,
    })
})

app.get('/about/add', (req, res) => {
    res.render('add', {
        title : "Add Datas Member"
    })
})

app.get('/about/:name', (req, res) => {
    const Datass = findDatas(req.params.name)
    res.render('detail', {
        title : Datass.Name,
        Datass
    })
})


//Help Pages
app.get('/help', (req, res) => {
    res.render('help' , {
        title : 'help'
    })
})

app.listen(3000, () => {
    console.log("Listening to server 3000")
})