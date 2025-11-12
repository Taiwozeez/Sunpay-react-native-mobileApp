import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PaymentHistoryItem, Colors } from '../app/types';
import { useRouter } from 'expo-router';

interface RecentTransactionsProps {
  transactions: PaymentHistoryItem[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const router = useRouter();

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Top-up' ? Colors.topup : Colors.debit;
  };

  const getStatusColor = (status: string) => {
    return status === 'Successful' ? Colors.success : Colors.error;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => router.push('/history')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {transactions.slice(0, 4).map((item) => (
        <View key={item.id} style={styles.transactionItem}>
          <View style={styles.transactionInfo}>
            <View style={styles.transactionHeader}>
              <Text style={[styles.transactionType, { color: getTypeColor(item.type) }]}>
                {item.type}
              </Text>
              <Text style={styles.transactionTime}>
                {getTimeAgo(item.date)}
              </Text>
            </View>
            <Text style={styles.transactionKeycode}>
              {item.keycode !== 'N/A' ? 'Keycode available' : 'Payment failed'}
            </Text>
            <Text style={styles.lampNumber}>
              LN: {item.lampNumber}
            </Text>
          </View>
          <View style={styles.transactionAmount}>
            <Text style={[
              styles.amountText,
              { color: item.type === 'Top-up' ? Colors.topup : Colors.text }
            ]}>
              {item.type === 'Top-up' ? '+' : '-'}{item.amount}
            </Text>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  viewAllText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  transactionKeycode: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  lampNumber: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RecentTransactions;