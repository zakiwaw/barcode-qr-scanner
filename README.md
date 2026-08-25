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

## 🚀 Variante 1: Expo Snack (ohne Terminal, nur Browser + Handy)

Diese Variante benötigt **kein Terminal und keine Installation** auf einem Computer.

### Schritt 1: Expo Go auf dem Handy installieren

- **iPhone:** [Expo Go im App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android:** [Expo Go im Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Schritt 2: Repo in Snack importieren

1. Öffne [snack.expo.dev](https://snack.expo.dev) im Browser (Safari, Chrome, etc.)
2. Klicke oben auf **"Import"** oder das **GitHub-Icon**
3. Füge diese URL ein: `https://github.com/zakiwaw/barcode-qr-scanner`
4. Klicke **"Import"** — Snack lädt alle Dateien automatisch

### Schritt 3: SDK-Version wählen

- Oben rechts in Snack kannst du die SDK-Version auswählen
- Wähle **SDK 54** (oder die neueste verfügbare Version)

### Schritt 4: QR-Code scannen

- Snack zeigt rechts einen **QR-Code** an
- Öffne die **Kamera-App** (iPhone) oder **Expo Go App** (Android)
- Scanne den QR-Code → die App öffnet sich in Expo Go

### Schritt 5: App nutzen

- Die Kamera startet automatisch — halte einen Barcode/QR-Code vor die Kamera
- Scans werden lokal gespeichert — wechsle zum Tab "📋 Verlauf"
- Tipps: 🔦 Taschenlampe an/aus, 📋 Code kopieren, 🗑 löschen

> **Wichtig:** Handy und Computer (falls verwendet) müssen nicht im selben WLAN sein — Snack läuft in der Cloud.

## 💻 Variante 2: Lokal mit Terminal

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
