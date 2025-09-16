"use client"

import { useState } from "react"
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../state/store"
import { setSearchQuery, setSelectedTags } from "../slices/coachesSlice"
import { SearchController } from "../controllers/searchController"
import { Validator } from "../utils/validator"
import { Logger } from "../utils/logger"
import Button from "../components/common/Button"
import NavigationBar from "../components/common/NavigationBar"
import TagSelector from "../components/common/TagSelector"

interface SearchScreenProps {
  navigation: any
}

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [problemDescription, setProblemDescription] = useState("")
  const [selectedTags, setSelectedTagsLocal] = useState<string[]>([])
  const [descriptionError, setDescriptionError] = useState("")
  const [wordCount, setWordCount] = useState(0)

  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  const availableTags = SearchController.getAvailableTags()

  const handleDescriptionChange = (text: string) => {
    setProblemDescription(text)
    const validation = Validator.validateProblemDescription(text)
    setWordCount(validation.wordCount)

    if (descriptionError && validation.isValid) {
      setDescriptionError("")
    }
  }

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]

    setSelectedTagsLocal(updatedTags)
  }

  const handleSearchForCoach = () => {
    const validation = Validator.validateProblemDescription(problemDescription)

    if (!validation.isValid) {
      setDescriptionError(validation.message || "Please provide a detailed description")
      return
    }

    if (selectedTags.length === 0) {
      Alert.alert("Select Tags", "Please select at least one tag to help us find the right coach for you.")
      return
    }

    Logger.log("Searching for coaches", {
      problemDescription: problemDescription.substring(0, 100) + "...",
      selectedTags,
      wordCount: validation.wordCount,
    })

    // Update Redux state
    dispatch(setSearchQuery(problemDescription))
    dispatch(setSelectedTags(selectedTags))

    // Navigate to results
    navigation.navigate("Results", {
      problemDescription,
      selectedTags,
    })
  }

  const navigateToScreen = (screenName: string) => {
    switch (screenName) {
      case "Session History":
        navigation.navigate("SessionHistory")
        break
      case "Favorites":
        navigation.navigate("Favorites")
        break
      case "User Profile":
        navigation.navigate("UserProfile")
        break
      case "Settings":
        navigation.navigate("Settings")
        break
      default:
        Alert.alert("Coming Soon", `${screenName} feature will be available in the full version.`)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user?.name || "there"}!</Text>
          <Text style={styles.subtitle}>What would you like help with today?</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Describe Your Problem</Text>
          <Text style={styles.sectionSubtitle}>
            Please provide at least 40 words to help us find the perfect coach for you.
          </Text>

          <TextInput
            style={[styles.textArea, descriptionError ? styles.inputError : null]}
            value={problemDescription}
            onChangeText={handleDescriptionChange}
            placeholder="Describe what you need help with in detail. The more specific you are, the better we can match you with the right expert..."
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <View style={styles.wordCountContainer}>
            <Text style={[styles.wordCount, wordCount >= 40 ? styles.wordCountValid : styles.wordCountInvalid]}>
              {wordCount}/40 words minimum
            </Text>
          </View>

          {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Categories</Text>
          <Text style={styles.sectionSubtitle}>Choose tags that best describe your needs</Text>

          <TagSelector
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTagsLocal}
            placeholder="Select categories..."
          />
        </View>

        <View style={styles.section}>
          <Button
            title="Search for a Coach"
            onPress={handleSearchForCoach}
            style={styles.searchButton}
            disabled={wordCount < 40 || selectedTags.length === 0}
          />
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionButtons}>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => navigateToScreen("Session History")}>
              <Text style={styles.quickActionIcon}>📚</Text>
              <Text style={styles.quickActionText}>Session History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => navigateToScreen("Favorites")}>
              <Text style={styles.quickActionIcon}>⭐</Text>
              <Text style={styles.quickActionText}>Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => navigateToScreen("User Profile")}>
              <Text style={styles.quickActionIcon}>👤</Text>
              <Text style={styles.quickActionText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => navigateToScreen("Settings")}>
              <Text style={styles.quickActionIcon}>⚙️</Text>
              <Text style={styles.quickActionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <NavigationBar navigation={navigation} activeScreen="Search" />
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
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
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
  textArea: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
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
  wordCountContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  wordCount: {
    fontSize: 12,
    fontWeight: "500",
  },
  wordCountValid: {
    color: "#10b981",
  },
  wordCountInvalid: {
    color: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 8,
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
  searchButton: {
    marginTop: 8,
  },
  quickActions: {
    paddingHorizontal: 24,
    marginBottom: 100, // Space for navigation bar
  },
  quickActionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  quickActionButton: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    textAlign: "center",
  },
})
