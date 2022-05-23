const mongoose = require('mongoose')

const Post = require('./models/Post')

mongoose.connect('mongodb://127.0.0.1/nodeblog_test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

Post.findByIdAndDelete('6284f4b1d3121323a08c05f3', (error, post) => {
    console.log(error, post)
})


// Post.findByIdAndUpdate('6284f4b1d3121323a08c05f3', {
//     title: 'Benim 1. Postum'
// }, (error, post) => {
//     console.log(error, post)
// })






// Post.create({
//     title: 'benim ikinci başlığım',
//     content: 'post içeriği lorem ipsum dolor sit amet'
// }, (error, post) => {
//     console.log(error, post)
// })