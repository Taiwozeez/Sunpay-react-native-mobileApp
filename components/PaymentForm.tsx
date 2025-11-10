import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { PaymentFormData, Colors } from '../app/types';
import { Ionicons } from '@expo/vector-icons';

interface PaymentFormProps {
  onScheduleSuccess?: (scheduleData: { interval: string; count: number }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onScheduleSuccess }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    lampNumber: '',
    amount: '',
    paymentMethod: 'wallet',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    interval: 'days',
    count: 1,
  });
  const [isScheduled, setIsScheduled] = useState(false);

  const handlePayment = () => {
    if (!formData.lampNumber || !formData.amount) {
      Alert.alert('Error', 'Please enter Lamp Number and Amount');
      return;
    }

    if (isScheduled) {
      setShowSuccessModal(true);
    } else {
      Alert.alert('Success', `Payment of ${formData.amount} sent to Lamp ${formData.lampNumber}`);
    }
  };

  const handlePaymentMethodChange = (method: 'wallet' | 'card') => {
    setFormData({ ...formData, paymentMethod: method });
    setShowCardDetails(method === 'card');
  };

  const handleSchedulePress = () => {
    setShowScheduleModal(true);
  };

  const handleScheduleConfirm = () => {
    setIsScheduled(true);
    setShowScheduleModal(false);
    onScheduleSuccess?.(scheduleData);
  };

  const handleScheduleCancel = () => {
    setIsScheduled(false);
    setShowScheduleModal(false);
    setScheduleData({ interval: 'days', count: 1 });
  };

  const getScheduleText = () => {
    if (!isScheduled || !formData.amount) return null;
    
    const amount = formData.amount;
    const interval = scheduleData.interval;
    const count = scheduleData.count;
    
    const intervalText = count === 1 ? interval.slice(0, -1) : interval;
    return `₦${amount} deducted every ${count} ${intervalText}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make Payment</Text>
      
      {/* Lamp Number Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Enter Lamp No.</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 003842109"
          placeholderTextColor="#999"
          value={formData.lampNumber}
          onChangeText={(text) => setFormData({ ...formData, lampNumber: text })}
          keyboardType="numeric"
        />
      </View>

      {/* Amount Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Enter Amount</Text>
        <View style={styles.amountContainer}>
          <TextInput
            style={[styles.input, styles.amountInput]}
            placeholder="₦0.00"
            placeholderTextColor="#999"
            value={formData.amount}
            onChangeText={(text) => setFormData({ ...formData, amount: text })}
            keyboardType="numeric"
          />
          <TouchableOpacity 
            style={[
              styles.scheduleButton,
              isScheduled && styles.scheduleButtonActive
            ]} 
            onPress={handleSchedulePress}
          >
            <Text style={[
              styles.scheduleButtonText,
              isScheduled && styles.scheduleButtonTextActive
            ]}>
              Schedule
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Schedule Text */}
        {getScheduleText() && (
          <Text style={styles.scheduleText}>
            {getScheduleText()}
          </Text>
        )}
      </View>

      {/* Payment Method */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Pay With</Text>
        <View style={styles.paymentMethodContainer}>
          <TouchableOpacity
            style={[
              styles.paymentMethodButton,
              formData.paymentMethod === 'wallet' && styles.paymentMethodActive
            ]}
            onPress={() => handlePaymentMethodChange('wallet')}
          >
            <Text style={[
              styles.paymentMethodText,
              formData.paymentMethod === 'wallet' && styles.paymentMethodTextActive
            ]}>
              Wallet
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.paymentMethodButton,
              formData.paymentMethod === 'card' && styles.paymentMethodActive
            ]}
            onPress={() => handlePaymentMethodChange('card')}
          >
            <Text style={[
              styles.paymentMethodText,
              formData.paymentMethod === 'card' && styles.paymentMethodTextActive
            ]}>
              Card
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Details (Conditional) */}
      {showCardDetails && (
        <View style={styles.cardDetails}>
          <Text style={styles.cardDetailsTitle}>Enter Card Details</Text>
          
          {/* Card Types */}
          <View style={styles.cardTypes}>
            <View style={styles.cardType}>
              <Image 
                source={require('../assets/images/visaLogo.png')} 
                style={styles.cardImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.cardType}>
              <Image 
                source={require('../assets/images/VerveLogo.png')} 
                style={styles.cardImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.cardType}>
              <Image 
                source={require('../assets/images/mastercardLogo.png')} 
                style={styles.cardImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Card Number */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="#999"
              value={formData.cardNumber}
              onChangeText={(text) => setFormData({ ...formData, cardNumber: text })}
              keyboardType="numeric"
            />
          </View>

          {/* Expiry and CVV */}
          <View style={styles.row}>
            <View style={[styles.formGroup, styles.flex1]}>
              <Text style={styles.label}>MM/YY</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#999"
                value={formData.expiryDate}
                onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
                keyboardType="numeric"
              />
            </View>
            
            <View style={[styles.formGroup, styles.flex1, styles.cvvInput]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor="#999"
                value={formData.cvv}
                onChangeText={(text) => setFormData({ ...formData, cvv: text })}
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
          </View>
        </View>
      )}

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handlePayment}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Report Issue */}
      <TouchableOpacity style={styles.reportIssueButton}>
        <Text style={styles.reportIssueText}>Report an Issue</Text>
      </TouchableOpacity>

      {/* Schedule Modal */}
      <Modal
        visible={showScheduleModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleScheduleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Schedule Payment</Text>
            
            {/* Select Interval */}
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Select Interval</Text>
              <View style={styles.intervalContainer}>
                {['days', 'weeks', 'months', 'years'].map((interval) => (
                  <TouchableOpacity
                    key={interval}
                    style={[
                      styles.intervalButton,
                      scheduleData.interval === interval && styles.intervalButtonActive
                    ]}
                    onPress={() => setScheduleData({ ...scheduleData, interval })}
                  >
                    <Text style={[
                      styles.intervalText,
                      scheduleData.interval === interval && styles.intervalTextActive
                    ]}>
                      {interval.charAt(0).toUpperCase() + interval.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.divider} />

            {/* Set Count */}
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Set Count</Text>
              <View style={styles.countContainer}>
                <TouchableOpacity 
                  style={styles.countButton}
                  onPress={() => setScheduleData({ ...scheduleData, count: Math.max(1, scheduleData.count - 1) })}
                >
                  <Text style={styles.countButtonText}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.countDisplay}>{scheduleData.count}</Text>
                
                <TouchableOpacity 
                  style={styles.countButton}
                  onPress={() => setScheduleData({ ...scheduleData, count: scheduleData.count + 1 })}
                >
                  <Text style={styles.countButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleScheduleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.okButton]}
                onPress={handleScheduleConfirm}
              >
                <Text style={styles.okButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.successModal]}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={60} color={Colors.success} />
            </View>
            
            <Text style={styles.successTitle}>Scheduled Successfully</Text>
            
            <Text style={styles.successSubtitle}>
              You can cancel anytime
            </Text>

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.background,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amountInput: {
    flex: 1,
  },
  scheduleButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scheduleButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  scheduleButtonText: {
    color: Colors.text,
    fontWeight: '500',
    fontSize: 14,
  },
  scheduleButtonTextActive: {
    color: Colors.text,
    fontWeight: '600',
  },
  scheduleText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentMethodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  paymentMethodActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  paymentMethodText: {
    color: Colors.text,
    fontWeight: '500',
    fontSize: 14,
  },
  paymentMethodTextActive: {
    color: Colors.text,
    fontWeight: '600',
  },
  cardDetails: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  cardDetailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  cardTypes: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    justifyContent: 'center',
  },
  cardType: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 40,
    height: 25,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  cvvInput: {
    marginLeft: 0,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  continueButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportIssueButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  reportIssueText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  successModal: {
    alignItems: 'center',
    padding: 32,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  intervalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  intervalButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  intervalButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  intervalText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  intervalTextActive: {
    color: Colors.text,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  countButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  countDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    minWidth: 40,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  okButton: {
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  okButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  closeButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentForm;