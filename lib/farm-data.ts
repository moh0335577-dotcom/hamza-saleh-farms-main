import type { Language } from "@/lib/language-context";

export const farmName = "مزارع حمزة صالح";
export const mapUrl = "https://maps.app.goo.gl/sD9Ebhy8LJURZF7s5?g_st=ac";
export const phoneNumbers = ["+963 932 604 739", "+963 953 961 438"];

export const farmContent = {
  ar: {
    farmName: "مزارع حمزة صالح",
    farmTagline: "خصوصية وراحة وسط الطبيعة",
    farmImages: [
      { source: require("@/assets/images/farm-01.jpg"), title: "المسبح والجلسات الخارجية" },
      { source: require("@/assets/images/farm-02.jpg"), title: "جلسة داخلية دافئة" },
      { source: require("@/assets/images/farm-03.jpg"), title: "البساتين والمساحات الخضراء" },
      { source: require("@/assets/images/farm-04.jpg"), title: "أجواء المساء حول المسبح" },
      { source: require("@/assets/images/farm-05.jpg"), title: "جلسة عائلية مطلة على المسبح" },
      { source: require("@/assets/images/farm-06.jpg"), title: "جلسات خارجية ليلية" },
      { source: require("@/assets/images/farm-07.jpg"), title: "المسبح في أجواء نهارية" },
      { source: require("@/assets/images/farm-08.jpg"), title: "مساحات مظللة ومسبح" },
      { source: require("@/assets/images/farm-09.jpg"), title: "حديقة وجلسة هادئة" },
      { source: require("@/assets/images/farm-10.jpg"), title: "جلسة مع إطلالة على الطبيعة" },
    ],
    services: [
      { icon: "pool", title: "مسبح خاص ونظيف", text: "وقت ممتع بخصوصية وراحة." },
      { icon: "park", title: "بساتين ومساحات خضراء", text: "هواء نقي وأجواء هادئة بعيدًا عن الضجيج." },
      { icon: "deck", title: "جلسات خارجية مريحة", text: "جلسات عائلية ومناطق مظللة مجهزة." },
      { icon: "celebration", title: "تجهيز المناسبات", text: "للحفلات وأعياد الميلاد والخطوبة والمناسبات." },
      { icon: "cleaning-services", title: "تنظيف وصيانة دورية", text: "مستلزمات تنظيف أساسية وعناية مستمرة بالمكان." },
      { icon: "coffee", title: "ضيافة عند الطلب", text: "خدمة ضيافة يمكن طلبها مسبقًا." },
      { icon: "lightbulb", title: "إنارة ليلية جميلة", text: "أجواء لطيفة للجلسات المسائية وزوايا تصوير مميزة." },
      { icon: "sports-esports", title: "ألعاب عائلية", text: "الشدة والزهر والشطرنج لقضاء وقت ممتع." },
      { icon: "bluetooth", title: "سماعة بلوتوث عند الطلب", text: "متوفرة عند الطلب للاستمتاع بأجوائكم." },
      { icon: "security", title: "أمان وخصوصية", text: "مواقف سيارات واسعة وحرص على راحة الضيوف." },
    ],
  },
  en: {
    farmName: "Hamza",
    farmTagline: "Privacy and comfort in nature",
    farmImages: [
      { source: require("@/assets/images/farm-01.jpg"), title: "Pool and outdoor seating" },
      { source: require("@/assets/images/farm-02.jpg"), title: "Warm indoor lounge" },
      { source: require("@/assets/images/farm-03.jpg"), title: "Gardens and green spaces" },
      { source: require("@/assets/images/farm-04.jpg"), title: "Evening atmosphere around the pool" },
      { source: require("@/assets/images/farm-05.jpg"), title: "Family seating overlooking the pool" },
      { source: require("@/assets/images/farm-06.jpg"), title: "Outdoor night seating" },
      { source: require("@/assets/images/farm-07.jpg"), title: "Pool in daylight atmosphere" },
      { source: require("@/assets/images/farm-08.jpg"), title: "Shaded spaces and pool" },
      { source: require("@/assets/images/farm-09.jpg"), title: "Garden and peaceful seating" },
      { source: require("@/assets/images/farm-10.jpg"), title: "Seating with a view of nature" },
    ],
    services: [
      { icon: "pool", title: "Private clean pool", text: "A pleasant time with privacy and comfort." },
      { icon: "park", title: "Gardens and green areas", text: "Fresh air and a calm atmosphere away from noise." },
      { icon: "deck", title: "Comfortable outdoor seating", text: "Family gatherings and shaded areas with complete comfort." },
      { icon: "celebration", title: "Event preparation", text: "For parties, birthdays, engagements, and special occasions." },
      { icon: "cleaning-services", title: "Regular cleaning and maintenance", text: "Basic cleaning supplies and continuous care for the place." },
      { icon: "coffee", title: "Hospitality on request", text: "Hospitality service available by prior request." },
      { icon: "lightbulb", title: "Beautiful night lighting", text: "A cozy atmosphere for evening gatherings and photo corners." },
      { icon: "sports-esports", title: "Family games", text: "Backgammon and chess for a memorable time." },
      { icon: "bluetooth", title: "Bluetooth speaker on request", text: "Available upon request to enhance your experience." },
      { icon: "security", title: "Safety and privacy", text: "Wide parking and attentive care for guest comfort." },
    ],
  },
} as const;

export const farmImages = farmContent.ar.farmImages;
export const farmTagline = farmContent.ar.farmTagline;
export const services = farmContent.ar.services;

export function getFarmData(language: Language) {
  return farmContent[language];
}
