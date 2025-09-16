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
  Switch,
  Alert,
  Image,
} from "react-native"
import { useSelector } from "react-redux"
import type { RootState } from "../state/store"
import { SearchController } from "../controllers/searchController"
import { Logger } from "../utils/logger"
import Button from "../components/common/Button"
// import NavigationBar from "../components/common/NavigationBar"

interface CoachProfileScreenProps {
  navigation: any
}

export default function CoachProfileScreen({ navigation }: CoachProfileScreenProps) {
  // Coach profile form state
  const [name, setName] = useState("Dr. Sarah Johnson")
  const [location, setLocation] = useState("New York, NY")
  const [bio, setBio] = useState(
    "Licensed psychologist with 10+ years of experience in cognitive behavioral therapy and personal development. I help individuals overcome anxiety, build confidence, and achieve their personal goals through evidence-based techniques.",
  )
  const [experience, setExperience] = useState("10+ years")
  const [specializations, setSpecializations] = useState("Psychology, Life Coaching, CBT")
  const [selectedTags, setSelectedTags] = useState<string[]>(["psychology", "life-coaching", "cbt"])
  const [isAvailable, setIsAvailable] = useState(true)
  const [hourlyRate, setHourlyRate] = useState("$120")

  // Form validation state
  const [nameError, setNameError] = useState("")
  const [locationError, setLocationError] = useState("")
  const [bioError, setBioError] = useState("")

  const { user } = useSelector((state: RootState) => state.auth)
  const availableTags = SearchController.getAvailableTags()

  const validateForm = (): boolean => {
    let isValid = true

    // Reset errors
    setNameError("")
    setLocationError("")
    setBioError("")

    // Validate name
    if (!name.trim()) {
      setNameError("Name is required")
      isValid = false
    }

    // Validate location
    if (!location.trim()) {
      setLocationError("Location is required")
      isValid = false
    }

    // Validate bio
    if (!bio.trim()) {
      setBioError("Bio is required")
      isValid = false
    } else if (bio.trim().length < 50) {
      setBioError("Bio must be at least 50 characters")
      isValid = false
    }

    return isValid
  }

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]
    setSelectedTags(updatedTags)
  }

  const handleSaveProfile = () => {
    if (!validateForm()) {
      return
    }

    if (selectedTags.length === 0) {
      Alert.alert("Select Tags", "Please select at least one tag that describes your expertise.")
      return
    }

    Logger.log("Saving coach profile", {
      name,
      location,
      bioLength: bio.length,
      selectedTags,
      isAvailable,
    })

    Alert.alert("Profile Saved", "Your profile has been updated successfully!", [
      {
        text: "OK",
        onPress: () => {
          // In a real app, this would save to backend
          Logger.log("Profile saved successfully")
        },
      },
    ])
  }

  const handleToggleAvailability = (value: boolean) => {
    setIsAvailable(value)
    Logger.log("Availability toggled", { isAvailable: value })

    const statusMessage = value ? "You are now available for coaching sessions" : "You are now offline"
    Alert.alert("Availability Updated", statusMessage)
  }

  const navigateToEarnings = () => {
    Alert.alert("Coming Soon", "Earnings dashboard will be available in the full version.")
  }

  const navigateToSchedule = () => {
    Alert.alert("Coming Soon", "Schedule management will be available in the full version.")
  }

  const navigateToReviews = () => {
    Alert.alert("Coming Soon", "Reviews management will be available in the full version.")
  }

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // In real app, would dispatch logout action
          navigation.replace("Login")
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>Coach Profile</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: "/placeholder.svg?height=100&width=100&text=Coach" }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton}>
              <Text style={styles.editImageText}>Edit Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityLabel}>Availability Status</Text>
            <View style={styles.availabilityToggle}>
              <Text style={[styles.availabilityText, !isAvailable && styles.unavailableText]}>
                {isAvailable ? "Connected" : "Disconnected"}
              </Text>
              <Switch
                value={isAvailable}
                onValueChange={handleToggleAvailability}
                trackColor={{ false: "#f3f4f6", true: "#dcfce7" }}
                thumbColor={isAvailable ? "#10b981" : "#6b7280"}
              />
            </View>
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, nameError ? styles.inputError : null]}
              value={name}
              onChangeText={(text) => {
                setName(text)
                if (nameError) setNameError("")
              }}
              placeholder="Enter your full name"
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={[styles.input, locationError ? styles.inputError : null]}
              value={location}
              onChangeText={(text) => {
                setLocation(text)
                if (locationError) setLocationError("")
              }}
              placeholder="City, State/Country"
            />
            {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Experience</Text>
            <TextInput
              style={styles.input}
              value={experience}
              onChangeText={setExperience}
              placeholder="e.g., 5+ years, 10+ years"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hourly Rate</Text>
            <TextInput
              style={styles.input}
              value={hourlyRate}
              onChangeText={setHourlyRate}
              placeholder="e.g., $50, $100"
            />
          </View>
        </View>

        {/* Professional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Specializations</Text>
            <TextInput
              style={styles.input}
              value={specializations}
              onChangeText={setSpecializations}
              placeholder="e.g., Psychology, Life Coaching, Business"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bio</Text>
            <Text style={styles.inputSubtext}>Tell potential clients about your background and expertise</Text>
            <TextInput
              style={[styles.textArea, bioError ? styles.inputError : null]}
              value={bio}
              onChangeText={(text) => {
                setBio(text)
                if (bioError) setBioError("")
              }}
              placeholder="Write a detailed bio about your experience, qualifications, and coaching approach..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>{bio.length}/500 characters</Text>
            {bioError ? <Text style={styles.errorText}>{bioError}</Text> : null}
          </View>
        </View>

        {/* Tags Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expertise Tags</Text>
          <Text style={styles.sectionSubtitle}>Select tags that best describe your areas of expertise</Text>

          <View style={styles.tagsContainer}>
            {availableTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[styles.tag, selectedTags.includes(tag) ? styles.tagSelected : null]}
                onPress={() => toggleTag(tag)}
              >
                <Text style={[styles.tagText, selectedTags.includes(tag) ? styles.tagTextSelected : null]}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={navigateToSchedule}>
              <Text style={styles.quickActionIcon}>📅</Text>
              <Text style={styles.quickActionTitle}>Schedule</Text>
              <Text style={styles.quickActionSubtitle}>Manage your availability</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={navigateToEarnings}>
              <Text style={styles.quickActionIcon}>💰</Text>
              <Text style={styles.quickActionTitle}>Earnings</Text>
              <Text style={styles.quickActionSubtitle}>View your income</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={navigateToReviews}>
              <Text style={styles.quickActionIcon}>⭐</Text>
              <Text style={styles.quickActionTitle}>Reviews</Text>
              <Text style={styles.quickActionSubtitle}>Client feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionTitle}>Analytics</Text>
              <Text style={styles.quickActionSubtitle}>Performance metrics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.section}>
          <Button title="Save Profile" onPress={handleSaveProfile} style={styles.saveButton} />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    marginBottom: 24,
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
  availabilityContainer: {
    alignItems: "center",
  },
  availabilityLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 8,
  },
  availabilityToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  availabilityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10b981",
  },
  unavailableText: {
    color: "#ef4444",
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
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  inputSubtext: {
    fontSize: 12,
    color: "#6b7280",
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
    minHeight: 120,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  characterCount: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "right",
    marginTop: 4,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  tagSelected: {
    borderColor: "#8b5cf6",
    backgroundColor: "#8b5cf6",
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  tagTextSelected: {
    color: "#ffffff",
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  quickActionCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  saveButton: {
    marginTop: 8,
  },
  bottomSpacer: {
    height: 100, // Space for navigation bar
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ef4444",
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
})
