/**
 * Bilişim Teknolojileri - Passaparola Soru & Cevap Veri Havuzu
 * 'bilisim_teknolojileri_passaparola.md' dosyasından derlenmiştir.
 */
const PASSAPAROLA_DATA = [
  {
    letter: "A",
    question: "Belirli bir problemi çözmek veya bir hedefe ulaşmak için tasarlanan adım adım yol haritası.",
    answer: "Algoritma",
    aliases: ["algoritma", "algorıtma"]
  },
  {
    letter: "B",
    question: "Bilgisayarların verileri depolamak ve işlemek için kullandığı '0' ve '1' rakamlarından oluşan ikili sayı sistemi.",
    answer: "Binary",
    aliases: ["binary", "ikili kod", "ikili sayi sistemi", "ikili", "ikili sistem", "ikili sayilar", "binari"]
  },
  {
    letter: "C",
    question: "Web geliştirme alanında sayfaların tasarımını, renklerini ve düzenini belirlemek için kullanılan stil şablonu dili.",
    answer: "CSS",
    aliases: ["css", "cascading style sheets", "stil sablonu"]
  },
  {
    letter: "Ç",
    question: "Bilgisayarlar ve elektronik cihazların beynini oluşturan, üzerinde milyonlarca transistör barındıran minik yarı iletken devre levhası.",
    answer: "Çip",
    aliases: ["çip", "cip", "chip", "mikrocip", "mikroçip", "entegre", "yonga"]
  },
  {
    letter: "D",
    question: "Bilgisayarın elle tutulup gözle görülebilen tüm fiziksel parçalarına verilen genel ad.",
    answer: "Donanım",
    aliases: ["donanım", "donanim", "hardware"]
  },
  {
    letter: "E",
    question: "Bilgisayarda üretilen görsel verileri kullanıcının görmesini sağlayan temel çıkış donanımı (Monitör).",
    answer: "Ekran",
    aliases: ["ekran", "monitor", "monitör", "goruntu birimi"]
  },
  {
    letter: "F",
    question: "Zararlı yazılımların ve yetkisiz erişimlerin ağa sızmasını engelleyen güvenlik duvarı.",
    answer: "Firewall",
    aliases: ["firewall", "guvenlik duvari", "güvenlik duvarı", "fayrvıl", "ates duvari"]
  },
  {
    letter: "G",
    question: "1024 Megabayt (MB) değerine eşit olan veri ve depolama ölçü birimi.",
    answer: "Gigabayt",
    aliases: ["gigabayt", "gb", "gigabyte", "giga bayt"]
  },
  {
    letter: "H",
    question: "Web sayfalarının yapısını ve iskeletini oluşturmak için kullanılan standart işaretleme dili.",
    answer: "HTML",
    aliases: ["html", "hypertext markup language", "htm"]
  },
  {
    letter: "I",
    question: "Bilişim alanında bilgi, donanım veya yazılım kaynaklarının tümünü ifade eden temel kavram.",
    answer: "İletişim / Ispat",
    aliases: ["ispat", "ıspat", "iletişim", "iletisim", "bilgi", "bilisim", "bilişim", "ispat / iletişim"]
  },
  {
    letter: "İ",
    question: "Dünya genelindeki bilgisayar ağlarını birbirine bağlayan küresel iletişim ağı.",
    answer: "İnternet",
    aliases: ["internet", "ınternet", "genel ag", "genel ağ", "net"]
  },
  {
    letter: "J",
    question: "Web sitelerini dinamik ve etkileşimli hale getirmek için sıkça kullanılan popüler programlama dili.",
    answer: "JavaScript",
    aliases: ["javascript", "js", "java script", "javascrip"]
  },
  {
    letter: "K",
    question: "Bilgisayara metin, sayı ve komut girmek için kullanılan temel giriş donanımı.",
    answer: "Klavye",
    aliases: ["klavye", "keyboard"]
  },
  {
    letter: "L",
    question: "Taşınabilir, bataryalı ve kompakt kişisel bilgisayar türü.",
    answer: "Laptop",
    aliases: ["laptop", "dizustu", "dizüstü", "dizüstü bilgisayar", "dizustu bilgisayar", "notebook"]
  },
  {
    letter: "M",
    question: "Bilgisayar sistemlerine zarar vermek veya veri çalmak amacıyla yazılmış kötü amaçlı yazılımların genel adı.",
    answer: "Malware",
    aliases: ["malware", "kotu amacli yazilim", "kötü amaçlı yazılım", "zararli yazilim", "zararlı yazılım"]
  },
  {
    letter: "N",
    question: "İnternet ortamında gezinirken veya iletişim kurarken uyulması gereken görgü ve nezaket kuralları.",
    answer: "Netiket",
    aliases: ["netiket", "netiquette", "dijital nezaket", "internet gorgusu", "internet görgüsü"]
  },
  {
    letter: "O",
    question: "Verilerin lazer ışınları yardımıyla yazılıp okunduğu CD, DVD veya Blu-ray gibi saklama ortamlarının genel türü.",
    answer: "Optik Disk",
    aliases: ["optik disk", "optik surucu", "optik sürücü", "optik medye", "optik", "cd", "dvd"]
  },
  {
    letter: "Ö",
    question: "İnternette yaptığımız paylaşımlar, aramalar ve ziyaretlerle arkamızda bıraktığımız dijital iz.",
    answer: "Dijital Ayak İzi",
    aliases: ["dijital ayak izi", "ayak izi", "dijital ayakizi", "dijital iz", "ayakizi"]
  },
  {
    letter: "P",
    question: "Kod yazmayı öğrenmeyi kolaylaştıran, sade sözdizimine sahip popüler programlama dili.",
    answer: "Python",
    aliases: ["python", "paytın", "payton", "py"]
  },
  {
    letter: "R",
    question: "Bilgisayar açıkken çalışan programların verilerini geçici olarak saklayan ve elektrik kesildiğinde sıfırlanan bellek.",
    answer: "RAM",
    aliases: ["ram", "ram bellek", "gecici bellek", "geçici bellek", "random access memory"]
  },
  {
    letter: "S",
    question: "Blok tabanlı kodlama eğitiminde öğrencilere algoritma mantığını öğretmek için yaygın kullanılan platform.",
    answer: "Scratch",
    aliases: ["scratch", "skreç", "skrec"]
  },
  {
    letter: "Ş",
    question: "Hesaplarımızı ve verilerimizi yetkisiz kişilerden korumak için kullandığımız gizli güvenlik karakter dizisi.",
    answer: "Şifre",
    aliases: ["şifre", "sifre", "parola", "password"]
  },
  {
    letter: "T",
    question: "Bilgisayar ortamında bir web sayfası, afiş veya arayüzün görsel düzenini ve planını hazırlama süreci.",
    answer: "Tasarım",
    aliases: ["tasarım", "tasarim", "dizayn", "design", "arayuz tasarimi"]
  },
  {
    letter: "U",
    question: "Bilgisayar veya mobil cihazlarda kullanıcıların belirli işleri yapmasını sağlayan programlar.",
    answer: "Uygulama",
    aliases: ["uygulama", "app", "aplikasyon", "program", "yazilim"]
  },
  {
    letter: "Ü",
    question: "Bir web sitesi, uygulama veya dijital platformun sunduğu hizmetlerden yararlanmak için hesap oluşturma ve kayıt olma durumu.",
    answer: "Üyelik",
    aliases: ["üyelik", "uyelik", "kayit", "kayıt", "abone", "abonelik", "hesap acma"]
  },
  {
    letter: "V",
    question: "Bilgisayara izinsiz bulaşıp dosyalara zarar veren ve kendi kendini çoğaltabilen zararlı yazılım türü.",
    answer: "Virüs",
    aliases: ["virüs", "virus", "bilgisayar virusu", "trojan", "truva ati"]
  },
  {
    letter: "Y",
    question: "Bilgisayar donanımının çalışmasını sağlayan ve kullanıcıların görevleri yerine getirmesine yarayan kod ve komutlar bütünü.",
    answer: "Yazılım",
    aliases: ["yazılım", "yazilim", "software", "programlar"]
  },
  {
    letter: "Z",
    question: "Bilgisayar sistemlerinde saldırganların içeri sızmasına olanak tanıyan güvenlik açığı ve zayıflığı.",
    answer: "Zafiyet",
    aliases: ["zafiyet", "guvenlik acigi", "güvenlik açığı", "zayiflik", "zayıflık", "acik", "açık", "vulnerability"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PASSAPAROLA_DATA;
}

