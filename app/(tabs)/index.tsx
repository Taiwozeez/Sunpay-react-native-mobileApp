"use client"

import { useState, useCallback } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Alert, RefreshControl } from "react-native"
import Header from "../../components/Header"
import WalletBalance from "../../components/WalletBalance"
import PaymentForm from "../../components/PaymentForm"
import RecentTransactions from "../../components/RecentTransactions"
import { type PaymentHistoryItem, type User, Colors } from "../types"

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [user, setUser] = useState<User>({
    name: "Taiwo Adelaja",
    walletBalance: 14003.98,
  })

  const [recentTransactions, setRecentTransactions] = useState<PaymentHistoryItem[]>([
    {
      id: "1",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      amount: "₦2,750",
      keycode: "123-456-789-011-012",
      status: "Successful",
      type: "Debit",
    },
    {
      id: "2",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      amount: "₦7,000",
      keycode: "234-567-890-122-233",
      status: "Successful",
      type: "Debit",
    },
    {
      id: "3",
      date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      amount: "₦5,000",
      keycode: "N/A",
      status: "Failed",
      type: "Debit",
    },
    {
      id: "4",
      date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      amount: "₦10,000",
      keycode: "345-678-901-233-344",
      status: "Successful",
      type: "Top-up",
    },
  ])

  const handleNotificationPress = () => {
    Alert.alert("Notifications", "You have 5 unread notifications", [
      {
        text: "View All",
        onPress: () => console.log("View All pressed"),
        style: "default",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ])
  }

  const handleScheduleSuccess = (scheduleData: { interval: string; count: number }) => {
    console.log("Schedule set:", scheduleData)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    setTimeout(() => {
      setUser({
        name: "Taiwo Adelaja",
        walletBalance: 14003.98 + Math.random() * 1000,
      })

      const newTransaction: PaymentHistoryItem = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        amount: `₦${Math.floor(500 + Math.random() * 2000).toLocaleString()}`,
        keycode:
          Math.random() > 0.3
            ? `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`
            : "N/A",
        status: Math.random() > 0.3 ? "Successful" : "Failed",
        type: Math.random() > 0.7 ? "Top-up" : "Debit",
      }

      setRecentTransactions((prev) => [newTransaction, ...prev.slice(0, 3)])
      setRefreshing(false)
    }, 1500)
  }, [])

  const handleRefreshPress = () => {
    onRefresh()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      >
        <Header
          onNotificationPress={handleNotificationPress}
          onRefreshPress={handleRefreshPress}
          refreshing={refreshing}
        />
        <WalletBalance user={user} />
        <PaymentForm onScheduleSuccess={handleScheduleSuccess} />
        <RecentTransactions transactions={recentTransactions} />

        {refreshing && (
          <View style={styles.refreshIndicator}>
            <Text style={styles.refreshText}>Refreshing...</Text>
          </View>
        )}
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
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
    paddingBottom: 80,
  },
  refreshIndicator: {
    padding: 16,
    alignItems: "center",
  },
  refreshText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  bottomSpacer: {
    height: 20,
  },
})