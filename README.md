# 📸 Okey 101 OCR Uygulaması

React Native ile geliştirilen mobil uygulama. Kullanıcı ıstakasının fotoğrafını çeker, OCR ile taşlar tanınır ve toplamı hesaplanarak 101'e ulaşıp ulaşmadığı otomatik kontrol edilir.

## 🔧 Kullanılan Teknolojiler
- React Native CLI (0.76)
- ML Kit Text Recognition
- react-native-image-picker

## 🚀 Özellikler
- Kamera ile ıstaka fotoğrafı çekme
- OCR ile taş üzerindeki sayıların algılanması(iyi algılayamıyor)
- Sayıların toplanarak 101 kontrolü(tam optimize değil python kullanılmalı)



## 🛠 Kurulum
```bash
git clone https://github.com/kullaniciadi/okey101-ocr-app.git
cd okey101-ocr-app
npm install
cd ios && pod install && cd ..
npx react-native run-ios
