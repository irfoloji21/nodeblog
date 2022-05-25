const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    title: { type: String, require:true },
    content:{ type: String, require:true },
    about_image: { type: String, require:true }
})

module.exports = mongoose.model('About', AboutSchema)