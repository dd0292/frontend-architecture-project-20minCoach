"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { logout } from "../slices/authSlice"
import { useTheme } from "../components/styles/ThemeContext"

const CoachDashboardScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { colors } = useTheme()

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(logout())
          navigation.navigate("Login" as never)
        },
      },
    ])
  }

  const todaySessions = [
    {
      id: "1",
      clientName: "Alejandro",
      problem: "Car Noise",
      time: "10:00 AM",
      status: "upcoming",
    },
    {
      id: "2",
      clientName: "Carla",
      problem: "Watercolor Tips",
      time: "2:30 PM",
      status: "upcoming",
    },
    {
      id: "3",
      clientName: "Roberto",
      problem: "Engine Diagnostics",
      time: "4:00 PM",
      status: "completed",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Coach Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#F72585" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statusSection}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>{isOnline ? "You're Online" : "Go Online"}</Text>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: "#D1D5DB", true: "#10B981" }}
              thumbColor={isOnline ? "#FFFFFF" : "#FFFFFF"}
            />
          </View>
          <Text style={styles.statusSubtitle}>
            {isOnline ? "Available to receive new session requests" : "Not accepting new sessions"}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="cash" size={24} color="#10B981" />
            <Text style={styles.statValue}>$1,240</Text>
            <Text style={styles.statLabel}>Earnings This Week</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#4361EE" />
            <Text style={styles.statValue}>15min</Text>
            <Text style={styles.statLabel}>Next Session</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="star" size={24} color="#FFB800" />
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Average Rating</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Profile Completion</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "85%" }]} />
          </View>
          <Text style={styles.progressText}>85% Complete</Text>
          <Text style={styles.progressSubtext}>Complete your profile to attract more clients</Text>
        </View>

        <View style={styles.sessionsSection}>
          <Text style={styles.sectionTitle}>Today's Sessions</Text>
          {todaySessions.map((session) => (
            <View key={session.id} style={styles.sessionCard}>
              <View style={styles.sessionInfo}>
                <Text style={styles.clientName}>{session.clientName}</Text>
                <Text style={styles.sessionProblem}>{session.problem}</Text>
                <Text style={styles.sessionTime}>{session.time}</Text>
              </View>

              {session.status === "upcoming" && (
                <TouchableOpacity style={styles.startCallButton}>
                  <Text style={styles.startCallText}>Start Call</Text>
                </TouchableOpacity>
              )}

              {session.status === "completed" && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="calendar" size={32} color="#4361EE" />
            <Text style={styles.actionTitle}>Calendar</Text>
            <Text style={styles.actionSubtitle}>Manage your schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="wallet" size={32} color="#10B981" />
            <Text style={styles.actionTitle}>Wallet</Text>
            <Text style={styles.actionSubtitle}>View earnings & payouts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="person" size={32} color="#F72585" />
            <Text style={styles.actionTitle}>Profile</Text>
            <Text style={styles.actionSubtitle}>Edit your information</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="chatbubbles" size={32} color="#FF9E00" />
            <Text style={styles.actionTitle}>Messages</Text>
            <Text style={styles.actionSubtitle}>Client communications</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    fontFamily: "Inter-Bold",
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  statusSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    fontFamily: "Inter-Bold",
  },
  statusSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "Inter-Regular",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8,
    marginBottom: 4,
    fontFamily: "Inter-Bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  progressSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
    fontFamily: "Inter-SemiBold",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4361EE",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
    fontFamily: "Inter-SemiBold",
  },
  progressSubtext: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: "Inter-Regular",
  },
  sessionsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  sessionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  sessionInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
    fontFamily: "Inter-SemiBold",
  },
  sessionProblem: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
    fontFamily: "Inter-Regular",
  },
  sessionTime: {
    fontSize: 12,
    color: "#4361EE",
    fontFamily: "Inter-Medium",
  },
  startCallButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  startCallText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  completedBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 12,
    marginBottom: 4,
    fontFamily: "Inter-SemiBold",
  },
  actionSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
})

export default CoachDashboardScreen
