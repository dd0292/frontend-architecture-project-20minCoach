"use client";

import type React from "react";
import { useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/common/atoms/Button";
import { Input } from "../components/common/atoms/Input";
import { Typography } from "../components/common/atoms/Typography";
import { authenticateUser, validateEmail } from "../controllers/authController";
import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice";
import { useTheme } from "../components/styles/ThemeContext";
import { createGlobalStyles } from "../components/styles/GlobalStyles";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const theme = useTheme();
  const styles = createGlobalStyles(theme);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAuth = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 1) {
      Alert.alert("Error", "Please enter a password");
      return;
    }

    dispatch(loginStart());

    try {
      const user = await authenticateUser(email, password);
      if (user) {
        dispatch(loginSuccess(user));
        // Navigate based on user role
        if (user.name === "Dr. Maria Rodriguez") {
          navigation.navigate("CoachDashboard" as never);
        } else {
          navigation.navigate("UserHome" as never);
        }
      } else {
        dispatch(loginFailure());
        Alert.alert(
          "Error",
          "Invalid credentials. Try john@example.com or sarah@example.com",
        );
      }
    } catch (error) {
      dispatch(loginFailure());
      Alert.alert("Error", `Authentication failed: ${error}`);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.border]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <View
              style={[styles.card, { backgroundColor: theme.colors.surface }]}
            >
              <View style={styles.logoContainer}>
                <Typography
                  variant="h1"
                  color={theme.colors.primary}
                  style={styles.logo}
                >
                  20minCoach
                </Typography>
              </View>

              <Image
                source={{
                  uri: "/two-people-video-call-coaching-illustration.jpg",
                }}
                style={styles.illustration}
                resizeMode="contain"
              />

              <Typography
                variant="h2"
                color={theme.colors.text}
                style={styles.headline}
              >
                Connect with an expert in 20 minutes.
              </Typography>
              <Typography
                variant="body"
                color={theme.colors.textSecondary}
                style={styles.subheading}
              >
                Get instant help from vetted professionals in law, health, tech,
                arts, and more.
              </Typography>

              <View style={styles.form}>
                <Input
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                />

                <Button
                  title={isLogin ? "Log In" : "Sign Up with Email"}
                  onPress={handleAuth}
                  variant="primary"
                  size="large"
                  style={styles.primaryButton}
                />

                <Button
                  title={isLogin ? "Sign Up" : "Log In"}
                  onPress={() => setIsLogin(!isLogin)}
                  variant="secondary"
                  style={styles.secondaryButton}
                />
              </View>

              <Typography
                variant="caption"
                color={theme.colors.textSecondary}
                style={styles.footer}
              >
                By continuing, you agree to our Terms of Service and Privacy
                Policy.
              </Typography>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
