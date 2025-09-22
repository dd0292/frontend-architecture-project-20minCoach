"use client"

import type React from "react"
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from "react-native"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import type { RootState } from "../state/store"
import { useTheme } from "../components/contexts/ThemeContext"

const SessionHistoryScreen: React.FC = () => {
  const { sessions, coaches } = useSelector((state: RootState) => state.coaches)
  const navigation = useNavigation()
  const { colors } = useTheme()

  const getCoachById = (coachId: string) => {
    return coaches.find((coach) => coach.id === coachId)
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Ionicons key={i} name={i <= rating ? "star" : "star-outline"} size={14} color="#FFB800" />)
    }
    return stars
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
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
    sessionCard: {
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
    sessionHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    coachImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    sessionInfo: {
      flex: 1,
    },
    coachName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 2,
      fontFamily: "Inter-SemiBold",
    },
    coachTitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 4,
      fontFamily: "Inter-Regular",
    },
    sessionDate: {
      fontSize: 12,
      color: "#4361EE",
      fontFamily: "Inter-Medium",
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
      fontFamily: "Inter-SemiBold",
    },
    sessionContent: {
      marginBottom: 12,
    },
    problemTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
      fontFamily: "Inter-SemiBold",
    },
    problemText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 12,
      lineHeight: 20,
      fontFamily: "Inter-Regular",
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 12,
    },
    tag: {
      backgroundColor: colors.border,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 8,
      marginBottom: 4,
    },
    tagText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: "Inter-Medium",
    },
    ratingSection: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
    },
    ratingLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
      fontFamily: "Inter-SemiBold",
    },
    ratingStars: {
      flexDirection: "row",
      marginBottom: 8,
    },
    reviewText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontStyle: "italic",
      lineHeight: 20,
      fontFamily: "Inter-Regular",
    },
    sessionActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
    },
    rescheduleButton: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      alignItems: "center",
      marginRight: 8,
    },
    rescheduleText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: "600",
      fontFamily: "Inter-SemiBold",
    },
    joinButton: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: "#4361EE",
      borderRadius: 8,
      alignItems: "center",
      marginLeft: 8,
    },
    joinText: {
      fontSize: 14,
      color: "#FFFFFF",
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
      fontFamily: "Inter-Regular",
    },
  })

  const renderSessionCard = ({ item }: { item: any }) => {
    const coach = getCoachById(item.coachId)
    if (!coach) return null

    return (
      <View style={styles.sessionCard}>
        <View style={styles.sessionHeader}>
          <Image source={{ uri: coach.profilePicture }} style={styles.coachImage} />
          <View style={styles.sessionInfo}>
            <Text style={styles.coachName}>{coach.name}</Text>
            <Text style={styles.coachTitle}>{coach.title}</Text>
            <Text style={styles.sessionDate}>
              {formatDate(item.scheduledTime)} at {formatTime(item.scheduledTime)}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: item.status === "completed" ? "#D1FAE5" : "#FEF3C7" }]}>
            <Text style={[styles.statusText, { color: item.status === "completed" ? "#065F46" : "#92400E" }]}>
              {item.status === "completed" ? "Completed" : "Upcoming"}
            </Text>
          </View>
        </View>

        <View style={styles.sessionContent}>
          <Text style={styles.problemTitle}>Problem:</Text>
          <Text style={styles.problemText}>{item.problem}</Text>

          <View style={styles.tagsContainer}>
            {item.tags.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {item.status === "completed" && item.rating && (
            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>Your Rating:</Text>
              <View style={styles.ratingStars}>{renderStars(item.rating)}</View>
              {item.review && <Text style={styles.reviewText}>"{item.review}"</Text>}
            </View>
          )}
        </View>

        {item.status === "upcoming" && (
          <View style={styles.sessionActions}>
            <TouchableOpacity style={styles.rescheduleButton}>
              <Text style={styles.rescheduleText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinText}>Join Session</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Session History</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={sessions}
        renderItem={renderSessionCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>No Sessions Yet</Text>
            <Text style={styles.emptyStateText}>
              Your coaching sessions will appear here once you book your first session.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default SessionHistoryScreen
