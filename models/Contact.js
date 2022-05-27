const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    adres: { type: String, require:true },
    contact_name:{ type: String, require:true },
    contact_email:{ type: String, require:true },
    phone:{ type: String, require:true },
    kurumsal_email:{ type: String, require:true }
})

module.exports = mongoose.model('Contact', ContactSchema)