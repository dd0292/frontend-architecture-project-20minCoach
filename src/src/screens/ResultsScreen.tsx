"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Alert,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../state/store"
import { setSearchQuery, setSelectedTags } from "../slices/coachesSlice"
import { SearchController } from "../controllers/searchController"
import { Validator } from "../utils/validator"
import { Logger } from "../utils/logger"
import type { Coach } from "../models/Coach"
import Button from "../components/common/Button"
import NavigationBar from "../components/common/NavigationBar"

interface ResultsScreenProps {
  navigation: any
  route: any
}

export default function ResultsScreen({ navigation, route }: ResultsScreenProps) {
  const [isEditingQuery, setIsEditingQuery] = useState(false)
  const [editedDescription, setEditedDescription] = useState("")
  const [editedTags, setEditedTags] = useState<string[]>([])
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)
  const [showCoachModal, setShowCoachModal] = useState(false)

  const dispatch = useDispatch()
  const { filteredCoaches, searchQuery, selectedTags } = useSelector((state: RootState) => state.coaches)

  const availableTags = SearchController.getAvailableTags()

  useEffect(() => {
    // Initialize with current search parameters
    setEditedDescription(searchQuery)
    setEditedTags(selectedTags)
  }, [searchQuery, selectedTags])

  const handleUpdateSearch = () => {
    const validation = Validator.validateProblemDescription(editedDescription)

    if (!validation.isValid) {
      Alert.alert("Invalid Description", validation.message || "Please provide a detailed description")
      return
    }

    if (editedTags.length === 0) {
      Alert.alert("Select Tags", "Please select at least one tag to help us find the right coach for you.")
      return
    }

    Logger.log("Updating search", {
      newDescription: editedDescription.substring(0, 100) + "...",
      newTags: editedTags,
    })

    dispatch(setSearchQuery(editedDescription))
    dispatch(setSelectedTags(editedTags))
    setIsEditingQuery(false)
  }

  const toggleEditTag = (tag: string) => {
    const updatedTags = editedTags.includes(tag) ? editedTags.filter((t) => t !== tag) : [...editedTags, tag]
    setEditedTags(updatedTags)
  }

  const openCoachModal = (coach: Coach) => {
    setSelectedCoach(coach)
    setShowCoachModal(true)
  }

  const closeCoachModal = () => {
    setSelectedCoach(null)
    setShowCoachModal(false)
  }

  const handleRequestHelp = () => {
    if (!selectedCoach) return

    Logger.log("Requesting help from coach", { coachId: selectedCoach.id, coachName: selectedCoach.name })

    Alert.alert(
      "Request Sent!",
      `Your request has been sent to ${selectedCoach.name}. They will respond within 5 minutes if available.`,
      [
        {
          text: "OK",
          onPress: () => {
            closeCoachModal()
            navigation.navigate("Search")
          },
        },
      ],
    )
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push("⭐")
    }
    if (hasHalfStar) {
      stars.push("⭐")
    }

    return stars.join("")
  }

  const renderCoachCard = (coach: Coach) => (
    <TouchableOpacity key={coach.id} style={styles.coachCard} onPress={() => openCoachModal(coach)}>
      <View style={styles.coachHeader}>
        <Image source={{ uri: coach.profilePicture }} style={styles.coachAvatar} />
        <View style={styles.coachInfo}>
          <Text style={styles.coachName}>{coach.name}</Text>
          <Text style={styles.coachLocation}>{coach.location}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{renderStars(coach.rating)}</Text>
            <Text style={styles.ratingText}>{coach.rating.toFixed(1)}</Text>
          </View>
        </View>
        <View style={[styles.availabilityBadge, coach.isAvailable ? styles.available : styles.unavailable]}>
          <Text style={styles.availabilityText}>{coach.isAvailable ? "Available" : "Busy"}</Text>
        </View>
      </View>

      <Text style={styles.coachBio} numberOfLines={2}>
        {coach.bio}
      </Text>

      <View style={styles.tagsContainer}>
        {coach.tags.slice(0, 3).map((tag) => (
          <View key={tag} style={styles.coachTag}>
            <Text style={styles.coachTagText}>#{tag}</Text>
          </View>
        ))}
        {coach.tags.length > 3 && (
          <View style={styles.coachTag}>
            <Text style={styles.coachTagText}>+{coach.tags.length - 3}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Query Section */}
        <View style={styles.querySection}>
          <View style={styles.querySectionHeader}>
            <Text style={styles.querySectionTitle}>Your Request</Text>
            <TouchableOpacity onPress={() => setIsEditingQuery(!isEditingQuery)}>
              <Text style={styles.editButton}>{isEditingQuery ? "Cancel" : "Edit"}</Text>
            </TouchableOpacity>
          </View>

          {isEditingQuery ? (
            <View>
              <TextInput
                style={styles.editTextArea}
                value={editedDescription}
                onChangeText={setEditedDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <View style={styles.editTagsContainer}>
                {availableTags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.editTag, editedTags.includes(tag) ? styles.editTagSelected : null]}
                    onPress={() => toggleEditTag(tag)}
                  >
                    <Text style={[styles.editTagText, editedTags.includes(tag) ? styles.editTagTextSelected : null]}>
                      #{tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Button title="Update Search" onPress={handleUpdateSearch} style={styles.updateButton} />
            </View>
          ) : (
            <View>
              <Text style={styles.queryText} numberOfLines={3}>
                {searchQuery}
              </Text>
              <View style={styles.selectedTagsContainer}>
                {selectedTags.map((tag) => (
                  <View key={tag} style={styles.selectedTag}>
                    <Text style={styles.selectedTagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Results Section */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsSectionTitle}>
            {filteredCoaches.length} Coach{filteredCoaches.length !== 1 ? "es" : ""} Available
          </Text>

          {filteredCoaches.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsIcon}>🔍</Text>
              <Text style={styles.noResultsTitle}>No coaches found</Text>
              <Text style={styles.noResultsText}>
                Try adjusting your search terms or tags to find coaches that match your needs.
              </Text>
            </View>
          ) : (
            <View style={styles.coachesContainer}>{filteredCoaches.map(renderCoachCard)}</View>
          )}
        </View>
      </ScrollView>

      {/* Coach Detail Modal */}
      <Modal visible={showCoachModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeCoachModal}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Coach Profile</Text>
            <View style={styles.modalHeaderSpacer} />
          </View>

          {selectedCoach && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.modalCoachHeader}>
                <Image source={{ uri: selectedCoach.profilePicture }} style={styles.modalCoachAvatar} />
                <Text style={styles.modalCoachName}>{selectedCoach.name}</Text>
                <Text style={styles.modalCoachLocation}>{selectedCoach.location}</Text>
                <View style={styles.modalRatingContainer}>
                  <Text style={styles.modalRating}>{renderStars(selectedCoach.rating)}</Text>
                  <Text style={styles.modalRatingText}>{selectedCoach.rating.toFixed(1)} out of 5</Text>
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>About</Text>
                <Text style={styles.modalCoachBio}>{selectedCoach.bio}</Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Experience</Text>
                <Text style={styles.modalCoachExperience}>{selectedCoach.experience}</Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Specializations</Text>
                <View style={styles.modalSpecializations}>
                  {selectedCoach.specialization.map((spec) => (
                    <View key={spec} style={styles.modalSpecialization}>
                      <Text style={styles.modalSpecializationText}>{spec}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Tags</Text>
                <View style={styles.modalTagsContainer}>
                  {selectedCoach.tags.map((tag) => (
                    <View key={tag} style={styles.modalTag}>
                      <Text style={styles.modalTagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}

          <View style={styles.modalActions}>
            <Button title="Cancel" onPress={closeCoachModal} variant="outline" style={styles.modalCancelButton} />
            <Button
              title="Request Help"
              onPress={handleRequestHelp}
              variant="secondary"
              style={styles.modalRequestButton}
              disabled={!selectedCoach?.isAvailable}
            />
          </View>
        </SafeAreaView>
      </Modal>

      <NavigationBar navigation={navigation} activeScreen="" />
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
  querySection: {
    padding: 24,
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  querySectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  querySectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  editButton: {
    fontSize: 16,
    fontWeight: "500",
    color: "#8b5cf6",
  },
  queryText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectedTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
  },
  selectedTagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
  },
  editTextArea: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: "#ffffff",
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  editTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  editTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  editTagSelected: {
    borderColor: "#8b5cf6",
    backgroundColor: "#8b5cf6",
  },
  editTagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  editTagTextSelected: {
    color: "#ffffff",
  },
  updateButton: {
    marginTop: 8,
  },
  resultsSection: {
    padding: 24,
    paddingBottom: 100, // Space for navigation bar
  },
  resultsSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  noResultsContainer: {
    alignItems: "center",
    paddingVertical: 48,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  coachesContainer: {
    gap: 16,
  },
  coachCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  coachHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  coachAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  coachLocation: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  available: {
    backgroundColor: "#dcfce7",
  },
  unavailable: {
    backgroundColor: "#fef2f2",
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: "500",
  },
  coachBio: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  coachTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  coachTagText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#6b7280",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalCloseButton: {
    fontSize: 24,
    color: "#6b7280",
    width: 32,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  modalHeaderSpacer: {
    width: 32,
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  modalCoachHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  modalCoachAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  modalCoachName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  modalCoachLocation: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  modalRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalRating: {
    fontSize: 16,
    marginRight: 8,
  },
  modalRatingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  modalCoachBio: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 22,
  },
  modalCoachExperience: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 22,
  },
  modalSpecializations: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  modalSpecialization: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
  },
  modalSpecializationText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1f2937",
  },
  modalTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  modalTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
  },
  modalTagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
  },
  modalActions: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
  },
  modalRequestButton: {
    flex: 1,
  },
})
