"use client";

import type React from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { RootState } from "../state/store";
import { useTheme } from "../components/styles/ThemeContext";
import { Typography } from "../components/common/atoms/Typography";
import { Avatar } from "../components/common/atoms/Avatar";
import { TagChip } from "../components/common/molecules/TagChip";
import { NavigationHeader } from "../components/common/organisms/NavigationHeader";
import { createGlobalStyles } from "../components/styles/GlobalStyles";
import { Session } from "../models/Coach";

const SessionHistoryScreen: React.FC = () => {
  const { sessions, coaches } = useSelector(
    (state: RootState) => state.coaches,
  );
  const navigation = useNavigation();

  const theme = useTheme();
  const styles = createGlobalStyles(theme);

  const getCoachById = (coachId: string) => {
    return coaches.find((coach) => coach.id === coachId);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={14}
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderSessionCard = ({ item }: { item: Session }) => {
    const coach = getCoachById(item.coachId);
    if (!coach) return null;

    return (
      <View style={styles.sessionCard}>
        <View style={styles.sessionHeader}>
          <Avatar source={coach.profilePicture} size={50} />
          <View style={styles.sessionInfo}>
            <Typography
              variant="body"
              color={theme.colors.text}
              style={{ fontWeight: "600", marginBottom: 2 }}
            >
              {coach.name}
            </Typography>
            <Typography
              variant="caption"
              color={theme.colors.textSecondary}
              style={{ marginBottom: 4 }}
            >
              {coach.title}
            </Typography>
            <Typography variant="caption" color={theme.colors.primary}>
              {formatDate(item.scheduledTime)} at{" "}
              {formatTime(item.scheduledTime)}
            </Typography>
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "completed"
                    ? theme.colors.success + "20"
                    : theme.colors.warning + "20",
              },
            ]}
          >
            <Typography
              variant="caption"
              color={
                item.status === "completed"
                  ? theme.colors.success
                  : theme.colors.warning
              }
              style={styles.statusText}
            >
              {item.status === "completed" ? "Completed" : "Upcoming"}
            </Typography>
          </View>
        </View>

        <View style={styles.sessionContent}>
          <Typography
            variant="body"
            color={theme.colors.text}
            style={{ fontWeight: "600", marginBottom: 4 }}
          >
            Problem:
          </Typography>
          <Typography
            variant="body"
            color={theme.colors.textSecondary}
            style={styles.problemText}
          >
            {item.problem}
          </Typography>

          <View style={styles.tagsContainer}>
            {item.tags.map((tag: string, index: number) => (
              <TagChip key={index} label={tag} />
            ))}
          </View>

          {item.status === "completed" && item.rating && (
            <View style={styles.ratingSection}>
              <Typography
                variant="body"
                color={theme.colors.text}
                style={{ fontWeight: "600", marginBottom: 4 }}
              >
                Your Rating:
              </Typography>
              <View style={styles.ratingStars}>{renderStars(item.rating)}</View>
              {item.review && (
                <Typography
                  variant="body"
                  color={theme.colors.textSecondary}
                  style={styles.reviewText}
                >
                  {item.review}
                </Typography>
              )}
            </View>
          )}
        </View>

        {item.status === "upcoming" && (
          <View style={styles.sessionActions}>
            <TouchableOpacity style={styles.rescheduleButton}>
              <Typography
                variant="caption"
                color={theme.colors.textSecondary}
                style={{ fontWeight: "600" }}
              >
                Reschedule
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinButton}>
              <Typography
                variant="caption"
                color="#FFFFFF"
                style={{ fontWeight: "600" }}
              >
                Join Session
              </Typography>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader
        title="Session History"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={sessions}
        renderItem={renderSessionCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="time-outline"
              size={64}
              color={theme.colors.border}
            />
            <Typography
              variant="h3"
              color={theme.colors.text}
              style={styles.emptyStateTitle}
            >
              No Sessions Yet
            </Typography>
            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={styles.emptyStateText}
            >
              Your coaching sessions will appear here once you book your first
              session.
            </Typography>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default SessionHistoryScreen;
