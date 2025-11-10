"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native"
import { Colors, type PaymentHistoryItem } from "../types"
import { Ionicons } from "@expo/vector-icons"

const HistoryScreen: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<"week" | "month" | "year">("week")

  const keycodeHistory: PaymentHistoryItem[] = [
    {
      id: "1",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      amount: "₦2,000",
      keycode: "123-456-789-011-012",
      status: "Successful",
      type: "Debit",
    },
    {
      id: "2",
      date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      amount: "₦3,500",
      keycode: "N/A",
      status: "Failed",
      type: "Debit",
    },
    {
      id: "3",
      date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      amount: "₦1,200",
      keycode: "234-567-890-122-233",
      status: "Successful",
      type: "Debit",
    },
    {
      id: "4",
      date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      amount: "₦5,000",
      keycode: "345-678-901-233-344",
      status: "Successful",
      type: "Debit",
    },
    {
      id: "5",
      date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      amount: "₦1,800",
      keycode: "N/A",
      status: "Failed",
      type: "Debit",
    },
    {
      id: "6",
      date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      amount: "₦7,000",
      keycode: "456-789-012-344-455",
      status: "Successful",
      type: "Debit",
    },
    {
      id: "7",
      date: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      amount: "₦2,750",
      keycode: "567-890-123-455-566",
      status: "Successful",
      type: "Debit",
    },
    {
      id: "8",
      date: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      amount: "₦3,100",
      keycode: "N/A",
      status: "Failed",
      type: "Debit",
    },
    {
      id: "9",
      date: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      amount: "₦4,600",
      keycode: "678-901-234-566-677",
      status: "Successful",
      type: "Debit",
    },
    {
      id: "10",
      date: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      amount: "₦2,300",
      keycode: "789-012-345-677-788",
      status: "Successful",
      type: "Debit",
    },
  ]

  const getStatusColor = (status: string) => {
    return status === "Successful" ? Colors.success : Colors.error
  }

  const getStatusBackground = (status: string) => {
    return status === "Successful" ? "#E8F5E8" : "#FFEBEE"
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  const copyToClipboard = (text: string) => {
    Alert.alert("Copied!", `Keycode copied to clipboard: ${text}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getDateRangeText = () => {
    const now = new Date()
    const startDate = new Date()

    switch (selectedRange) {
      case "week":
        startDate.setDate(now.getDate() - 7)
        break
      case "month":
        startDate.setMonth(now.getMonth() - 1)
        break
      case "year":
        startDate.setFullYear(now.getFullYear() - 1)
        break
    }

    return `${startDate.toLocaleDateString("en-NG", { day: "numeric", month: "short" })} - ${now.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}`
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Date Range Selector */}
        <View style={styles.dateRangeContainer}>
          <View style={styles.dateRangeHeader}>
            <Ionicons name="calendar" size={20} color={Colors.text} />
            <Text style={styles.dateRangeTitle}>Date Range</Text>
          </View>

          <View style={styles.dateRangeDisplay}>
            <Text style={styles.dateRangeText}>{getDateRangeText()}</Text>
          </View>

          <View style={styles.rangeSelector}>
            <TouchableOpacity
              style={[styles.rangeButton, selectedRange === "week" && styles.rangeButtonActive]}
              onPress={() => setSelectedRange("week")}
            >
              <Text style={[styles.rangeButtonText, selectedRange === "week" && styles.rangeButtonTextActive]}>
                Week
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.rangeButton, selectedRange === "month" && styles.rangeButtonActive]}
              onPress={() => setSelectedRange("month")}
            >
              <Text style={[styles.rangeButtonText, selectedRange === "month" && styles.rangeButtonTextActive]}>
                Month
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.rangeButton, selectedRange === "year" && styles.rangeButtonActive]}
              onPress={() => setSelectedRange("year")}
            >
              <Text style={[styles.rangeButtonText, selectedRange === "year" && styles.rangeButtonTextActive]}>
                Year
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Keycodes List */}
        <View style={styles.keycodesContainer}>
          {keycodeHistory.map((item) => (
            <View key={item.id} style={styles.keycodeCard}>
              {/* Header with Date and Status */}
              <View style={styles.keycodeHeader}>
                <Text style={styles.keycodeDate}>{formatDate(item.date)}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusBackground(item.status) }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
              </View>

              {/* Amount */}
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Amount Paid:</Text>
                <Text style={styles.amountText}>{item.amount}</Text>
              </View>

              {/* Keycode Section */}
              <View style={styles.keycodeSection}>
                <Text style={styles.keycodeLabel}>Keycode:</Text>
                {item.status === "Successful" ? (
                  <TouchableOpacity style={styles.keycodeContainer} onPress={() => copyToClipboard(item.keycode)}>
                    <Text style={styles.keycodeText}>{item.keycode}</Text>
                    <View style={styles.copyButton}>
                      <Text style={styles.copyButtonText}>Copy</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.naContainer}>
                    <Text style={styles.naText}>N/A</Text>
                    <Text style={styles.naSubtext}>No keycode generated</Text>
                  </View>
                )}
              </View>

              {/* Time */}
              <Text style={styles.timeText}>{getTimeAgo(item.date)}</Text>
            </View>
          ))}
        </View>

        {/* Add bottom spacer to ensure content isn't blocked by nav */}
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
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 80, // Added this to prevent content from being blocked
  },
  dateRangeContainer: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateRangeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateRangeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginLeft: 8,
  },
  dateRangeDisplay: {
    backgroundColor: "#FFFDF6",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 12,
  },
  dateRangeText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
  rangeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  rangeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  rangeButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rangeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  rangeButtonTextActive: {
    color: Colors.text,
    fontWeight: "600",
  },
  keycodesContainer: {
    marginBottom: 24,
  },
  keycodeCard: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  keycodeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  keycodeDate: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  amountLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.naira,
  },
  keycodeSection: {
    marginBottom: 8,
  },
  keycodeLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
    marginBottom: 8,
  },
  keycodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFDF6",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  keycodeText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: "monospace",
    fontWeight: "600",
    flex: 1,
  },
  copyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  copyButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text,
  },
  naContainer: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  naText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "600",
    marginBottom: 4,
  },
  naSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "right",
    fontStyle: "italic",
  },
  bottomSpacer: {
    height: 20,
  },
})

export default HistoryScreen