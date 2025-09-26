"use client"

import type React from "react"
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
  Modal,
  FlatList,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import type { RootState } from "../state/store"
import { setSearchResults } from "../slices/coachesSlice"
import { searchCoaches } from "../controllers/searchController"
import Button from "../components/common/atoms/Button"
import { useTheme } from "../components/styles/ThemeContext"

const POPULAR_CATEGORIES = [
  "Psychology",
  "Law",
  "Mechanics",
  "Programming",
  "Arts",
  "Agriculture",
  "Health",
  "Business",
  "Education",
  "Finance",
  "Marketing",
  "Design",
]

const UserHomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTagModal, setShowTagModal] = useState(false)
  const [customTag, setCustomTag] = useState("")

  const { colors } = useTheme()
  const { user } = useSelector((state: RootState) => state.auth)
  const { coaches } = useSelector((state: RootState) => state.coaches)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleSearch = () => {
    const results = searchCoaches(coaches, searchQuery, selectedTags)
    dispatch(setSearchResults(results))
    navigation.navigate("CoachListing" as never)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags((prev) => [...prev, customTag.trim()])
      setCustomTag("")
      setShowTagModal(false)
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <View>
            <Text> </Text>
            <Text style={[styles.greeting, { color: colors.text }]}>Hi, {user?.name}!</Text>
            <Text style={[styles.packageInfo, { color: colors.textSecondary }]}>
              {user?.packageType} • {user?.sessionsRemaining} sessions remaining
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("UserSettings" as never)}>
            <Image source={{ uri: user?.profilePicture }} style={styles.profilePicture} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Describe your problem or need... (text or voice)"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              multiline
            />
            <TouchableOpacity style={styles.micButton}>
              <Ionicons name="mic" size={28} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsSection}>
            <View style={styles.tagsSectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Categories</Text>
              <TouchableOpacity
                style={[styles.addTagButton, { backgroundColor: colors.primary + "20" }]}
                onPress={() => setShowTagModal(true)}
              >
                <Ionicons name="add" size={16} color={colors.primary} />
                <Text style={[styles.addTagText, { color: colors.primary }]}>Add Tag</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.selectedTags}>
              {selectedTags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.selectedTag, { backgroundColor: colors.primary }]}
                  onPress={() => removeTag(tag)}
                >
                  <Text style={styles.selectedTagText}>{tag}</Text>
                  <Ionicons name="close" size={14} color="#FFFFFF" />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.categoryDropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => setShowTagModal(true)}
            >
              <Text style={[styles.dropdownText, { color: colors.textSecondary }]}>Browse Categories</Text>
              <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Button
            title="Search for Coaches"
            onPress={handleSearch}
            variant="primary"
            size="large"
            style={styles.searchButton}
            textStyle={styles.sectionTitle}
          />
        </View>

        <View style={styles.emptyState}>
          {/* <Image
            source={require("../../assets/public/person-thinking-with-question-marks-illustration.jpg")}
            style={styles.emptyStateImage}
          /> */}
          <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>What can we help you with today?</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate("Favorites" as never)}
          >
            <Ionicons name="heart" size={24} color={colors.accent} />
            <Text style={[styles.actionButtonText, { color: colors.text }]}>Favorite Coaches</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate("SessionHistory" as never)}
          >
            <Ionicons name="time" size={24} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.text }]}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate("Profile" as never)}
          >
            <Ionicons name="star" size={24} color={colors.warning} />
            <Text style={[styles.actionButtonText, { color: colors.text }]}>My Ratings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate("UserSettings" as never)}
          >
            <Ionicons name="settings" size={24} color={colors.textSecondary} />
            <Text style={[styles.actionButtonText, { color: colors.text }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
        <Ionicons name="videocam" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal visible={showTagModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Categories</Text>
            <TouchableOpacity onPress={() => setShowTagModal(false)}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={[styles.customTagInput, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.tagInput, { borderColor: colors.border, color: colors.text }]}
              placeholder="Add custom tag"
              placeholderTextColor={colors.textSecondary}
              value={customTag}
              onChangeText={setCustomTag}
            />
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={addCustomTag}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={POPULAR_CATEGORIES}
            numColumns={2}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryTag,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  selectedTags.includes(item) && { backgroundColor: colors.primary, borderColor: colors.primary },
                ]}
                onPress={() => toggleTag(item)}
              >
                <Text
                  style={[
                    styles.categoryTagText,
                    { color: colors.textSecondary },
                    selectedTags.includes(item) && { color: "#FFFFFF" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </SafeAreaView>
      </Modal>
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
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
  packageInfo: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: "Inter-Regular",
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  searchSection: {
    marginTop: 24,
  },
  searchBar: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    maxHeight: 80,
  },
  micButton: {
    padding: 8,
  },
  tagsSection: {
    marginBottom: 24,
  },
  tagsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  addTagButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addTagText: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: "Inter-Medium",
  },
  selectedTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  selectedTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTagText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginRight: 4,
    fontFamily: "Inter-Medium",
  },
  categoryDropdown: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  searchButton: {
    marginBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    marginBottom: 32,
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Inter-Medium",
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 100,
  },
  actionButton: {
    width: "48%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    fontFamily: "Inter-Medium",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  customTagInput: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 8,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 12,
    fontFamily: "Inter-Regular",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  categoriesList: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  categoryTag: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    margin: 4,
    flex: 1,
    alignItems: "center",
  },
  categoryTagText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
})

export default UserHomeScreen
