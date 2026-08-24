import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import styles, { colors } from './styles';
import { getScanHistory, clearHistory, deleteScan } from './storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(async () => {
    const data = await getScanHistory();
    setHistory(data);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleClear = () => {
    Alert.alert(
      'Verlauf löschen',
      'Möchtest du wirklich den gesamten Scan-Verlauf löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            setHistory([]);
          },
        },
      ]
    );
  };

  const handleDelete = async (id) => {
    const newHistory = await deleteScan(id);
    setHistory(newHistory);
  };

  const handleCopy = async (data) => {
    await Clipboard.setStringAsync(data);
    Alert.alert('Kopiert', 'Code in die Zwischenablage kopiert!');
  };

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyItemData}>{item.data}</Text>
      <Text style={styles.historyItemType}>Typ: {item.type}</Text>
      <Text style={styles.historyItemTime}>{formatTime(item.timestamp)}</Text>
      <View style={styles.historyActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => handleCopy(item.data)}
        >
          <Text style={styles.actionButtonText}>📋 Kopieren</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.accent }]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.actionButtonText}>🗑 Löschen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Scan-Verlauf</Text>
      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Noch keine Scans vorhanden.{'\n'}Scanne einen Barcode oder QR-Code!
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onRefresh={loadHistory}
            refreshing={false}
          />
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Verlauf löschen</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
