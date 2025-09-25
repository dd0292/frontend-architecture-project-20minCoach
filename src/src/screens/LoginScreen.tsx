"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/common/Button"
import { authenticateUser, validateEmail } from "../controllers/authController"
import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice"
import { useTheme } from "../components/styles/ThemeContext"

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleAuth = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address")
      return
    }

    if (password.length < 1) {
      Alert.alert("Error", "Please enter a password")
      return
    }

    dispatch(loginStart())

    try {
      const user = await authenticateUser(email, password)
      if (user) {
        dispatch(loginSuccess(user))
        // Navigate based on user role
        if (user.name === "Dr. Maria Rodriguez") {
          navigation.navigate("CoachDashboard" as never)
        } else {
          navigation.navigate("UserHome" as never)
        }
      } else {
        dispatch(loginFailure())
        Alert.alert("Error", "Invalid credentials. Try john@example.com or sarah@example.com")
      }
    } catch (error) {
      dispatch(loginFailure())
      Alert.alert("Error", "Authentication failed")
    }
  }

  return (
    <LinearGradient colors={[colors.background, colors.border]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
          <View style={styles.content}>
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <View style={styles.logoContainer}>
                <Text style={[styles.logo, { color: colors.primary }]}>20minCoach</Text>
              </View>

              <Image
                source={{ uri: "/two-people-video-call-coaching-illustration.jpg" }}
                style={styles.illustration}
                resizeMode="contain"
              />

              <Text style={[styles.headline, { color: colors.text }]}>Connect with an expert in 20 minutes.</Text>
              <Text style={[styles.subheading, { color: colors.textSecondary }]}>
                Get instant help from vetted professionals in law, health, tech, arts, and more.
              </Text>

              <View style={styles.form}>
                <TextInput
                  style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                  placeholder="Email"
                  placeholderTextColor={colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                  placeholder="Password"
                  placeholderTextColor={colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
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
                  variant="text"
                  style={styles.secondaryButton}
                />
              </View>

              <Text style={[styles.footer, { color: colors.textSecondary }]}>
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 12,
    padding: 32,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
  illustration: {
    width: "100%",
    height: 150,
    marginBottom: 24,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "Inter-Bold",
  },
  subheading: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    fontFamily: "Inter-Regular",
  },
  form: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    fontFamily: "Inter-Regular",
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {
    marginTop: 8,
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    fontFamily: "Inter-Regular",
  },
})

export default LoginScreen
