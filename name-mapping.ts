function toTitleCase(str: string) {
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

// Manually converted names from mock-data.ts
const names = {
    "MOHAN KUMAR SURAM": "Mohan Kumar Suram",
    "SURAM POOJA": "Suram Pooja",
    "VARIKUTI SATHYAM": "Varikuti Satyam",
    "L SHASHIKALA": "L Shashikala",
    "THATHIREDDY MANJULA": "Thathireddy Manjula",
    "ASRAUNNISA BEGUM": "Asraunnisa Begum",
    "KAUSAR BEGUM": "Kausar Begum",
    "MEHARUNNISA": "Meharunnisa",
    "SHAIK UMAR JANY": "Shaik Umar Jany",
    "SADIYA SULTANA": "Sadiya Sultana",
    "DONTHULA PAVITHRA": "Donthula Pavithra",
    "CHIGURLA RAJITHA": "Chigurla Rajitha",
    "JUTTU YAMINI": "Juttu Yamini",
    "JUVERIYA SANA": "Juveriya Sana",
    "JOGINI SWETHA": "Jogini Swetha",
    "TASLEEM BEGUM": "Tasleem Begum",
    "SHIFA": "Shifa",
    "GUNDADI BHAVANA": "Gundadi Bhavana",
    "GADAPA AMANI": "Gadapa Amani",
    "SABBANI NAVITHA": "Sabbani Navitha",
    "PAMBALA SUHASINI": "Pambala Suhasini",
    "GANGA ARUNA": "Ganga Aruna",
    "KOMIRELLI SAMPATHA": "Komirelli Sampatha",
    "PENTI AKSHARA": "Penti Akshara",
    "BATTU ROSHINI": "Battu Roshini",
    "FARZANA": "Farzana",
    "BASADI RADHIKA": "Basadi Radhika",
    "PANCHEDDULA MAMATHA": "Pancheddula Mamatha",
    "DAMARANCHA MAMATHA": "Damarancha Mamatha",
    "AILA RAJINI": "Aila Rajini",
    "KAPPA SWAPNA": "Kappa Swapna",
    "VADAKATTU RAJESHWARI": "Vadakattu Rajeshwari",
    "CHINTHAPANDU KARUNA SRI": "Chinthapandu Karuna Sri",
    "CHINTAKINDI DEVARENAMMA": "Chintakindi Devarenamma"
};
