# 📸 Okey 101 OCR Uygulaması

React Native ile geliştirilen bu mobil uygulama, kullanıcıdan ıstaka fotoğrafı alır, OCR (Optical Character Recognition) ile taşların üzerindeki sayıları tanır ve bu sayıların toplamının 101'e ulaşıp ulaşmadığını otomatik olarak hesaplar.

---

## 🖼 Demo

<img src="assets/okey.gif" width="300" />

---

## 🔧 Kullanılan Teknolojiler
- React Native CLI (0.76)
- ML Kit Text Recognition (Google ML Kit)
- react-native-image-picker (kamera erişimi için)

---

## 🚀 Özellikler
- 📷 Kamera ile ıstaka fotoğrafı çekme
- 🔍 OCR ile taşlar üzerindeki sayıların tanınması *(not: OCR mobilde sınırlı çalışır)*
- ➕ Toplanan sayıların otomatik olarak kontrol edilmesi
- ⚠️ Python + OpenCV backend ile daha iyi doğruluk sağlanabilir *(mevcut sistem tam optimize değil)*

---

## 🛠 Kurulum

```bash
git clone https://github.com/kullaniciadi/okey101-ocr-app.git
cd okey101-ocr-app
npm install
cd ios
pod install
cd ..
npx react-native run-ios
