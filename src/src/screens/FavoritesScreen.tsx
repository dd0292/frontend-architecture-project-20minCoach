"use client"

import type React from "react"
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import type { RootState } from "../state/store"
import { toggleFavorite } from "../slices/coachesSlice"
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../models/Navigation';
import { useTheme } from "../components/contexts/ThemeContext"

const FavoritesScreen: React.FC = () => {
  const { coaches, favorites } = useSelector((state: RootState) => state.coaches)
  const dispatch = useDispatch()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { colors } = useTheme()

  const favoriteCoaches = coaches.filter((coach) => favorites.includes(coach.id))

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Ionicons key={i} name={i <= rating ? "star" : "star-outline"} size={16} color="#FFB800" />)
    }
    return stars
  }

  const handleRemoveFavorite = (coachId: string) => {
    dispatch(toggleFavorite(coachId))
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
      color: colors.text,
      fontFamily: "Inter-SemiBold",
    },
    placeholder: {
      width: 40,
    },
    listContainer: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    coachCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardContent: {
      flexDirection: "row",
      marginBottom: 12,
    },
    profilePicture: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 12,
    },
    coachInfo: {
      flex: 1,
    },
    coachName: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 2,
      fontFamily: "Inter-Bold",
    },
    coachTitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 6,
      fontFamily: "Inter-Regular",
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    stars: {
      flexDirection: "row",
      marginRight: 6,
    },
    ratingText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginRight: 4,
      fontFamily: "Inter-SemiBold",
    },
    reviewCount: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: "Inter-Regular",
    },
    availabilityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 6,
    },
    statusText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: "Inter-Medium",
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    tag: {
      backgroundColor: colors.border,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 6,
      marginBottom: 4,
    },
    tagText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: "Inter-Medium",
    },
    cardActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
    },
    favoriteButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#FEF2F2",
      alignItems: "center",
      justifyContent: "center",
    },
    connectButton: {
      backgroundColor: "#4361EE",
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: 20,
    },
    connectButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "600",
      fontFamily: "Inter-SemiBold",
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: 64,
    },
    emptyStateTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
      fontFamily: "Inter-Bold",
    },
    emptyStateText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 24,
      paddingHorizontal: 32,
      marginBottom: 24,
      fontFamily: "Inter-Regular",
    },
    browseButton: {
      backgroundColor: "#4361EE",
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 24,
    },
    browseButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "Inter-SemiBold",
    },
  })

  const renderCoachCard = ({ item }: { item: any }) => (
    <View style={styles.coachCard}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate("CoachDetail", { coach: item })}
      >
        <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />

        <View style={styles.coachInfo}>
          <Text style={styles.coachName}>{item.name}</Text>
          <Text style={styles.coachTitle}>{item.title}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>{renderStars(Math.floor(item.rating))}</View>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>

          <View style={styles.availabilityContainer}>
            <View style={[styles.statusDot, { backgroundColor: item.isAvailable ? "#10B981" : "#6B7280" }]} />
            <Text style={styles.statusText}>{item.isAvailable ? "Available Now" : "Available Soon"}</Text>
          </View>

          <View style={styles.tagsContainer}>
            {item.tags.slice(0, 2).map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.favoriteButton} onPress={() => handleRemoveFavorite(item.id)}>
          <Ionicons name="heart" size={20} color="#F72585" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => navigation.navigate("CoachDetail", { coach: item })}
        >
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorite Coaches</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={favoriteCoaches}
        renderItem={renderCoachCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyStateText}>
              Add coaches to your favorites by tapping the heart icon on their profile.
            </Text>
            <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate("UserHome" as never)}>
              <Text style={styles.browseButtonText}>Browse Coaches</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default FavoritesScreen
