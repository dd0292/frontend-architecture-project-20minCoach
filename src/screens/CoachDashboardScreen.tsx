"use client";

import type React from "react";
import { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../slices/authSlice";
import { useTheme } from "../components/styles/ThemeContext";
import { Typography } from "../components/common/atoms/Typography";
import Button from "../components/common/atoms/Button";
import { createGlobalStyles } from "../components/styles/GlobalStyles";

type Noop = () => void;
const noop: Noop = () => {};

const CoachDashboardScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const theme = useTheme();
  const styles = createGlobalStyles(theme);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          navigation.navigate("Login" as never);
        },
      },
    ]);
  };

  const todaySessions = [
    {
      id: "1",
      clientName: "Alejandro",
      problem: "Car Noise",
      time: "10:00 AM",
      status: "upcoming",
    },
    {
      id: "2",
      clientName: "Carla",
      problem: "Watercolor Tips",
      time: "2:30 PM",
      status: "upcoming",
    },
    {
      id: "3",
      clientName: "Roberto",
      problem: "Engine Diagnostics",
      time: "4:00 PM",
      status: "completed",
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <Typography variant="h2" color={theme.colors.text}>
          Coach Dashboard
        </Typography>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={theme.colors.accent}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.statusSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <View style={styles.statusHeader}>
            <Typography variant="h3" color={theme.colors.text}>
              {isOnline ? "You're Online" : "Go Online"}
            </Typography>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.success,
              }}
              thumbColor="#FFFFFF"
            />
          </View>
          <Typography variant="body" color={theme.colors.textSecondary}>
            {isOnline
              ? "Available to receive new session requests"
              : "Not accepting new sessions"}
          </Typography>
        </View>

        <View style={styles.statsContainer}>
          <View
            style={[styles.statCard, { backgroundColor: theme.colors.surface }]}
          >
            <Ionicons name="cash" size={24} color={theme.colors.success} />
            <Typography
              variant="h3"
              color={theme.colors.text}
              style={styles.statValue}
            >
              $1,240
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              Earnings This Week
            </Typography>
          </View>

          <View
            style={[styles.statCard, { backgroundColor: theme.colors.surface }]}
          >
            <Ionicons name="time" size={24} color={theme.colors.primary} />
            <Typography
              variant="h3"
              color={theme.colors.text}
              style={styles.statValue}
            >
              15min
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              Next Session
            </Typography>
          </View>

          <View
            style={[styles.statCard, { backgroundColor: theme.colors.surface }]}
          >
            <Ionicons name="star" size={24} color={theme.colors.warning} />
            <Typography
              variant="h3"
              color={theme.colors.text}
              style={styles.statValue}
            >
              4.9
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              Average Rating
            </Typography>
          </View>
        </View>

        <View
          style={[
            styles.progressSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Typography
            variant="h3"
            color={theme.colors.text}
            style={styles.sectionTitle}
          >
            Profile Completion
          </Typography>
          <View
            style={[
              styles.progressBar,
              { backgroundColor: theme.colors.border },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                { backgroundColor: theme.colors.primary, width: "85%" },
              ]}
            />
          </View>
          <Typography
            variant="body"
            color={theme.colors.text}
            style={styles.progressText}
          >
            85% Complete
          </Typography>
          <Typography variant="caption" color={theme.colors.textSecondary}>
            Complete your profile to attract more clients
          </Typography>
        </View>

        <View
          style={[
            styles.sessionsSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Typography
            variant="h3"
            color={theme.colors.text}
            style={styles.sectionTitle}
          >
            Todays Sessions
          </Typography>
          {todaySessions.map((session) => (
            <View
              key={session.id}
              style={[
                styles.sessionCard,
                { borderBottomColor: theme.colors.border },
              ]}
            >
              <View style={styles.sessionInfo}>
                <Typography
                  variant="body"
                  color={theme.colors.text}
                  style={styles.clientName}
                >
                  {session.clientName}
                </Typography>
                <Typography
                  variant="caption"
                  color={theme.colors.textSecondary}
                >
                  {session.problem}
                </Typography>
                <Typography
                  variant="caption"
                  color={theme.colors.primary}
                  style={styles.sessionTime}
                >
                  {session.time}
                </Typography>
              </View>

              {session.status === "upcoming" && (
                <Button
                  title="Start Call"
                  variant="primary"
                  size="small"
                  style={styles.startCallButton}
                  onPress={() => noop}
                />
              )}

              {session.status === "completed" && (
                <View
                  style={[
                    styles.completedBadge,
                    { backgroundColor: theme.colors.border },
                  ]}
                >
                  <Typography
                    variant="caption"
                    color={theme.colors.textSecondary}
                  >
                    Completed
                  </Typography>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[
              styles.actionCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Ionicons name="calendar" size={32} color={theme.colors.primary} />
            <Typography
              variant="body"
              color={theme.colors.text}
              style={styles.actionTitle}
            >
              Calendar
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              Manage your schedule
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Ionicons name="wallet" size={32} color={theme.colors.success} />
            <Typography
              variant="body"
              color={theme.colors.text}
              style={styles.actionTitle}
            >
              Wallet
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              View earnings & payouts
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Ionicons name="person" size={32} color={theme.colors.accent} />
            <Typography
              variant="body"
              color={theme.colors.text}
              style={styles.actionTitle}
            >
              Profile
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              Edit your information
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Ionicons
              name="chatbubbles"
              size={32}
              color={theme.colors.warning}
            />
            <Typography
              variant="body"
              color={theme.colors.text}
              style={styles.actionTitle}
            >
              Messages
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              Client communications
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoachDashboardScreen;
