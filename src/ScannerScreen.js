import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import styles, { colors } from './styles';
import { addScan } from './storage';

const barcodeTypes = [
  'qr', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code39', 'code93',
  'code128', 'itf14', 'aztec', 'pdf417', 'datamatrix',
];

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchOn, setTorchOn] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [manualCode, setManualCode] = useState('');

  useEffect(() => {
    if (permission && !permission.granted) requestPermission();
  }, [permission]);

  const saveCode = async (data, type) => {
    const cleanData = data.trim();
    if (!cleanData) return;
    await addScan(cleanData, type);
    setLastScan({ data: cleanData, type });
  };

  const handleBarcodeScanned = async ({ type, data }) => {
    if (!scanning) return;
    setScanning(false);
    await saveCode(data, type);
    setTimeout(() => setScanning(true), 1500);
  };

  const saveManualCode = async () => {
    if (!manualCode.trim()) {
      Alert.alert('Code fehlt', 'Bitte gib einen Barcode oder QR-Code ein.');
      return;
    }
    await saveCode(manualCode, 'manuell');
    setManualCode('');
    Alert.alert('Gespeichert', 'Der manuell eingegebene Code wurde im Verlauf gespeichert.');
  };

  const copyToClipboard = async () => {
    if (!lastScan) return;
    await Clipboard.setStringAsync(lastScan.data);
    Alert.alert('Kopiert', 'Code in die Zwischenablage kopiert.');
  };

  if (!permission) {
    return <View style={styles.permissionContainer}><Text style={styles.permissionText}>Kamera wird geladen...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Kameraberechtigung erforderlich, um Codes zu scannen.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Berechtigung erteilen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={local.screen}>
      <Text style={local.title}>Barcode & QR Scanner</Text>
      <Text style={local.subtitle}>Code innerhalb des Rahmens ausrichten</Text>

      <View style={local.cameraFrame}>
        <CameraView
          style={local.camera}
          facing="back"
          enableTorch={torchOn}
          barcodeScannerSettings={{ barcodeTypes }}
          onBarcodeScanned={handleBarcodeScanned}
        />
        <View pointerEvents="none" style={local.targetFrame} />
      </View>

      <TouchableOpacity style={local.torchButton} onPress={() => setTorchOn((value) => !value)}>
        <Text style={local.torchText}>{torchOn ? '🔦 Taschenlampe an' : '🔦 Taschenlampe aus'}</Text>
      </TouchableOpacity>

      {lastScan && (
        <View style={local.result}>
          <Text numberOfLines={2} style={local.resultData}>{lastScan.data}</Text>
          <Text style={local.resultType}>Typ: {lastScan.type}</Text>
          <TouchableOpacity style={local.copyButton} onPress={copyToClipboard}>
            <Text style={local.copyText}>📋 Kopieren</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={local.manualBox}>
        <Text style={local.manualTitle}>Manuelle Eingabe</Text>
        <TextInput
          value={manualCode}
          onChangeText={setManualCode}
          placeholder="Barcode oder QR-Code eingeben"
          placeholderTextColor={colors.textDim}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={saveManualCode}
          style={local.input}
        />
        <TouchableOpacity style={local.saveButton} onPress={saveManualCode}>
          <Text style={local.saveText}>Code speichern</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const local = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { color: colors.text, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 8 },
  subtitle: { color: colors.textDim, fontSize: 14, textAlign: 'center', marginTop: 6, marginBottom: 16 },
  cameraFrame: { height: 255, borderRadius: 16, overflow: 'hidden', borderWidth: 2, borderColor: colors.accent, backgroundColor: '#000' },
  camera: { flex: 1 },
  targetFrame: { position: 'absolute', left: '12%', right: '12%', top: '26%', bottom: '26%', borderWidth: 2, borderColor: '#fff', borderRadius: 10 },
  torchButton: { alignSelf: 'center', marginTop: 12, backgroundColor: colors.primary, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20 },
  torchText: { color: colors.text, fontSize: 14, fontWeight: '600' },
  result: { marginTop: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12 },
  resultData: { color: colors.text, fontSize: 16, fontWeight: '700' },
  resultType: { color: colors.accent, fontSize: 12, marginTop: 4 },
  copyButton: { alignSelf: 'flex-start', marginTop: 10, backgroundColor: colors.primary, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 8 },
  copyText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  manualBox: { marginTop: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14 },
  manualTitle: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 10 },
  input: { color: colors.text, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 11, fontSize: 15 },
  saveButton: { marginTop: 10, backgroundColor: colors.accent, borderRadius: 8, alignItems: 'center', paddingVertical: 12 },
  saveText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
