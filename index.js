const express = require('express')
const app = express()
const ejs = require('ejs')
const { body, validationResult, check } = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash')

//Imported File
const {loadDatas, findDatas, AddDatas, emailDup, nameDup, idDup} = require('./utils/contact');

//MiddleWare
//Menambah Fungsionalitas pada web di belakang layar
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(cookieParser('secret'))
app.use(session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave :  true,
    saveUninitialized : true
}))


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
app.post(
    '/about',
[
    check('email')
        .isEmail().withMessage("You wanker is not a email")
        .custom((value) => {
            //Mencoba untuk memeriksa apakah email duplikat
            const Duplicated = emailDup(value)
            if(Duplicated){
                //memberi pesan error melalui JS
                throw new Error('email already In Used')
            }
            return true
        }),
    check('Name')
        .custom((value) => {
            const Duplicated = nameDup(value)
            if(Duplicated){
                throw new Error('Name Already in used')
            }
            return true
        }),
    check('ID')
        .isLength({min: 7, max: 10}).withMessage('Character Must Have Minimal lenght of 7 number and maximum lenght of 10 number')
        .custom((value) => {
            const Duplicated = idDup(value)
            if(Duplicated){
                throw new Error('ID Already In Used')
            }
            return true
        }),
],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('add', {
                errors : errors.array(),
                title : "Add Datas Member"
            })
        } else {
            //AddDatas 
            AddDatas(req.body);
            res.redirect('/about')
        }
}
)

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