"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import type { RootState } from "../state/store"
import { updateUser } from "../slices/authSlice"
import Button from "../components/common/Button"
import { useTheme } from "../components/styles/ThemeContext"

const ProfileScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { colors } = useTheme()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    dispatch(updateUser({ name: name.trim(), email: email.trim() }))
    setIsEditing(false)
    Alert.alert("Success", "Profile updated successfully")
  }

  const handleCancel = () => {
    setName(user?.name || "")
    setEmail(user?.email || "")
    setIsEditing(false)
  }

  const myRatings = [
    {
      id: "1",
      coachName: "Dr. Maria Rodriguez",
      coachTitle: "Clinical Psychologist",
      rating: 5,
      review: "Excellent advice and very professional approach. Highly recommended!",
      date: "2024-01-15",
      coachImage: "/professional-woman-psychologist.png",
    },
    {
      id: "2",
      coachName: "Carlos Mendoza",
      coachTitle: "Auto Mechanic Specialist",
      rating: 4,
      review: "Carlos quickly identified the issue and explained the solution clearly.",
      date: "2024-01-20",
      coachImage: "/professional-mechanic-man.jpg",
    },
  ]

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Ionicons key={i} name={i <= rating ? "star" : "star-outline"} size={16} color="#FFB800" />)
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
    editButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      flex: 1,
    },
    profileSection: {
      backgroundColor: colors.surface,
      paddingHorizontal: 24,
      paddingVertical: 32,
      marginBottom: 16,
    },
    profileImageContainer: {
      alignItems: "center",
      marginBottom: 24,
      position: "relative",
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    changePhotoButton: {
      position: "absolute",
      bottom: 0,
      right: "35%",
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#4361EE",
      alignItems: "center",
      justifyContent: "center",
    },
    profileInfo: {
      alignItems: "center",
    },
    userName: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
      fontFamily: "Inter-Bold",
    },
    userEmail: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 24,
      fontFamily: "Inter-Regular",
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      marginBottom: 16,
      width: "100%",
      fontFamily: "Inter-Regular",
      backgroundColor: colors.surface,
      color: colors.text,
    },
    userStats: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      width: "100%",
    },
    statItem: {
      flex: 1,
      alignItems: "center",
    },
    statValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
      fontFamily: "Inter-Bold",
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: "center",
      fontFamily: "Inter-Regular",
    },
    statDivider: {
      width: 1,
      height: 32,
      backgroundColor: colors.border,
      marginHorizontal: 16,
    },
    editActions: {
      flexDirection: "row",
      marginTop: 24,
      gap: 12,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: colors.border,
    },
    saveButton: {
      flex: 1,
    },
    ratingsSection: {
      backgroundColor: colors.surface,
      paddingHorizontal: 24,
      paddingVertical: 20,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
      fontFamily: "Inter-Bold",
    },
    ratingCard: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    ratingHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    coachImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    coachInfo: {
      flex: 1,
    },
    coachName: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 2,
      fontFamily: "Inter-SemiBold",
    },
    coachTitle: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 2,
      fontFamily: "Inter-Regular",
    },
    ratingDate: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: "Inter-Regular",
    },
    ratingStars: {
      flexDirection: "row",
    },
    reviewText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      fontStyle: "italic",
      fontFamily: "Inter-Regular",
    },
    emptyRatings: {
      alignItems: "center",
      paddingVertical: 32,
    },
    emptyRatingsText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textSecondary,
      marginTop: 12,
      marginBottom: 4,
      fontFamily: "Inter-SemiBold",
    },
    emptyRatingsSubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      fontFamily: "Inter-Regular",
    },
    accountSection: {
      backgroundColor: colors.surface,
      paddingHorizontal: 24,
      paddingVertical: 20,
      marginBottom: 16,
    },
    infoCard: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: "Inter-Regular",
    },
    infoValue: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      fontFamily: "Inter-SemiBold",
    },
    averageRating: {
      flexDirection: "row",
      alignItems: "center",
    },
    stars: {
      flexDirection: "row",
      marginRight: 8,
    },
    bottomPadding: {
      height: 32,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
          <Ionicons name={isEditing ? "close" : "pencil"} size={20} color="#4361EE" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user?.profilePicture }} style={styles.profileImage} />
            {isEditing && (
              <TouchableOpacity style={styles.changePhotoButton}>
                <Ionicons name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.profileInfo}>
            {isEditing ? (
              <>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full Name" />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </>
            ) : (
              <>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
              </>
            )}

            <View style={styles.userStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user?.sessionsRemaining}</Text>
                <Text style={styles.statLabel}>Sessions Left</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user?.packageType}</Text>
                <Text style={styles.statLabel}>Current Package</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user?.role}</Text>
                <Text style={styles.statLabel}>Account Type</Text>
              </View>
            </View>
          </View>

          {isEditing && (
            <View style={styles.editActions}>
              <Button
                title="Cancel"
                onPress={handleCancel}
                variant="secondary"
                size="medium"
                style={styles.cancelButton}
              />
              <Button
                title="Save Changes"
                onPress={handleSave}
                variant="primary"
                size="medium"
                style={styles.saveButton}
              />
            </View>
          )}
        </View>

        <View style={styles.ratingsSection}>
          <Text style={styles.sectionTitle}>My Ratings & Reviews</Text>

          {myRatings.map((rating) => (
            <View key={rating.id} style={styles.ratingCard}>
              <View style={styles.ratingHeader}>
                <Image source={{ uri: rating.coachImage }} style={styles.coachImage} />
                <View style={styles.coachInfo}>
                  <Text style={styles.coachName}>{rating.coachName}</Text>
                  <Text style={styles.coachTitle}>{rating.coachTitle}</Text>
                  <Text style={styles.ratingDate}>{formatDate(rating.date)}</Text>
                </View>
                <View style={styles.ratingStars}>{renderStars(rating.rating)}</View>
              </View>

              <Text style={styles.reviewText}>"{rating.review}"</Text>
            </View>
          ))}

          {myRatings.length === 0 && (
            <View style={styles.emptyRatings}>
              <Ionicons name="star-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyRatingsText}>No ratings yet</Text>
              <Text style={styles.emptyRatingsSubtext}>Complete sessions to leave ratings and reviews</Text>
            </View>
          )}
        </View>

        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>January 2024</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total Sessions</Text>
              <Text style={styles.infoValue}>12</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Average Rating Given</Text>
              <View style={styles.averageRating}>
                <View style={styles.stars}>{renderStars(4)}</View>
                <Text style={styles.infoValue}>4.5</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
