const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')
const About = require('../models/About')
const Contact = require('../models/Contact')
const Service = require('../models/Service')

router.get('/', (req,res) => {
    Service.find({}).populate({path:'adres', model: Contact}).lean().then(service => {
        Contact.find({}).lean().then(contact => {
        res.render('site/index', {
            service:service,
            contact:contact
        })
      })
    })
})

router.get('/blog', (req,res) => {

    
    Post.find({}).populate({path:'author', model: User}).lean().sort({$natural:-1}).lean()
    .then(posts => {
        Post.countDocuments().then(postCount => {
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
                Contact.find({}).lean().then(contact => {
                
                res.render('site/blog', {
                    posts:posts, 
                    categories:categories,
                    contact:contact
                })
                })
            })
        })
        
    })
})

router.get('/contact', (req,res) => {
    Contact.find({}).lean().then(contact => {
        res.render('site/contact', {contact:contact})
      })
})


router.get('/about', (req,res) => {
    About.find({}).populate({path:'adres', model: Contact}).lean().then(about => {
        Contact.find({}).lean().then(contact => {
            res.render('site/about', {
                about:about,
                contact:contact
            })
        })
        
      })
  })

  


  
module.exports = router