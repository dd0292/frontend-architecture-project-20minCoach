"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { logout } from "../slices/authSlice"
import { useTheme } from "../components/styles/ThemeContext"

const UserSettingsScreen: React.FC = () => {
  const { themeMode, colors, setThemeMode } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const dispatch = useDispatch()
  const navigation = useNavigation()

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

  const SettingsItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightElement,
  }: {
    icon: string
    title: string
    subtitle?: string
    onPress?: () => void
    rightElement?: React.ReactNode
  }) => (
    <TouchableOpacity
      style={[styles.settingsItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
      onPress={onPress}
    >
      <View style={styles.settingsItemLeft}>
        <Ionicons name={icon as any} size={20} color={colors.textSecondary} />
        <View style={styles.settingsItemText}>
          <Text style={[styles.settingsItemTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.settingsItemSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement || <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />}
    </TouchableOpacity>
  )

  const ThemeSelector = () => (
    <View style={styles.themeSelector}>
      <TouchableOpacity
        style={[
          styles.themeButton,
          { borderColor: colors.border },
          themeMode === "light" && { backgroundColor: colors.primary, borderColor: colors.primary },
        ]}
        onPress={() => setThemeMode("light")}
      >
        <Ionicons name="sunny" size={16} color={themeMode === "light" ? "#FFFFFF" : colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.themeButton,
          { borderColor: colors.border },
          themeMode === "dark" && { backgroundColor: colors.primary, borderColor: colors.primary },
        ]}
        onPress={() => setThemeMode("dark")}
      >
        <Ionicons name="moon" size={16} color={themeMode === "dark" ? "#FFFFFF" : colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.themeButton,
          { borderColor: colors.border },
          themeMode === "system" && { backgroundColor: colors.primary, borderColor: colors.primary },
        ]}
        onPress={() => setThemeMode("system")}
      >
        <Ionicons name="phone-portrait" size={16} color={themeMode === "system" ? "#FFFFFF" : colors.textSecondary} />
      </TouchableOpacity>
    </View>
  )

  const getThemeSubtitle = () => {
    switch (themeMode) {
      case "light":
        return "Light Mode"
      case "dark":
        return "Dark Mode"
      case "system":
        return "System Default"
      default:
        return "System Default"
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>ACCOUNT</Text>
          <SettingsItem
            icon="person-outline"
            title="Personal Information"
            subtitle="Name, Email, Phone"
            onPress={() => navigation.navigate("Profile" as never)}
          />
          <SettingsItem icon="card-outline" title="Payment Methods" onPress={() => {}} />
          <SettingsItem icon="receipt-outline" title="Purchase History" onPress={() => {}} />
          <SettingsItem
            icon="notifications-outline"
            title="Notifications"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>PREFERENCES</Text>
          <SettingsItem
            icon="color-palette-outline"
            title="App Theme"
            subtitle={getThemeSubtitle()}
            rightElement={<ThemeSelector />}
          />
          <SettingsItem icon="language-outline" title="Language" subtitle="English" onPress={() => {}} />
          <SettingsItem icon="wifi-outline" title="Connection Preferences" subtitle="Wi-Fi only" onPress={() => {}} />
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>SUPPORT</Text>
          <SettingsItem icon="help-circle-outline" title="Help Center" onPress={() => {}} />
          <SettingsItem icon="chatbubble-outline" title="Contact Support" onPress={() => {}} />
          <SettingsItem icon="shield-checkmark-outline" title="Safety Guidelines" onPress={() => {}} />
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>LEGAL</Text>
          <SettingsItem icon="document-text-outline" title="Terms of Service" onPress={() => {}} />
          <SettingsItem icon="lock-closed-outline" title="Privacy Policy" onPress={() => {}} />
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.surface }]} onPress={handleLogout}>
          <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingVertical: 8,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    fontFamily: "Inter-Bold",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingsItemText: {
    marginLeft: 16,
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  settingsItemSubtitle: {
    fontSize: 14,
    marginTop: 2,
    fontFamily: "Inter-Regular",
  },
  themeSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  themeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  logoutButton: {
    marginTop: 32,
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  bottomPadding: {
    height: 32,
  },
})

export default UserSettingsScreen
