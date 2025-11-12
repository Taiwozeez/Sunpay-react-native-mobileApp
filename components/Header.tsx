import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
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
    router.push('/notifications');
  };

  return (
    <ImageBackground
      source={require('../assets/images/lady-phone2 (2).jpg')} // your image path
      style={styles.header}
      resizeMode="cover"
    >
      {/* Dark overlay */}
      <View style={styles.overlay} />

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
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>SunPay</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 220, // increased height
    paddingHorizontal: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // dark overlay with opacity
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2, // above overlay
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
    zIndex: 2, // above overlay
    position: 'absolute',
    top: 90, // moves the title up; adjust as needed
    left: 0,
    right: 0,
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
