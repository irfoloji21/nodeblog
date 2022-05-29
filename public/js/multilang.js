
const arrLang = [{
	language: "en-gb",
	keys: {
		"HOME": "Home",
		"ABOUT": "About Us",
		"CONTACT": "Contact Us",
		"PRODUCTS": "Products",
		"SERVICES": "Services",
		"HOME_DESCRIPTION": "is a manufacturer and distributor of chemical products located in Izmir, Turkey.",
		"COMPANY_NAME": "ENDUKIM INDUSTRIAL CHEMISTRY COMPANY",
		"FOOTER": "© Company. ENDUKIM INDUSTRIAL CHEMISTRY COMPANY All Rights Reserved.",
		"ADRESS": "Adress : ",
		"READ_MORE": "Read More",
		"CATEGORIES": "Categories",
		"LOCATION": "Location",
		"PHONE": "Phone : ",
		"EMAIL": "Email : ",
		"SEND_MESSAGE": "Send Message",
		"PRODUCT": "Product",
		"LANGUAGE": "English",
	}
},
{
	language: "tr-tr",
	keys: {
		"HOME": "Anasayfa",
		"ABOUT": "Hakkımızda",
		"CONTACT": "İletişim",
		"PRODUCTS": "Ürünler",
		"SERVICES": "Hizmetler",
		"HOME_DESCRIPTION": "İzmir, Türkiye'de bulunan kimyasal ürünlerin üreticisi ve dağıtıcısıdır.",
		"COMPANY_NAME": "ENDÜKİM ENDÜSTRİYEL KİMYA ANONİM ŞİRKETİ",
		"FOOTER": "© Company. ENDÜKİM ENDÜSTRİYEL KİMYA A. Ş. Tüm Hakları Saklıdır.",
		"ADRESS": "Adres : ",
		"READ_MORE": "Daha Fazla Oku",
		"CATEGORIES": "Kategoriler",
		"LOCATION": "Konum",
		"PHONE": "Telefon : ",
		"EMAIL": "E-posta : ",
		"SEND_MESSAGE": "Mesaj Gönder",
		"PRODUCT": "Ürün",
		"LANGUAGE": "Türkçe",
	}
}
];

const translate = (lang = "en-gb") => {
	const langObject = arrLang.filter(function (obj) {
		return obj.language == lang;
	});
	var list = document.getElementsByClassName("lang");
	Array.from(list).forEach((el) => {
		let key = el.dataset.key;
		el.innerText = langObject[0].keys[key];
	});
}

const translateList = document.getElementsByClassName("translate");
Array.from(translateList).forEach((el) => {
	el.addEventListener("click", function () {
		let lang = el.dataset.lang;
		translate(lang)
	})
})




 
const selection = document.getElementById("mySelect");

selection.onchange = function(event){
  let lang = event.target.options[event.target.selectedIndex].dataset.lang;
  translate(lang)  
};
