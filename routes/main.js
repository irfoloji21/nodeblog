const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')
const About = require('../models/About')
const Contact = require('../models/Contact')
const Service = require('../models/Service')
const MySelect = require('../models/mySelect')


router.get('/', (req,res) => {
    Service.find({}).populate({path:'adres', model: Contact}).lean().then(service => {
        Contact.find({}).lean().then(contact => {
            MySelect.findById('62aa458986e5843110be6cea').lean().then(myselect => {
            MySelect.find().lean().then(select => {
        res.render('site/index', {
            service:service,
            contact:contact,
            select: select,
            myselect: myselect
        })
    })
      })
    })
})
})

router.get('/blog', (req,res) => {

    
    Post.find({}).populate({path:'author', model: User}).populate({path:'category', model: Category}).lean().sort({$natural:-1}).lean()
    .then(posts => {
        
            Category.aggregate([
                {
                    $lookup:{
                        from: 'posts',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'posts'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        num_of_posts : {$size: '$posts'}
                    }
                }
            ]).then(categories => {
                MySelect.findById('62aa458986e5843110be6cea').lean().then(myselect => {
                    MySelect.find().lean().then(select => {
                Contact.find({}).lean().then(contact => {
                    Category.find().lean().then(category => {
                
                res.render('site/blog', {
                    myselect:myselect,
                    posts:posts, 
                    categories:categories,
                    contact:contact,
                    select: select,
                    category:category
                })
                })  
            })
            })
            })
            })
        
    })
})

router.get('/contact', (req,res) => {
    Contact.find({}).lean().then(contact => {
        MySelect.findById('62aa458986e5843110be6cea').lean().then(myselect => {
        MySelect.find().lean().then(select => {
        res.render('site/contact', {
            contact:contact,
            select:  select,
            myselect:myselect
        })
      })
    })
    })
})


router.get('/about', (req,res) => {
    About.find({}).populate({path:'adres', model: Contact}).lean().then(about => {
        Contact.find({}).lean().then(contact => {
            MySelect.findById('62aa458986e5843110be6cea').lean().then(myselect => {
            MySelect.find().lean().then(select => {
            res.render('site/about', {
                about:about,
                contact:contact,
                select: select,
                myselect:myselect
            })
        })
    })
    })
      })
  })

  


  
module.exports = router