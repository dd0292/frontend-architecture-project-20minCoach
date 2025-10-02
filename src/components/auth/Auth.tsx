import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { supabase } from "../../utils/supabase";
import { useTheme } from "../styles/ThemeContext";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const theme = useTheme();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Error", error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Error", error.message);
    if (!session)
      Alert.alert("Success", "Please check your inbox for email verification!");
    setLoading(false);
  }

  const handleSubmit = () => {
    if (isSignUp) {
      signUpWithEmail();
    } else {
      signInWithEmail();
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.surface }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Text style={[styles.logo, { color: theme.colors.primary }]}>
                20minCoach
              </Text>
            </View>

            {/* Headline */}
            <Text style={[styles.headline, { color: theme.colors.text }]}>
              Connect with{"\n"}an expert in 20{"\n"}minutes.
            </Text>

            {/* Subheading */}
            <Text
              style={[styles.subheading, { color: theme.colors.textSecondary }]}
            >
              Get instant help from vetted{"\n"}professionals in law, health,
              {"\n"}tech, arts, and more.
            </Text>

            {/* Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                placeholder="example@mail.com"
                placeholderTextColor={theme.colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />

              {/* Password Input */}
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                placeholder="Password"
                placeholderTextColor={theme.colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  { backgroundColor: theme.colors.primary },
                  loading && styles.buttonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
                </Text>
              </TouchableOpacity>

              {/* Toggle Sign Up / Sign In */}
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setIsSignUp(!isSignUp)}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.secondaryButtonText,
                    { color: theme.colors.primary },
                  ]}
                >
                  {isSignUp ? "Already have an account? Log In" : "Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <Text
              style={[styles.footer, { color: theme.colors.textSecondary }]}
            >
              By continuing, you agree to our Terms{"\n"}of Service and Privacy
              Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
    marginTop: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  headline: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    opacity: 0.7,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  primaryButton: {
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.6,
    marginTop: 16,
  },
});
