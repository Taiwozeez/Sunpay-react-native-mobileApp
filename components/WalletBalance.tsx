import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Alert,
  Image,
  ScrollView,
  TextInput
} from 'react-native';
import { User, Colors } from '../app/types';
import { Ionicons } from '@expo/vector-icons';

interface WalletBalanceProps {
  user: User;
}

interface VirtualAccount {
  accountNumber: string;
  bankName: string;
  accountName: string;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ user }) => {
  const [showAddMoneyDrawer, setShowAddMoneyDrawer] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [virtualAccount, setVirtualAccount] = useState<VirtualAccount | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      setVirtualAccount(null);
      setTimeLeft(null);
      return;
    }

    if (timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const copyToClipboard = (text: string) => {
    Alert.alert('Copied!', `Account number copied to clipboard: ${text}`);
  };

  const handleVirtualAccountCopy = () => {
    if (virtualAccount) {
      copyToClipboard(virtualAccount.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateVirtualAccount = () => {
    // Generate a random 10-digit account number
    const generatedAccountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
    const newVirtualAccount: VirtualAccount = {
      accountNumber: generatedAccountNumber,
      bankName: "Sunpay NG",
      accountName: "Go Sunpay"
    };
    
    setVirtualAccount(newVirtualAccount);
    setTimeLeft(3600); // 60 minutes in seconds
  };

  const handleAddMoney = (method: 'bank' | 'card') => {
    if (method === 'bank') {
      Alert.alert('Bank Transfer', 'Use the account details below to transfer money to your SunPay wallet');
    } else {
      Alert.alert('Card Payment', 'Redirecting to card payment...');
    }
    setShowAddMoneyDrawer(false);
  };

  const handleCardPayment = () => {
    if (!cardNumber || !expiryDate || !cvv || !amount) {
      Alert.alert('Error', 'Please fill in all card details and amount');
      return;
    }
    Alert.alert('Success', `₦${amount} added to your wallet successfully!`);
    setShowAddMoneyDrawer(false);
    // Reset form
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setAmount('');
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back! Taiwo 👋</Text>
        <Text style={styles.balanceLabel}>Wallet Balance</Text>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceAmount}>{formatNaira(user.walletBalance)}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddMoneyDrawer(true)}
          >
            <Text style={styles.addButtonText}>Add Money</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.updatedText}>Updated just now</Text>
      </View>

      {/* Add Money Drawer */}
      <Modal
        visible={showAddMoneyDrawer}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddMoneyDrawer(false)}
      >
        <View style={styles.drawerOverlay}>
          <TouchableOpacity 
            style={styles.drawerBackground}
            onPress={() => setShowAddMoneyDrawer(false)}
          />
          
          <View style={styles.drawerContent}>
            {/* Drag Handle */}
            <View style={styles.dragHandle} />
            
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Add Money</Text>
              <TouchableOpacity 
                onPress={() => setShowAddMoneyDrawer(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.drawerBody}>
              {/* Current Balance */}
              <View style={styles.balanceSection}>
                <Text style={styles.balanceLabelDrawer}>Wallet Balance</Text>
                <Text style={styles.balanceAmountDrawer}>{formatNaira(user.walletBalance)}</Text>
              </View>

              {/* Virtual Account Section */}
              <View style={styles.optionCard}>
                <Text style={styles.sectionTitle}>Virtual Account</Text>
                
                {virtualAccount ? (
                  <View style={styles.virtualAccountDetails}>
                    <View style={styles.accountRow}>
                      <Text style={styles.virtualAccountNumber}>{virtualAccount.accountNumber}</Text>
                      <TouchableOpacity 
                        style={[styles.copyButton, copied && styles.copiedButton]}
                        onPress={handleVirtualAccountCopy}
                      >
                        <Text style={styles.copyText}>{copied ? 'Copied!' : 'Copy'}</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.virtualAccountInfo}>
                      <Text style={styles.virtualAccountInfoText}>
                        <Text style={styles.infoLabel}>Bank: </Text>
                        {virtualAccount.bankName}
                      </Text>
                      <Text style={styles.virtualAccountInfoText}>
                        <Text style={styles.infoLabel}>Account Name: </Text>
                        {virtualAccount.accountName}
                      </Text>
                    </View>

                    {timeLeft !== null && (
                      <Text style={styles.expiryText}>
                        This account will expire in {formatTime(timeLeft)}
                      </Text>
                    )}
                  </View>
                ) : (
                  <View style={styles.generateAccountSection}>
                    <Text style={styles.generateAccountText}>
                      Generate a temporary virtual account to add money
                    </Text>
                    <TouchableOpacity 
                      style={styles.generateButton}
                      onPress={generateVirtualAccount}
                    >
                      <Text style={styles.generateButtonText}>Generate Virtual Account</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Bank Transfer Option
              <View style={styles.optionCard}>
                <Text style={styles.sectionTitle}>SunPay Bank Account</Text>
                
                <View style={styles.accountDetails}>
                  <View style={styles.accountRow}>
                    <Text style={styles.accountNumber}>123456789</Text>
                    <TouchableOpacity 
                      style={styles.copyButton}
                      onPress={() => copyToClipboard('123456789')}
                    >
                      <Text style={styles.copyText}>Copy</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.accountInfoRow}>
                    <Text style={styles.accountInfoLabel}>Account Name:</Text>
                    <Text style={styles.accountInfoValue}>SunPay NG</Text>
                  </View>
                </View>
              </View> */}

              {/* Card Payment Option */}
              <View style={styles.optionCard}>
                <Text style={styles.sectionTitle}>Card Payment</Text>
                
                {/* Card Icons */}
                <View style={styles.cardIconsContainer}>
                  <Image 
                    source={require('../assets/images/visaLogo.png')} 
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                  <Image 
                    source={require('../assets/images/mastercardLogo.png')} 
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                  <Image 
                    source={require('../assets/images/VerveLogo.png')} 
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.separator} />

                {/* Card Form */}
                <View style={styles.cardForm}>
                  <Text style={styles.inputLabel}>Card Number</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="numeric"
                    maxLength={16}
                  />

                  <View style={styles.rowInputs}>
                    <View style={styles.halfInput}>
                      <Text style={styles.inputLabel}>MM/YY</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                        maxLength={5}
                      />
                    </View>
                    <View style={styles.halfInput}>
                      <Text style={styles.inputLabel}>CVV</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="CVV"
                        value={cvv}
                        onChangeText={setCvv}
                        keyboardType="numeric"
                        maxLength={3}
                        secureTextEntry
                      />
                    </View>
                  </View>

                  <Text style={styles.inputLabel}>Enter Amount</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                  />
                  <Text style={styles.amountDisplay}>₦{amount || '0.00'}</Text>

                  <View style={styles.separator} />

                  <TouchableOpacity 
                    style={styles.addMoneyButton}
                    onPress={handleCardPayment}
                  >
                    <Text style={styles.addMoneyButtonText}>Add Money</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.reportIssueButton}>
                    <Text style={styles.reportIssueText}>Report an Issue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    borderRadius: 16,
    marginTop: -25,
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
  welcomeText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    fontWeight: '400',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.naira,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  updatedText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Drawer Styles
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  drawerBackground: {
    flex: 1,
  },
  drawerContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  drawerBody: {
    padding: 20,
  },
  balanceSection: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  balanceLabelDrawer: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  balanceAmountDrawer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.naira,
  },
  optionCard: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  // Virtual Account Styles
  virtualAccountDetails: {
    backgroundColor: '#FFFDF6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  virtualAccountNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  virtualAccountInfo: {
    marginTop: 8,
  },
  virtualAccountInfoText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  expiryText: {
    fontSize: 12,
    color: '#FF4444',
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  generateAccountSection: {
    backgroundColor: '#FFFDF6',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  generateAccountText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  generateButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  generateButtonText: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  copiedButton: {
    backgroundColor: '#4CAF50',
  },
  // Existing Styles
  accountDetails: {
    backgroundColor: '#FFFDF6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accountNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  accountInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountInfoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  accountInfoValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  copyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
  },
  cardIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
    marginBottom: 12,
  },
  cardIcon: {
    width: 50,
    height: 30,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  cardForm: {
    marginTop: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  amountDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.naira,
    textAlign: 'center',
    marginBottom: 16,
  },
  addMoneyButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  addMoneyButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportIssueButton: {
    alignItems: 'center',
    padding: 8,
  },
  reportIssueText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});

export default WalletBalance;