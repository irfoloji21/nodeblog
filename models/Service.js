const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    title_tr: { type: String, require:true },
    title_en: { type: String, require:true },
    title_ar: { type: String, require:true }
})

module.exports = mongoose.model('Service', ServiceSchema)