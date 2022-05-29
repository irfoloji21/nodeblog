const mongoose = require('mongoose')

const LanguageSchema = new mongoose.Schema({
    name: { type: String, require:true, unique:true },
    code: { type: String, require:true, unique:true }
})

module.exports = mongoose.model('Language', LanguageSchema)