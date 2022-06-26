const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    title_tr: { type: String, require:true },
    title_en: { type: String, require:true },
    title_ar: { type: String, require:true },
    content_tr:{ type: String, require:true },
    content_en:{ type: String, require:true },
    content_ar:{ type: String, require:true },
    about_image: { type: String, require:true }
})

module.exports = mongoose.model('About', AboutSchema)