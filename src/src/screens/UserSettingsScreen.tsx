"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { logout } from "../slices/authSlice"
import { useTheme } from "../components/styles/ThemeContext"
import { createGlobalStyles } from "../components/styles/GlobalStyles"
import { supabase } from "../utils/supabase"

const UserSettingsScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createGlobalStyles(theme)
  const [notifications, setNotifications] = useState(true)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await supabase.auth.signOut();
            dispatch(logout());
            navigation.navigate("Login" as never);
          } catch (error) {
            Alert.alert("Error", "Failed to logout. Please try again.");
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

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
      style={[styles.settingsItem, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}
      onPress={onPress}
    >
      <View style={styles.settingsItemLeft}>
        <Ionicons name={icon as any} size={20} color={theme.colors.textSecondary} />
        <View style={styles.settingsItemText}>
          <Text style={[styles.settingsItemTitle, { color: theme.colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.settingsItemSubtitle, { color: theme.colors.textSecondary }]}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement || <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />}
    </TouchableOpacity>
  )

  const ThemeSelector = () => (
    <View style={styles.themeSelector}>
      <TouchableOpacity
        style={[
          styles.themeButton,
          { borderColor: theme.colors.border },
          theme.themeMode === "light" && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
        ]}
        onPress={() => theme.setThemeMode("light")}
      >
        <Ionicons name="sunny" size={16} color={theme.themeMode === "light" ? "#FFFFFF" : theme.colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.themeButton,
          { borderColor: theme.colors.border },
          theme.themeMode === "dark" && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
        ]}
        onPress={() => theme.setThemeMode("dark")}
      >
        <Ionicons name="moon" size={16} color={theme.themeMode === "dark" ? "#FFFFFF" : theme.colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.themeButton,
          { borderColor: theme.colors.border },
          theme.themeMode === "system" && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
        ]}
        onPress={() => theme.setThemeMode("system")}
      >
        <Ionicons name="phone-portrait" size={16} color={theme.themeMode === "system" ? "#FFFFFF" : theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  )

  const getThemeSubtitle = () => {
    switch (theme.themeMode) {
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>ACCOUNT</Text>
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
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>PREFERENCES</Text>
          <SettingsItem
            icon="color-palette-outline"
            title="App Theme"
            subtitle={getThemeSubtitle()}
            rightElement={<ThemeSelector />}
          />
          <SettingsItem icon="language-outline" title="Language" subtitle="English" onPress={() => {}} />
          <SettingsItem icon="wifi-outline" title="Connection Preferences" subtitle="Wi-Fi only" onPress={() => {}} />
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>SUPPORT</Text>
          <SettingsItem icon="help-circle-outline" title="Help Center" onPress={() => {}} />
          <SettingsItem icon="chatbubble-outline" title="Contact Support" onPress={() => {}} />
          <SettingsItem icon="shield-checkmark-outline" title="Safety Guidelines" onPress={() => {}} />
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>LEGAL</Text>
          <SettingsItem icon="document-text-outline" title="Terms of Service" onPress={() => {}} />
          <SettingsItem icon="lock-closed-outline" title="Privacy Policy" onPress={() => {}} />
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.colors.surface }]} onPress={handleLogout}>
          <Text style={[styles.logoutText, { color: theme.colors.error }]}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  )
}
export default UserSettingsScreen
