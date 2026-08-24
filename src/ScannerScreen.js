import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import styles from './styles';
import { addScan } from './storage';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchOn, setTorchOn] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Kamera wird geladen...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Kameraberechtigung erforderlich, um Barcodes und QR-Codes zu scannen.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Berechtigung erteilen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = async ({ type, data }) => {
    if (!scanning) return;
    setScanning(false);
    setLastScan({ type, data });
    await addScan(data, type);

    setTimeout(() => {
      setScanning(true);
    }, 1500);
  };

  const copyToClipboard = async () => {
    if (lastScan) {
      await Clipboard.setStringAsync(lastScan.data);
      Alert.alert('Kopiert', 'Code in die Zwischenablage kopiert!');
    }
  };

  return (
    <View style={styles.cameraContainer}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        enableTorch={torchOn}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code39', 'code93', 'code128', 'itf14', 'aztec', 'pdf417', 'datamatrix'],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      >
        <View style={styles.scanFrame} />

        <TouchableOpacity
          style={styles.torchButton}
          onPress={() => setTorchOn(!torchOn)}
        >
          <Text style={styles.torchText}>{torchOn ? '🔦 An' : '🔦 Aus'}</Text>
        </TouchableOpacity>

        {lastScan && (
          <View style={styles.scanResult}>
            <Text style={styles.scanResultText}>{lastScan.data}</Text>
            <Text style={styles.scanResultType}>Typ: {lastScan.type}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Text style={styles.copyButtonText}>📋 Kopieren</Text>
            </TouchableOpacity>
          </View>
        )}
      </CameraView>
    </View>
  );
}
