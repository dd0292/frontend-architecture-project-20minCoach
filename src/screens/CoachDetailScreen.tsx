"use client";

import type React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import type { RootState } from "../state/store";
import { toggleFavorite } from "../slices/coachesSlice";
import Button from "../components/common/atoms/Button";
import { useTheme } from "../components/styles/ThemeContext";
import { Typography } from "../components/common/atoms/Typography";
import { Avatar } from "../components/common/atoms/Avatar";
import { StatusDot } from "../components/common/atoms/StatusDot";
import { RatingDisplay } from "../components/common/molecules/RatingDisplay";
import { TagChip } from "../components/common/molecules/TagChip";
import { createGlobalStyles } from "../components/styles/GlobalStyles";
import { Coach } from "../models/Coach";

const CoachDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const coach = route.params as Coach;
  const { favorites } = useSelector((state: RootState) => state.coaches);

  const theme = useTheme();
  const styles = createGlobalStyles(theme);

  const isFavorite = favorites.includes(coach.id);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={20}
          color="#FFB800"
        />,
      );
    }
    return stars;
  };

  const handleConnect = () => {
    Alert.alert(
      "Session Request Sent!",
      `Your request to connect with ${coach.name} has been sent. They will respond within 5 minutes.`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
    );
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(coach.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={coach.coverPhoto} style={styles.coverPhoto} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Avatar
            source={coach.profilePicture}
            size={80}
            style={styles.profilePicture}
          />
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameSection}>
            <Typography variant="h1" color={theme.colors.text}>
              {coach.name}
            </Typography>
            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={{ marginTop: 4 }}
            >
              {coach.title}
            </Typography>
            <Typography
              variant="caption"
              color={theme.colors.primary}
              style={styles.experience}
            >
              {coach.experience} experience
            </Typography>
          </View>

          <View style={styles.ratingSection}>
            <RatingDisplay
              rating={coach.rating}
              reviewCount={coach.reviewCount}
            />
          </View>

          <View style={styles.availabilitySection}>
            <StatusDot status={`${coach.isAvailable}`} />
            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={styles.statusText}
            >
              {coach.isAvailable ? "Available Now" : "Available Soon"}
            </Typography>
          </View>
        </View>

        <View style={styles.section}>
          <Typography
            variant="h3"
            color={theme.colors.text}
            style={styles.sectionTitle}
          >
            About
          </Typography>
          <Typography
            variant="body"
            color={theme.colors.textSecondary}
            style={styles.bio}
          >
            {coach.bio}
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography
            variant="h3"
            color={theme.colors.text}
            style={styles.sectionTitle}
          >
            Specialties
          </Typography>
          <View style={styles.specialtiesContainer}>
            {coach.specialization.map(
              (
                specialty:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<unknown>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactPortal
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<unknown>
                        >
                      | Iterable<React.ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined,
                index: React.Key | null | undefined,
              ) => (
                <View key={index} style={styles.specialtyTag}>
                  <Typography variant="caption" color={theme.colors.primary}>
                    {specialty}
                  </Typography>
                </View>
              ),
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Typography
            variant="h3"
            color={theme.colors.text}
            style={styles.sectionTitle}
          >
            Tags
          </Typography>
          <View style={styles.tagsContainer}>
            {coach.tags.map(
              (tag: string, index: React.Key | null | undefined) => (
                <TagChip key={index} label={tag} variant="selected" />
              ),
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Typography
            variant="h3"
            color={theme.colors.text}
            style={styles.sectionTitle}
          >
            Reviews
          </Typography>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Typography variant="body" color={theme.colors.text}>
                John D.
              </Typography>
              <View style={styles.reviewStars}>{renderStars(5)}</View>
            </View>
            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={styles.reviewText}
            >
              Excellent advice and very professional approach. {coach.name}{" "}
              helped me solve my problem quickly and efficiently. Highly
              recommended!
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              2 days ago
            </Typography>
          </View>

          <TouchableOpacity style={styles.seeAllReviews}>
            <Typography variant="body" color={theme.colors.primary}>
              See all reviews
            </Typography>
          </TouchableOpacity>
        </View>

        <View style={styles.largeBottomPadding} />
      </ScrollView>

      <View style={styles.stickyActionBar}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={
              isFavorite ? theme.colors.accent : theme.colors.textSecondary
            }
          />
        </TouchableOpacity>

        <Button
          title="Select Coach & Connect"
          onPress={handleConnect}
          variant="primary"
          size="large"
          style={styles.connectButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default CoachDetailScreen;
