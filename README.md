# Bilişim Teknolojileri Passaparola Oyunu 🎮🖥️

Etkileşimli tahtalar (akıllı tahtalar), tabletler ve bilgisayarlar için tasarlanmış modern, eğlenceli ve öğretici **Bilişim Teknolojileri Passaparola Web Oyunu**.

Bu proje, Bilişim Teknolojileri ve Yazılım dersi kazanımlarına uygun 28 soruluk soru-cevap havuzunu dairesel Passaparola çarkı formatında sunar.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-Offline-success?style=for-the-badge)

### 🌐 [Oyunu Tarayıcıda Canlı Oyna (GitHub Pages)](https://omurgurel.github.io/bilisim-teknolojileri-passaparola/)

---

## ✨ Özellikler

- ⭕ **Dairesel Passaparola Çarkı:** Alfabenin 28 harfi dairesel oyun şovu çarkı üzerinde canlı durum renkleriyle (Aktif: Sarı, Doğru: Yeşil, Yanlış: Kırmızı, Pas: Turuncu) gösterilir.
- 🔁 **2. Tur (PAS Döngüsü):** İlk turda pas geçilen tüm sorulara süre yettiği sürece tekrar sırayla dönülür.
- ⌨️ **Dokunmatik Akıllı Tahta Sanal Klavyesi:** Dokunmatik ekranlarda öğrencilerin doğrudan ekrana dokunarak hızlıca cevap yazabilmesi için açılıp kapatılabilen Türkçe Q sanal klavye.
- 👥 **Sınıf & Takım Modu:** Bireysel modun yanı sıra sınıfta yarışma düzenlemek için **A Takımı vs B Takımı** modu.
- 🔊 **Çevrimdışı Ses Efektleri:** Web Audio API ile sıfır harici dosya bağımlılığıyla çalışan anlık zil, buzzer, pas ve zafer melodileri.
- 🔤 **Akıllı Türkçe Karakter Normalizasyonu:** Büyük/küçük harf, İ/ı, Ş/s, Ç/c farklarını tolere eder; *Binary* / *İkili Kod*, *Malware* / *Kötü Amaçlı Yazılım* gibi alternatif doğru cevapları tanır.
- 📋 **Sonuç Karnesi & İnceleme:** Oyun sonunda puan, doğru/yanlış/pas dağılımı ve harf harf tüm soruların doğru cevaplarını listeleyen interaktif karne ekranı.
- 🎉 **Konfeti Kutlaması:** Oyun bitiminde dinamik zafer konfetisi animasyonu.

---

## 📂 Proje Yapısı

```
├── BtOyun/
│   ├── bilisim_teknolojileri_passaparola.md  # 28 soruluk orijinal kaynak
│   ├── index.html                           # Ana oyun arayüzü & modallar
│   ├── style.css                            # Siber oyun şovu ve neon temalı stiller
│   ├── questions.js                         # Soru ve cevap havuzu veri seti
│   ├── audio.js                             # Web Audio API ses efektleri motoru
│   └── app.js                               # Oyun motoru, çark matematiği ve durum yönetimi
├── index.html                               # Kök yönlendirme sayfası
└── README.md                                # Proje tanıtım ve kullanım kılavuzu
```

---

## 🚀 Nasıl Çalıştırılır?

1. Projeyi bilgisayarınıza indirin veya klonlayın:
   ```bash
   git clone https://github.com/omurgurel/bilisim-teknolojileri-passaparola.git
   ```
2. `BtOyun/index.html` dosyasını herhangi bir web tarayıcısında (Google Chrome, Microsoft Edge vb.) çift tıklayarak açın.
3. Herhangi bir sunucu veya internet bağlantısı gerektirmez; tamamen çevrimdışı (offline) çalışır.

---

## 📜 Lisans

Bu proje eğitim ve öğretim amaçlı açık kaynak olarak paylaşılmıştır.
