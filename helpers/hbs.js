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
    language_title: (value, title_en, title_tr) => {
        if (value == "62926f296ea9b3ab8b5b6c31") return title_en
        else return title_tr
    },
    language_helper: (value) => {
        if (value == "62926f296ea9b3ab8b5b6c31") return "en-gb"
        else return "tr-tr"
    },
    filter: (value) => {
        //   var irfan = document.getElementById("irfan");
        // console.log(irfan);
        if (value == "62926f296ea9b3ab8b5b6c31") return "display: none;"
    },
    selection_helper: (abc, selection, title, arabic) => {
        // selection = türkçe başlık
        // abc = seçili dil
        // title = ingilizce başlık
        console.log(selection + 'selectionx')
        console.log(abc + 'abc')
        console.log(title + 'titley')
        console.log(arabic + 'arabic')

 
         if (abc == "tr-tr") return selection
         else if (abc== "en-gb") return  title
         else return arabic

    }

} 