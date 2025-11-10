import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../types';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: '1',
      title: 'Payment Successful',
      message: 'Your payment of ₦2,750 was processed successfully',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'Wallet Top-up',
      message: 'Your wallet has been credited with ₦10,000',
      time: '6 hours ago',
      read: true,
    },
    {
      id: '3',
      title: 'Scheduled Payment',
      message: 'Your scheduled payment for Lamp 003842109 is due tomorrow',
      time: '1 day ago',
      read: true,
    },
    {
      id: '4',
      title: 'Security Alert',
      message: 'New login detected from your device',
      time: '2 days ago',
      read: true,
    },
    {
      id: '5',
      title: 'App Update',
      message: 'New version of SunPay is available. Update now for new features',
      time: '3 days ago',
      read: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {notifications.map((notification) => (
          <TouchableOpacity 
            key={notification.id} 
            style={[
              styles.notificationCard,
              !notification.read && styles.unreadNotification
            ]}
          >
            <View style={styles.notificationIcon}>
              <Ionicons 
                name="notifications" 
                size={24} 
                color={Colors.primary} 
              />
            </View>
            
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>

            {!notification.read && (
              <View style={styles.unreadIndicator} />
            )}
          </TouchableOpacity>
        ))}
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  notificationCard: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: '#FFFDE7',
    borderColor: Colors.primary,
  },
  notificationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: 8,
    marginTop: 4,
  },
  bottomSpacer: {
    height: 20,
  },
});