"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native"
import { useSelector } from "react-redux"
import type { RootState } from "../state/store"
import Button from "../components/common/Button"
import NavigationBar from "../components/common/NavigationBar"

interface UserProfileScreenProps {
  navigation: any
}

export default function UserProfileScreen({ navigation }: UserProfileScreenProps) {
  const { user } = useSelector((state: RootState) => state.auth)

  const [name, setName] = useState(user?.name || "John Doe")
  const [email, setEmail] = useState(user?.email || "john.doe@example.com")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [location, setLocation] = useState("New York, NY")
  const [bio, setBio] = useState("Looking for expert guidance in various areas of life and work.")

  const handleSaveProfile = () => {
    Alert.alert("Profile Saved", "Your profile has been updated successfully!")
  }

  const handleChangePassword = () => {
    Alert.alert("Coming Soon", "Password change feature will be available in the full version.")
  }

  const handleNotificationSettings = () => {
    Alert.alert("Coming Soon", "Notification settings will be available in the full version.")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: "/placeholder.svg?height=100&width=100&text=User" }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton}>
              <Text style={styles.editImageText}>Edit Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your full name" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="City, State/Country"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.textArea}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us a bit about yourself..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
            <Text style={styles.settingText}>Change Password</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleNotificationSettings}>
            <Text style={styles.settingText}>Notification Settings</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Sessions Completed</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Favorite Coaches</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Avg Rating Given</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Button title="Save Profile" onPress={handleSaveProfile} />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <NavigationBar navigation={navigation} activeScreen="Profile" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  profileImageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  editImageButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#8b5cf6",
    borderRadius: 16,
  },
  editImageText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  textArea: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
    minHeight: 100,
    textAlignVertical: "top",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  settingText: {
    fontSize: 16,
    color: "#1f2937",
  },
  settingArrow: {
    fontSize: 20,
    color: "#6b7280",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8b5cf6",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  bottomSpacer: {
    height: 100,
  },
})
