import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@scan_history';

export async function getScanHistory() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Fehler beim Laden:', e);
    return [];
  }
}

export async function addScan(data, type) {
  try {
    const history = await getScanHistory();

    // Duplikat-Filter: Code existiert bereits irgendwo im Verlauf?
    const exists = history.some((item) => item.data === data);
    if (exists) {
      return { history, duplicate: true };
    }

    const entry = {
      id: Date.now().toString(),
      data,
      type,
      timestamp: new Date().toISOString(),
    };

    const newHistory = [entry, ...history];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return { history: newHistory, duplicate: false };
  } catch (e) {
    console.error('Fehler beim Speichern:', e);
    return { history: [], duplicate: false };
  }
}

export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Fehler beim Löschen:', e);
  }
}

export async function deleteScan(id) {
  try {
    const history = await getScanHistory();
    const newHistory = history.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
  } catch (e) {
    console.error('Fehler beim Löschen:', e);
    return [];
  }
}
