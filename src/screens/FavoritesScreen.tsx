"use client";

import type React from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { RootState } from "../state/store";
import { toggleFavorite } from "../slices/coachesSlice";
import { useTheme } from "../components/styles/ThemeContext";
import { Typography } from "../components/common/atoms/Typography";
import { Avatar } from "../components/common/atoms/Avatar";
import { StatusDot } from "../components/common/atoms/StatusDot";
import Button from "../components/common/atoms/Button";
import { RatingDisplay } from "../components/common/molecules/RatingDisplay";
import { TagChip } from "../components/common/molecules/TagChip";
import { NavigationHeader } from "../components/common/organisms/NavigationHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../models/Navigation";
import { createGlobalStyles } from "../components/styles/GlobalStyles";
import { Coach } from "../models/Coach";

const FavoritesScreen: React.FC = () => {
  const { coaches, favorites } = useSelector(
    (state: RootState) => state.coaches,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const theme = useTheme();
  const styles = createGlobalStyles(theme);

  const favoriteCoaches = coaches.filter((coach) =>
    favorites.includes(coach.id),
  );

  const handleRemoveFavorite = (coachId: string) => {
    dispatch(toggleFavorite(coachId));
  };

  const renderCoachCard = ({ item }: { item: Coach }) => (
    <View style={styles.coachCard}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate("CoachDetail", { coach: item })}
      >
        <Avatar source={item.profilePicture} size={60} />

        <View style={styles.coachInfo}>
          <Typography
            variant="body"
            color={theme.colors.text}
            style={{ fontWeight: "bold", marginBottom: 2 }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="caption"
            color={theme.colors.textSecondary}
            style={{ marginBottom: 6 }}
          >
            {item.title}
          </Typography>

          <RatingDisplay
            rating={item.rating}
            reviewCount={item.reviewCount}
            size="small"
          />

          <View style={styles.availabilityContainer}>
            <StatusDot status={`${item.isAvailable}`} />
            <Typography
              variant="caption"
              color={theme.colors.textSecondary}
              style={styles.statusText}
            >
              {item.isAvailable ? "Available Now" : "Available Soon"}
            </Typography>
          </View>

          <View style={styles.tagsContainer}>
            {item.tags.slice(0, 2).map((tag: string, index: number) => (
              <TagChip key={index} label={tag} />
            ))}
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleRemoveFavorite(item.id)}
        >
          <Ionicons name="heart" size={20} color={theme.colors.accent} />
        </TouchableOpacity>

        <Button
          title="Connect"
          onPress={() => navigation.navigate("CoachDetail", { coach: item })}
          variant="primary"
          size="small"
          style={styles.connectButton}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader
        title="Favorite Coaches"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={favoriteCoaches}
        renderItem={renderCoachCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="heart-outline"
              size={64}
              color={theme.colors.border}
            />
            <Typography
              variant="h3"
              color={theme.colors.text}
              style={styles.emptyStateTitle}
            >
              No Favorites Yet
            </Typography>
            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={styles.emptyStateText}
            >
              Add coaches to your favorites by tapping the heart icon on their
              profile.
            </Typography>
            <Button
              title="Browse Coaches"
              onPress={() => navigation.navigate("UserHome" as never)}
              variant="primary"
              size="medium"
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default FavoritesScreen;
