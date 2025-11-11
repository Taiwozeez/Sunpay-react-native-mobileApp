import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../app/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface HeaderProps {
  onNotificationPress?: () => void;
  onRefreshPress?: () => void;
  refreshing?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onNotificationPress, 
  onRefreshPress, 
  refreshing = false 
}) => {
  const router = useRouter();

  const handleNotificationPress = () => {
    // Navigate to notifications page (now in root app directory)
    router.push('/notifications');
  };

  return (
    <View style={styles.header}>
      <View style={styles.statusBarBackground} />
      
      {/* Top Bar with Refresh and Notification */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onRefreshPress}
          disabled={refreshing}
        >
          <Ionicons 
            name="refresh" 
            size={24} 
            color={Colors.primary} 
            style={refreshing ? styles.refreshingIcon : undefined}
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.notificationIcon} 
          onPress={handleNotificationPress}
        >
          <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Title Only - Removed Subtitle */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>SunPay</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statusBarBackground: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#1a1a1a',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconButton: {
    padding: 8,
  },
  notificationIcon: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 1,
  },
  refreshingIcon: {
    transform: [{ rotate: '360deg' }],
  },
});

export default Header;