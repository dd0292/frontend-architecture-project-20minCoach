"use client"

import type React from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { Ionicons } from "@expo/vector-icons"
import type { RootState } from "../state/store"
import { toggleFavorite } from "../slices/coachesSlice"
import Button from "../components/common/Button"
import { useTheme } from "../components/styles/ThemeContext"

const CoachDetailScreen: React.FC = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { coach } = route.params as any
  const { favorites } = useSelector((state: RootState) => state.coaches)
  const { colors } = useTheme()

  const isFavorite = favorites.includes(coach.id)

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Ionicons key={i} name={i <= rating ? "star" : "star-outline"} size={20} color="#FFB800" />)
    }
    return stars
  }

  const handleConnect = () => {
    Alert.alert(
      "Session Request Sent!",
      `Your request to connect with ${coach.name} has been sent. They will respond within 5 minutes.`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
    )
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(coach.id))
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
    },
    header: {
      position: "relative",
      height: 200,
    },
    coverPhoto: {
      width: "100%",
      height: 200,
    },
    backButton: {
      position: "absolute",
      top: 50,
      left: 24,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      alignItems: "center",
      justifyContent: "center",
    },
    profilePicture: {
      position: "absolute",
      bottom: -40,
      left: 24,
      width: 80,
      zIndex: 10,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: colors.surface,
    },
    profileInfo: {
      backgroundColor: colors.surface,
      paddingHorizontal: 24,
      paddingTop: 50,
      paddingBottom: 24,
      marginBottom: 8,
    },
    nameSection: {
      marginBottom: 12,
    },
    coachName: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      fontFamily: "Inter-Bold",
    },
    coachTitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 4,
      fontFamily: "Inter-Regular",
    },
    experience: {
      fontSize: 14,
      color: "#4361EE",
      marginTop: 4,
      fontFamily: "Inter-Medium",
    },
    ratingSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    stars: {
      flexDirection: "row",
      marginRight: 8,
    },
    ratingText: {
      fontSize: 16,
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
    availabilitySection: {
      flexDirection: "row",
      alignItems: "center",
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 8,
    },
    statusText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginRight: "auto",
      fontFamily: "Inter-Medium",
    },
    hourlyRate: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      fontFamily: "Inter-SemiBold",
    },
    section: {
      backgroundColor: colors.surface,
      paddingHorizontal: 24,
      paddingVertical: 20,
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 12,
      fontFamily: "Inter-Bold",
    },
    bio: {
      fontSize: 16,
      color: colors.textSecondary,
      lineHeight: 24,
      fontFamily: "Inter-Regular",
    },
    specialtiesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    specialtyTag: {
      backgroundColor: "#EEF2FF",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
    },
    specialtyText: {
      fontSize: 14,
      color: "#3247a4ff",
      fontFamily: "Inter-Medium",
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    tag: {
      backgroundColor: colors.border,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
    },
    tagText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: "Inter-Medium",
    },
    reviewCard: {
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    reviewHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    reviewerName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      fontFamily: "Inter-SemiBold",
    },
    reviewStars: {
      flexDirection: "row",
    },
    reviewText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 8,
      fontFamily: "Inter-Regular",
    },
    reviewDate: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: "Inter-Regular",
    },
    seeAllReviews: {
      alignItems: "center",
    },
    seeAllText: {
      fontSize: 14,
      color: "#4361EE",
      fontFamily: "Inter-Medium",
    },
    bottomPadding: {
      height: 100,
    },
    stickyActionBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.surface,
      paddingHorizontal: 24,
      paddingVertical: 16,
      paddingBottom: 40,
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    favoriteButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    connectButton: {
      flex: 15,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={coach.coverPhoto || "/professional-background.jpg"} style={styles.coverPhoto} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Image source={coach.profilePicture} style={styles.profilePicture} />
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameSection}>
            <Text style={styles.coachName}>{coach.name}</Text>
            <Text style={styles.coachTitle}>{coach.title}</Text>
            <Text style={styles.experience}>{coach.experience} experience</Text>
          </View>

          <View style={styles.ratingSection}>
            <View style={styles.stars}>{renderStars(Math.floor(coach.rating))}</View>
            <Text style={styles.ratingText}>{coach.rating}</Text>
            <Text style={styles.reviewCount}>({coach.reviewCount} reviews)</Text>
          </View>

          <View style={styles.availabilitySection}>
            <View style={[styles.statusDot, { backgroundColor: coach.isAvailable ? "#10B981" : "#6B7280" }]} />
            <Text style={styles.statusText}>{coach.isAvailable ? "Available Now" : "Available Soon"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{coach.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <View style={styles.specialtiesContainer}>
            {coach.specialization.map((specialty: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {coach.tags.map((tag: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>John D.</Text>
              <View style={styles.reviewStars}>{renderStars(5)}</View>
            </View>
            <Text style={styles.reviewText}>
              "Excellent advice and very professional approach. {coach.name} helped me solve my problem quickly and
              efficiently. Highly recommended!"
            </Text>
            <Text style={styles.reviewDate}>2 days ago</Text>
          </View>

          <TouchableOpacity style={styles.seeAllReviews}>
            <Text style={styles.seeAllText}>See all reviews</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.stickyActionBar}>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#F72585" : colors.textSecondary}
          />
        </TouchableOpacity>

        <Button
          title="Select Coach"
          onPress={handleConnect}
          variant="primary"
          size="medium"
          style={styles.connectButton}
        />
      </View>
    </SafeAreaView>
  )
}

export default CoachDetailScreen
