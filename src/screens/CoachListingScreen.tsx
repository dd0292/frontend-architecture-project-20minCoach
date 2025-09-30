"use client";

import type React from "react";
import { useState } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { RootState } from "../state/store";
import type { Coach } from "../models/Coach";
import { useTheme } from "../components/styles/ThemeContext";
import { Typography } from "../components/common/atoms/Typography";
import { SearchBar } from "../components/common/molecules/SearchBar";
import { CoachCard } from "../components/common/organisms/CoachCard";
import { NavigationHeader } from "../components/common/organisms/NavigationHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../models/Navigation";
import { createGlobalStyles } from "../components/styles/GlobalStyles";

const CoachListingScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const styles = createGlobalStyles(theme);

  const { searchResults } = useSelector((state: RootState) => state.coaches);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const renderCoachCard = ({ item }: { item: Coach }) => (
    <CoachCard
      coach={item}
      onPress={() => navigation.navigate("CoachDetail", { coach: item })}
    />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ marginTop: 35 }}>
        <NavigationHeader
          title="Available Coaches"
          subtitle={`We found ${searchResults.length} coaches matching your search`}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />
      </View>

      <View
        style={[
          styles.searchSection,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Update your search..."
          style={styles.searchBar}
        />

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme.colors.primary + "20" },
            ]}
          >
            <Ionicons name="funnel" size={16} color={theme.colors.primary} />
            <Typography
              variant="caption"
              color={theme.colors.primary}
              style={styles.filterText}
            >
              Filters
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sortButton}>
            <Typography
              variant="caption"
              color={theme.colors.textSecondary}
              style={styles.sortText}
            >
              Sort: Rating
            </Typography>
            <Ionicons
              name="chevron-down"
              size={16}
              color={theme.colors.textSecondary}
            />
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
  );
};

export default CoachListingScreen;
