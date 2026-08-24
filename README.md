# 📷 Barcode & QR-Code Scanner

Eine React Native / Expo Go App zum Scannen von Barcodes und QR-Codes mit lokaler Verlaufsspeicherung.

## ✨ Features

- 📷 Barcode & QR-Code Scanner (EAN13, EAN8, UPC, Code39, Code128, QR, Aztec, PDF417, DataMatrix)
- 🔦 Taschenlampe ein/aus
- 📋 Scan-Verlauf mit lokaler Speicherung (AsyncStorage, persistent über App-Neustarts)
- 🚫 Duplikat-Filter
- 📋 Code in Zwischenablage kopieren
- 🗑 Einzelne Scans oder gesamten Verlauf löschen
- 🌙 Dark Mode UI

## 🚀 Installation

```bash
git clone https://github.com/zakiwaw/barcode-qr-scanner.git
cd barcode-qr-scanner
npm install
npx expo start
```

In der Expo Go App den QR-Code scannen, um die App zu öffnen.

## 📁 Projektstruktur

```
barcode-qr-scanner/
├── App.js              # Haupt-App mit Tab-Navigation
├── package.json        # Dependencies
├── app.json            # Expo Konfiguration
├── .gitignore
└── src/
    ├── ScannerScreen.js  # Kamera-Scanner mit Taschenlampe
    ├── HistoryScreen.js  # Scan-Verlauf mit Löschfunktion
    ├── storage.js        # AsyncStorage Helper (CRUD)
    └── styles.js         # Styles & Farbpalette
```

## 🔧 Technologie

| Library | Version |
|---|---|
| React Native | 0.76.7 |
| Expo SDK | 54 |
| expo-camera | ~16.0.0 |
| @react-native-async-storage/async-storage | 2.1.0 |
| expo-clipboard | ~7.0.0 |

## 📄 Lizenz

MIT
