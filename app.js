const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const { generateDate, limit, truncate, i18n, language } = require('./helpers/hbs')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const methodOverride = require('method-override')
const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')


mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})

 

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'testotesto',
    resave: false,
    saveUninitialized:true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}))

i18next.use(Backend).use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        backend: {
            loadPath: './locales/{{lng}}/translation.json'
        }
    })
app.use(middleware.handle(i18next))
app.use(fileUpload())
app.use(express.static('public'))
app.use(methodOverride('_method'))


//handlebars helpers

const hbs = exphbs.create({
    helpers: {
        generateDate:generateDate,
        limit: limit,
        truncate: truncate,
        i18n: i18n,
        language: language

    }
})


 app.engine('handlebars', hbs.engine)
 app.set('view engine', 'handlebars')

//app.engine('handlebars', hbs.engine)
//app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main"})); //stackoverflowdan aldım

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//DISPLAY LINK middleware

app.use((req, res, next)=> {
    const {userId} = req.session
    if(userId) {
        res.locals = {
            displayLink: true
        }
    }
        else {
            res.locals = {
                displayLink: false
            }
        }
        next()
})

// Flash - message middleware
app.use((req, res, next)=> {
    res.locals.sessionFlash = req.sessionFlash
    delete req.session.sessionFlash
    next()
})



const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const admin = require('./routes/admin/index')
const contact = require('./routes/contact')
const about = require('./routes/about')
const service = require('./routes/service')
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)
app.use('/contact', contact)
app.use('/about', about)
app.use('/service', service)

app.listen(port, hostname, () => {
    console.log(`server çalışıyor, http://${hostname}:${port}/`)
})

