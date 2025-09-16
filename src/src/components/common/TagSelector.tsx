"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert } from "react-native"

interface TagSelectorProps {
  availableTags: string[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
}

export default function TagSelector({
  availableTags,
  selectedTags,
  onTagsChange,
  placeholder = "Search tags...",
}: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [customTag, setCustomTag] = useState("")

  const filteredTags = availableTags.filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]
    onTagsChange(updatedTags)
  }

  const addCustomTag = () => {
    if (!customTag.trim()) return

    const normalizedTag = customTag.toLowerCase().trim()
    if (selectedTags.includes(normalizedTag) || availableTags.includes(normalizedTag)) {
      Alert.alert("Tag exists", "This tag is already selected or available in the list.")
      return
    }

    onTagsChange([...selectedTags, normalizedTag])
    setCustomTag("")
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selector} onPress={() => setIsOpen(true)}>
        <Text style={styles.selectorText}>
          {selectedTags.length > 0 ? `${selectedTags.length} tags selected` : placeholder}
        </Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      {selectedTags.length > 0 && (
        <View style={styles.selectedTagsContainer}>
          {selectedTags.map((tag) => (
            <View key={tag} style={styles.selectedTag}>
              <Text style={styles.selectedTagText}>#{tag}</Text>
              <TouchableOpacity onPress={() => toggleTag(tag)}>
                <Text style={styles.removeTagButton}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <Modal visible={isOpen} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Tags</Text>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Text style={styles.modalDoneButton}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search existing tags..."
            />
          </View>

          <ScrollView style={styles.tagsScrollView}>
            <View style={styles.tagsGrid}>
              {filteredTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[styles.tag, selectedTags.includes(tag) ? styles.tagSelected : null]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text style={[styles.tagText, selectedTags.includes(tag) ? styles.tagTextSelected : null]}>
                    #{tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.customTagContainer}>
            <Text style={styles.customTagTitle}>Add Custom Tag</Text>
            <View style={styles.customTagInput}>
              <TextInput
                style={styles.customTagTextInput}
                value={customTag}
                onChangeText={setCustomTag}
                placeholder="Enter custom tag..."
              />
              <TouchableOpacity style={styles.addTagButton} onPress={addCustomTag}>
                <Text style={styles.addTagButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f9fafb",
  },
  selectorText: {
    fontSize: 16,
    color: "#6b7280",
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#6b7280",
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  selectedTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#8b5cf6",
    borderRadius: 16,
  },
  selectedTagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
    marginRight: 6,
  },
  removeTagButton: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalCloseButton: {
    fontSize: 18,
    color: "#6b7280",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  modalDoneButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8b5cf6",
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  tagsScrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tagsGrid: {
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
  customTagContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  customTagTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  customTagInput: {
    flexDirection: "row",
    gap: 12,
  },
  customTagTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  addTagButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#8b5cf6",
    borderRadius: 8,
    justifyContent: "center",
  },
  addTagButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
})
