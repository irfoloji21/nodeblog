const moment = require('moment')

module.exports = {
    generateDate: (date, format) => {
        return moment(date).format(format)
    },
    limit: (arr, limit) => {
        if (!Array.isArray(arr)) { return [] }
        return arr.slice(0, limit)
    },
    truncate: (content_en, content_tr, len, value) => {
        if (value == "62926f296ea9b3ab8b5b6c31") {
            if (content_en.length > len) content_en = content_en.substring(0, len) + '...'
            return content_en
        } else {
            if (content_tr.length > len) content_tr = content_tr.substring(0, len) + '...'
            return content_tr
        }

    },
    i18n: () => {
        return i18n.__.apply(this, arguments);
    },
    selection_helper: (abc, selection, title, arabic) => {
        // selection = türkçe veri
        // abc = seçili dil
        // title = ingilizce veri
        // arabic = arabic veri
       

 
         if (abc == "tr-tr") return selection
         else if (abc== "en-gb") return  title
         else return arabic

    },
    editHelper: (post, kategori) => {
        // post = post tablosundan gelen kategori id
        // kategori = kategori tablosundan gelen idler
        if ( kategori.toString()==post ) return "selected" 
    },
    iscategory: (category) => {
        if(!category) {
            return "display: none;"
        }
    }
}