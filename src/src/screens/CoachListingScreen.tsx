"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput } from "react-native"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import type { RootState } from "../state/store"
import type { Coach } from "../models/Coach"
import { useTheme } from "../components/contexts/ThemeContext"
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../models/Navigation';

const CoachListingScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { colors } = useTheme()
  const { searchResults } = useSelector((state: RootState) => state.coaches)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Ionicons key={i} name={i <= rating ? "star" : "star-outline"} size={16} color="#FFB800" />)
    }
    return stars
  }

  const renderCoachCard = ({ item }: { item: Coach }) => (
    <TouchableOpacity
      style={[styles.coachCard, { backgroundColor: colors.surface }]}
      onPress={() => navigation.navigate("CoachDetail", { coach: item })}
    >
      <View style={styles.cardHeader}>
        <Image source={item.profilePicture} style={styles.profilePicture} />
        <View style={styles.availabilityIndicator}>
          <View
            style={[styles.statusDot, { backgroundColor: item.isAvailable ? colors.success : colors.textSecondary }]}
          />
          <Text style={[styles.statusText, { color: colors.textSecondary }]}>
            {item.isAvailable ? "Available Now" : "Available Soon"}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={[styles.coachName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.coachTitle, { color: colors.textSecondary }]}>{item.title}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.stars}>{renderStars(Math.floor(item.rating))}</View>
          <Text style={[styles.ratingText, { color: colors.text }]}>{item.rating}</Text>
          <Text style={[styles.reviewCount, { color: colors.textSecondary }]}>({item.reviewCount} reviews)</Text>
        </View>

        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: colors.border }]}>
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.connectButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate("CoachDetail", { coach: item })}
        >
          <Text style={styles.connectButtonText}>See Coach</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text> </Text>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Available Coaches</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            We found {searchResults.length} coaches matching your search
          </Text>
        </View>
      </View>

      <View style={[styles.searchSection, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.background }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Update your search..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.primary + "20" }]}>
            <Ionicons name="funnel" size={16} color={colors.primary} />
            <Text style={[styles.filterText, { color: colors.primary }]}>Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sortButton}>
            <Text style={[styles.sortText, { color: colors.textSecondary }]}>Sort: Rating</Text>
            <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={searchResults}
        renderItem={renderCoachCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: "Inter-Regular",
  },
  searchSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "Inter-Regular",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterText: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: "Inter-Medium",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: 14,
    marginRight: 4,
    fontFamily: "Inter-Medium",
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  coachCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  availabilityIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  cardContent: {
    flex: 1,
  },
  coachName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "Inter-Bold",
  },
  coachTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Inter-Regular",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
    fontFamily: "Inter-SemiBold",
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  connectButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
})

export default CoachListingScreen
