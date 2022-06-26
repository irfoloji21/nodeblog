const express = require('express')
const router = express.Router()
const User = require('../models/User')



router.get('/login', (req, res) => {
    res.render('site/login')
})
 
router.post('/login', (req, res) => {
    const {email, password} = req.body

    User.findOne({email}, (error, user)=> {
        if (user) {
            if(user.password == password) {
                req.session.userId = user._id
                res.redirect('/posts/new')
            } else {
                res.redirect('/users/login')
            }
        } else {
            res.redirect('/users/register')
        }
    })
})


router.get('/logout', (req, res) => {
    req.session.destroy(()=> {
        res.redirect('/')
    })

})
module.exports = router