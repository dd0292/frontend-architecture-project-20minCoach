"use client";

import type React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { RootState } from "../state/store";
import { setSearchResults } from "../slices/coachesSlice";
import { searchCoaches } from "../controllers/searchController";
import Button from "../components/common/atoms/Button";
import { Typography } from "../components/common/atoms/Typography";
import { SearchBar } from "../components/common/molecules/SearchBar";
import { TagChip } from "../components/common/molecules/TagChip";
import { ProfileHeader } from "../components/common/molecules/ProfileHeader";
import { useTheme } from "../components/styles/ThemeContext";
import { createGlobalStyles } from "../components/styles/GlobalStyles";

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
];

const UserHomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [customTag, setCustomTag] = useState("");

  const theme = useTheme();
  const styles = createGlobalStyles(theme);

  const { user } = useSelector((state: RootState) => state.auth);
  const { coaches } = useSelector((state: RootState) => state.coaches);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSearch = () => {
    const results = searchCoaches(coaches, searchQuery, selectedTags);
    dispatch(setSearchResults(results));
    navigation.navigate("CoachListing" as never);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags((prev) => [...prev, customTag.trim()]);
      setCustomTag("");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ marginTop: 40, marginHorizontal: 20 }}>
        <ProfileHeader
          name={user?.name || ""}
          subtitle={`${user?.packageType || ""} • ${user?.sessionsRemaining || ""} sessions remaining`}
        />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Describe your problem or need... (text or voice)"
            showMicButton
            style={styles.searchBar}
          />

          <View style={styles.tagsSection}>
            <View style={styles.tagsSectionHeader}>
              <Typography variant="h3" color={theme.colors.text}>
                Select Categories
              </Typography>
              <TouchableOpacity
                style={[
                  styles.addTagButton,
                  { backgroundColor: theme.colors.primary + "20" },
                ]}
                onPress={() => setShowTagModal(true)}
              >
                <Ionicons name="add" size={16} color={theme.colors.primary} />
                <Typography
                  variant="caption"
                  color={theme.colors.primary}
                  style={styles.addTagText}
                >
                  Add Tag
                </Typography>
              </TouchableOpacity>
            </View>

            <View style={styles.selectedTags}>
              {selectedTags.map((tag, index) => (
                <TagChip
                  key={index}
                  label={tag}
                  variant="removable"
                  onPress={() => removeTag(tag)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.categoryDropdown,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setShowTagModal(true)}
            >
              <Typography variant="body" color={theme.colors.textSecondary}>
                Browse Categories
              </Typography>
              <Ionicons
                name="chevron-down"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <Button
            title="Search for Coaches"
            onPress={handleSearch}
            variant="primary"
            size="large"
            style={styles.searchButton}
          />
        </View>

        <View style={styles.emptyState}>
          {/* <Image
            source={{ uri: "/person-thinking-with-question-marks-illustration.jpg" }}
            style={styles.emptyStateImage}
          /> */}
          <Typography
            variant="body"
            color={theme.colors.textSecondary}
            style={styles.emptyStateText}
          >
            Hi, what can we help you with today?
          </Typography>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.surface },
            ]}
            onPress={() => navigation.navigate("Favorites" as never)}
          >
            <Ionicons name="heart" size={35} color={theme.colors.accent} />
            <Typography
              variant="caption"
              color={theme.colors.text}
              style={styles.actionButtonText}
            >
              Favorite Coaches
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.surface },
            ]}
            onPress={() => navigation.navigate("SessionHistory" as never)}
          >
            <Ionicons name="time" size={35} color={theme.colors.primary} />
            <Typography
              variant="caption"
              color={theme.colors.text}
              style={styles.actionButtonText}
            >
              History
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.surface },
            ]}
            onPress={() => navigation.navigate("Profile" as never)}
          >
            <Ionicons name="star" size={35} color={theme.colors.warning} />
            <Typography
              variant="caption"
              color={theme.colors.text}
              style={styles.actionButtonText}
            >
              My Ratings
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.surface },
            ]}
            onPress={() => navigation.navigate("UserSettings" as never)}
          >
            <Ionicons
              name="settings"
              size={35}
              color={theme.colors.textSecondary}
            />
            <Typography
              variant="caption"
              color={theme.colors.text}
              style={styles.actionButtonText}
            >
              Settings
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
      >
        <Ionicons name="videocam" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        visible={showTagModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView
          style={[
            styles.modalContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View
            style={[
              styles.modalHeader,
              {
                backgroundColor: theme.colors.surface,
                borderBottomColor: theme.colors.border,
              },
            ]}
          >
            <Typography variant="h3" color={theme.colors.text}>
              Select Categories
            </Typography>
            <TouchableOpacity onPress={() => setShowTagModal(false)}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.customTagInput,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <TextInput
              style={[
                styles.tagInput,
                { borderColor: theme.colors.border, color: theme.colors.text },
              ]}
              placeholder="Add custom tag..."
              placeholderTextColor={theme.colors.textSecondary}
              value={customTag}
              onChangeText={setCustomTag}
            />
            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={addCustomTag}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={POPULAR_CATEGORIES}
            numColumns={3}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TagChip
                label={item}
                onPress={() => toggleTag(item)}
                fontSize={14}
              />
            )}
            contentContainerStyle={styles.categoriesList}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 11,
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default UserHomeScreen;
