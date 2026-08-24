import { StyleSheet } from 'react-native';

export const colors = {
  background: '#1a1a2e',
  surface: '#16213e',
  primary: '#0f3460',
  accent: '#e94560',
  text: '#eee',
  textDim: '#999',
  border: '#2a2a4e',
  success: '#4CAF50',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabActive: {
    borderTopWidth: 3,
    borderTopColor: colors.accent,
  },
  tabText: {
    color: colors.textDim,
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.text,
  },
  // Scanner
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  scanFrame: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    height: 200,
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  torchButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  torchText: {
    color: colors.text,
    fontSize: 16,
  },
  scanResult: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 16,
    borderRadius: 12,
  },
  scanResultText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanResultType: {
    color: colors.accent,
    fontSize: 12,
    marginTop: 4,
  },
  copyButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  copyButtonText: {
    color: colors.text,
    fontSize: 13,
  },
  // History
  historyContainer: {
    flex: 1,
    padding: 16,
  },
  historyTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  historyItem: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyItemData: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  historyItemType: {
    color: colors.accent,
    fontSize: 12,
    marginTop: 4,
  },
  historyItemTime: {
    color: colors.textDim,
    fontSize: 12,
    marginTop: 4,
  },
  historyActions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: colors.textDim,
    fontSize: 16,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: colors.accent,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Permission
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
