import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors, PaymentHistoryItem } from '../app/types';

const HistoryScreen: React.FC = () => {
  const paymentHistory: PaymentHistoryItem[] = [
    { id: '1', date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), amount: '₦2,000', keycode: '123-456-789-011-012', status: 'Successful', type: 'Debit' },
    { id: '2', date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), amount: '₦3,500', keycode: 'N/A', status: 'Failed', type: 'Debit' },
    { id: '3', date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), amount: '₦1,200', keycode: '234-567-890-122-233', status: 'Successful', type: 'Debit' },
    { id: '4', date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), amount: '₦5,000', keycode: '345-678-901-233-344', status: 'Successful', type: 'Debit' },
    { id: '5', date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), amount: '₦1,800', keycode: 'N/A', status: 'Failed', type: 'Debit' },
    { id: '6', date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), amount: '₦7,000', keycode: '456-789-012-344-455', status: 'Successful', type: 'Debit' },
    { id: '7', date: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), amount: '₦2,750', keycode: '567-890-123-455-566', status: 'Successful', type: 'Debit' },
    { id: '8', date: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), amount: '₦3,100', keycode: 'N/A', status: 'Failed', type: 'Debit' },
    { id: '9', date: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), amount: '₦4,600', keycode: '678-901-234-566-677', status: 'Successful', type: 'Debit' },
    { id: '10', date: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), amount: '₦2,300', keycode: '789-012-345-677-788', status: 'Successful', type: 'Debit' },
    { id: '11', date: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(), amount: '₦10,000', keycode: '890-123-456-788-899', status: 'Successful', type: 'Top-up' },
    { id: '12', date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), amount: '₦15,000', keycode: '901-234-567-899-900', status: 'Successful', type: 'Top-up' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Successful' ? Colors.success : Colors.error;
  };

  const getStatusBackground = (status: string) => {
    return status === 'Successful' ? '#E8F5E8' : '#FFEBEE';
  };

  const getTypeColor = (type: string) => {
    return type === 'Top-up' ? Colors.topup : Colors.debit;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const copyToClipboard = (text: string) => {
    Alert.alert('Copied!', `Keycode copied to clipboard: ${text}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment History</Text>
          <Text style={styles.subtitle}>Your recent transactions and keycodes</Text>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{paymentHistory.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {paymentHistory.filter(item => item.status === 'Successful').length}
            </Text>
            <Text style={styles.summaryLabel}>Successful</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {paymentHistory.filter(item => item.status === 'Failed').length}
            </Text>
            <Text style={styles.summaryLabel}>Failed</Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.typeCell]}>TYPE</Text>
            <Text style={[styles.headerCell, styles.amountCell]}>AMOUNT</Text>
            <Text style={[styles.headerCell, styles.statusCell]}>STATUS</Text>
          </View>

          {paymentHistory.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.tableRow,
                index % 2 === 0 && styles.evenRow
              ]}
              onPress={() => item.keycode !== 'N/A' && copyToClipboard(item.keycode)}
            >
              <View style={[styles.cell, styles.typeCell]}>
                <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>
                  {item.type}
                </Text>
                <Text style={styles.timeText}>
                  {getTimeAgo(item.date)}
                </Text>
              </View>

              <View style={[styles.cell, styles.amountCell]}>
                <Text style={[
                  styles.amountText,
                  { color: item.type === 'Top-up' ? Colors.topup : Colors.text }
                ]}>
                  {item.type === 'Top-up' ? '+' : '-'}{item.amount}
                </Text>
                {item.keycode !== 'N/A' && (
                  <Text style={styles.keycodeHint}>Tap to copy keycode</Text>
                )}
              </View>

              <View style={[styles.cell, styles.statusCell]}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBackground(item.status) }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(item.status) }
                  ]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Load More Transactions</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  tableContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 12,
    marginBottom: 8,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  evenRow: {
    backgroundColor: '#fafafa',
    marginHorizontal: -8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  cell: {
    justifyContent: 'center',
  },
  typeCell: {
    width: '30%',
  },
  amountCell: {
    width: '35%',
  },
  statusCell: {
    width: '35%',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  keycodeHint: {
    fontSize: 10,
    color: Colors.primary,
    fontStyle: 'italic',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  viewAllButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  viewAllText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;