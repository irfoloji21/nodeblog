const moment = require('moment')

module.exports = {
    generateDate : (date, format) => {
        return moment(date).format(format)
    },
    limit : (arr, limit) => {
        if(!Array.isArray(arr)) {return []}
        return arr.slice(0, limit)
    },
    truncate : (str, len) => {
        if(str.length > len) str = str.substring(0, len) + '...'
        return str
    },
    i18n : () => {
        return i18n.__.apply(this,arguments);
    },
    language : (value) => {
        if(value == "tr")  return "Türkçe"
        else return "İngilizce"
    }
}