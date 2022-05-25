const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')
const About = require('../models/About')

router.get('/', (req,res) => {
    console.log(req.session) 
    res.render('site/index')
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
                res.render('site/blog', {
                    posts:posts, 
                    categories:categories
                })
            })
        })
        
    })
})

router.get('/contact', (req,res) => {
    res.render('site/contact')
})


module.exports = router