import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { Colors } from '../types';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, isUser: boolean, timestamp: Date}>>([]);
  const chatScrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate auto-reply after 2 seconds
    setTimeout(() => {
      const autoReply = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. Our support team will get back to you shortly. Our operating hours are Monday to Saturday, 9 AM - 5 PM.",
        isUser: false,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatScrollViewRef.current) {
      setTimeout(() => {
        chatScrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chatMessages]);

  const handleAttachFile = () => {
    Alert.alert('Attachment', 'File attachment feature would open file picker here');
    // In a real app, you would implement file picking logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>We&apos;re Here to</Text>
          <Text style={styles.headerTitle}>Listen & Support You</Text>
          <Text style={styles.headerSubtitle}>
            Reach out with your questions, feedback, or support needs. Our team is ready to assist you.
          </Text>
        </View>

        {/* Email Support */}
        <View style={styles.supportCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="mail-outline" size={24} color={Colors.primary} />
            <Text style={styles.cardTitle}>EMAIL SUPPORT</Text>
          </View>
          <Text style={styles.cardSubtitle}>Available Monday to Saturday, 9 AM - 5 PM</Text>
          <View style={styles.contactInfo}>
            <Ionicons name="calendar-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.contactText}>info@sunpay.com</Text>
          </View>
        </View>

        {/* Phone/Chat Support */}
        <View style={styles.supportCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="call-outline" size={24} color={Colors.primary} />
            <Text style={styles.cardTitle}>PHONE/CHAT SUPPORT</Text>
          </View>
          <Text style={styles.cardSubtitle}>Available Monday to Saturday, 9 AM - 5 PM</Text>
          <View style={styles.phoneNumbers}>
            <View style={styles.phoneRow}>
              <Ionicons name="call-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.phoneText}>(+234) 802 772 3084</Text>
            </View>
            <View style={styles.phoneRow}>
              <Ionicons name="call-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.phoneText}>(+234) 802 772 3084</Text>
            </View>
          </View>
        </View>

        {/* Social Media Support */}
        <View style={styles.supportCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="share-social-outline" size={24} color={Colors.primary} />
            <Text style={styles.cardTitle}>SOCIAL MEDIA PAGES SUPPORT</Text>
          </View>
          <Text style={styles.cardSubtitle}>Available Monday to Saturday, 9 AM - 5 PM</Text>
          <View style={styles.socialMediaContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/images/instagram.png')} 
                style={styles.socialIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/images/facebook.png')} 
                style={styles.socialIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/images/twitter.png')} 
                style={styles.socialIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>X (Twitter)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Chat Section */}
        <View style={styles.liveChatSection}>
          <Text style={styles.liveChatTitle}>Live Chat</Text>
          
          {/* Chat Messages */}
          <View style={styles.chatContainer}>
            <ScrollView
              ref={chatScrollViewRef}
              style={styles.chatScrollView}
              contentContainerStyle={styles.chatScrollViewContent}
              showsVerticalScrollIndicator={true}
            >
              {chatMessages.length === 0 ? (
                <View style={styles.emptyChat}>
                  <Ionicons name="chatbubble-ellipses-outline" size={48} color={Colors.border} />
                  <Text style={styles.emptyChatText}>No messages yet</Text>
                  <Text style={styles.emptyChatSubtext}>Start a conversation with our support team</Text>
                </View>
              ) : (
                chatMessages.map((msg) => (
                  <View 
                    key={msg.id} 
                    style={[
                      styles.messageBubble,
                      msg.isUser ? styles.userMessage : styles.supportMessage
                    ]}
                  >
                    <Text style={[
                      styles.messageText,
                      msg.isUser ? styles.userMessageText : styles.supportMessageText
                    ]}>
                      {msg.text}
                    </Text>
                    <Text style={styles.messageTime}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>

          {/* Chat Input */}
          <View style={styles.chatInputContainer}>
            <TouchableOpacity 
              style={styles.attachButton}
              onPress={handleAttachFile}
            >
              <Ionicons name="attach-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
            
            <TextInput
              style={styles.chatInput}
              placeholder="Type your message"
              placeholderTextColor={Colors.textSecondary}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            
            <TouchableOpacity 
              style={[
                styles.sendButton,
                message.trim() === '' && styles.sendButtonDisabled
              ]}
              onPress={handleSendMessage}
              disabled={message.trim() === ''}
            >
              <Ionicons 
                name="send-outline" 
                size={20} 
                color={message.trim() === '' ? Colors.textSecondary : Colors.text} 
              />
            </TouchableOpacity>
          </View>
        </View>

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
  headerSection: {
    marginBottom: 30,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    lineHeight: 34,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginTop: 12,
  },
  supportCard: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 12,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF6',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
    marginLeft: 8,
  },
  phoneNumbers: {
    gap: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF6',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  phoneText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
    marginLeft: 8,
  },
  socialMediaContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF6',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  liveChatSection: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  liveChatTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  chatContainer: {
    height: 300, // Fixed height for chat container
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  chatScrollView: {
    flex: 1,
  },
  chatScrollViewContent: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'flex-end', // This makes messages stack from bottom
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyChatText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 12,
    fontWeight: '600',
  },
  emptyChatSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  supportMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.text,
  },
  supportMessageText: {
    color: Colors.text,
  },
  messageTime: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'right',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  chatInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    padding: 8,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.border,
  },
  bottomSpacer: {
    height: 20,
  },
});