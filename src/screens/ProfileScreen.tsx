"use client";

import type React from "react";
import { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { RootState } from "../state/store";
import { updateUser } from "../slices/authSlice";
import Button from "../components/common/atoms/Button";
import { useTheme } from "../components/styles/ThemeContext";
import { Typography } from "../components/common/atoms/Typography";
import { Input } from "../components/common/atoms/Input";
import { Avatar } from "../components/common/atoms/Avatar";
import { NavigationHeader } from "../components/common/organisms/NavigationHeader";
import { createGlobalStyles } from "../components/styles/GlobalStyles";

const ProfileScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const theme = useTheme();
  const styles = createGlobalStyles(theme);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    dispatch(updateUser({ name: name.trim(), email: email.trim() }));
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setIsEditing(false);
  };

  const myRatings = [
    {
      id: "1",
      coachName: "Dr. Maria Rodriguez",
      coachTitle: "Clinical Psychologist",
      rating: 5,
      review:
        "Excellent advice and very professional approach. Highly recommended!",
      date: "2024-01-15",
      coachImage: "/professional-woman-psychologist.png",
    },
    {
      id: "2",
      coachName: "Carlos Mendoza",
      coachTitle: "Auto Mechanic Specialist",
      rating: 4,
      review:
        "Carlos quickly identified the issue and explained the solution clearly.",
      date: "2024-01-20",
      coachImage: "/professional-mechanic-man.jpg",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color="#FFB800"
        />,
      );
    }
    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader
        title="Profile"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Ionicons
              name={isEditing ? "close" : "pencil"}
              size={20}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Avatar source={{ uri: user?.profilePicture }} size={100} />
            {isEditing && (
              <TouchableOpacity style={styles.changePhotoButton}>
                <Ionicons name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.profileInfo}>
            {isEditing ? (
              <>
                <Input
                  value={name}
                  onChangeText={setName}
                  placeholder="Full Name"
                  style={{ marginBottom: 16, width: "100%" }}
                />
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ marginBottom: 24, width: "100%" }}
                />
              </>
            ) : (
              <>
                <Typography
                  variant="h1"
                  color={theme.colors.text}
                  style={{ marginBottom: 4 }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="body"
                  color={theme.colors.textSecondary}
                  style={{ marginBottom: 24 }}
                >
                  {user?.email}
                </Typography>
              </>
            )}

            <View style={styles.userStats}>
              <View style={styles.statItem}>
                <Typography variant="h3" color={theme.colors.text}>
                  {user?.sessionsRemaining}
                </Typography>
                <Typography
                  variant="caption"
                  color={theme.colors.textSecondary}
                >
                  Sessions Left
                </Typography>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Typography variant="h3" color={theme.colors.text}>
                  {user?.packageType}
                </Typography>
                <Typography
                  variant="caption"
                  color={theme.colors.textSecondary}
                >
                  Current Package
                </Typography>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Typography variant="h3" color={theme.colors.text}>
                  {user?.role}
                </Typography>
                <Typography
                  variant="caption"
                  color={theme.colors.textSecondary}
                >
                  Account Type
                </Typography>
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
          <Typography
            variant="h3"
            color={theme.colors.text}
            style={styles.sectionTitle}
          >
            My Ratings & Reviews
          </Typography>

          {myRatings.map((rating) => (
            <View key={rating.id} style={styles.ratingCard}>
              <View style={styles.ratingHeader}>
                <Avatar source={{ uri: rating.coachImage }} size={40} />
                <View style={styles.coachInfo}>
                  <Typography
                    variant="body"
                    color={theme.colors.text}
                    style={{ fontWeight: "600", marginBottom: 2 }}
                  >
                    {rating.coachName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={theme.colors.textSecondary}
                    style={{ marginBottom: 2 }}
                  >
                    {rating.coachTitle}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={theme.colors.textSecondary}
                  >
                    {formatDate(rating.date)}
                  </Typography>
                </View>
                <View style={styles.ratingStars}>
                  {renderStars(rating.rating)}
                </View>
              </View>

              <Typography
                variant="body"
                color={theme.colors.textSecondary}
                style={styles.reviewText}
              >
                {rating.review}
              </Typography>
            </View>
          ))}

          {myRatings.length === 0 && (
            <View style={styles.emptyRatings}>
              <Ionicons
                name="star-outline"
                size={48}
                color={theme.colors.border}
              />
              <Typography
                variant="body"
                color={theme.colors.textSecondary}
                style={{ marginTop: 12, marginBottom: 4, fontWeight: "600" }}
              >
                No ratings yet
              </Typography>
              <Typography variant="caption" color={theme.colors.textSecondary}>
                Complete sessions to leave ratings and reviews
              </Typography>
            </View>
          )}
        </View>

        <View style={styles.accountSection}>
          <Typography
            variant="h3"
            color={theme.colors.text}
            style={styles.sectionTitle}
          >
            Account Information
          </Typography>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Typography variant="body" color={theme.colors.textSecondary}>
                Member Since
              </Typography>
              <Typography
                variant="body"
                color={theme.colors.text}
                style={{ fontWeight: "600" }}
              >
                January 2024
              </Typography>
            </View>

            <View style={styles.infoRow}>
              <Typography variant="body" color={theme.colors.textSecondary}>
                Total Sessions
              </Typography>
              <Typography
                variant="body"
                color={theme.colors.text}
                style={{ fontWeight: "600" }}
              >
                12
              </Typography>
            </View>

            <View style={styles.infoRow}>
              <Typography variant="body" color={theme.colors.textSecondary}>
                Average Rating Given
              </Typography>
              <View style={styles.averageRating}>
                <View style={styles.stars}>{renderStars(4)}</View>
                <Typography
                  variant="body"
                  color={theme.colors.text}
                  style={{ fontWeight: "600" }}
                >
                  4.5
                </Typography>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
