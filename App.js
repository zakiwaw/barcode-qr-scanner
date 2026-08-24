import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import ScannerScreen from './src/ScannerScreen';
import HistoryScreen from './src/HistoryScreen';
import styles from './src/styles';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {activeTab === 'scanner' ? <ScannerScreen /> : <HistoryScreen />}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'scanner' && styles.tabActive]}
          onPress={() => setActiveTab('scanner')}
        >
          <Text style={[styles.tabText, activeTab === 'scanner' && styles.tabTextActive]}>
            📷 Scanner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            📋 Verlauf
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
