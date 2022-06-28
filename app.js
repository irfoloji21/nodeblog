const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const loader = require('handlebars-loader')
const { generateDate, limit, truncate, i18n, selection_helper, editHelper} = require('./helpers/hbs')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const methodOverride = require('method-override')
mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})



const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'testotesto',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}))


app.use(fileUpload())
app.use(express.static('public'))
app.use(methodOverride('_method'))


//handlebars helpers

const hbs = exphbs.create({
    helpers: {
        generateDate: generateDate,
        limit: limit,
        truncate: truncate,
        i18n: i18n,
        selection_helper: selection_helper,
        editHelper: editHelper

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

app.use((req, res, next) => {
    const { userId } = req.session
    if (userId) {
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
app.use((req, res, next) => {
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
const categories = require('./routes/categories')
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)
app.use('/contact', contact)
app.use('/about', about)
app.use('/service', service)
app.use('/categories', categories)

app.listen(port, hostname, () => {
    console.log(`server çalışıyor, http://${hostname}:${port}/`)
})

