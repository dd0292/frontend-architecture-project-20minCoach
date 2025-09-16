"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from "react-native"
import { useDispatch } from "react-redux"
import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice"
import { AuthController } from "../controllers/authController"
import { Validator } from "../utils/validator"
import { Logger } from "../utils/logger"
import Button from "../components/common/Button"

interface LoginScreenProps {
  navigation: any
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const dispatch = useDispatch()

  const validateForm = (): boolean => {
    let isValid = true

    // Reset errors
    setEmailError("")
    setPasswordError("")

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required")
      isValid = false
    } else if (!Validator.isValidEmail(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    } else if (!Validator.isValidPassword(password)) {
      setPasswordError("Password must be at least 6 characters")
      isValid = false
    }

    return isValid
  }

  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    dispatch(loginStart())

    try {
      Logger.log("Attempting login", { email })
      const user = await AuthController.login(email, password)

      dispatch(loginSuccess(user))
      Logger.log("Login successful", { userId: user.id, role: user.role })

      // Navigate based on user role
      if (user.isCoach()) {
        navigation.replace("CoachProfile")
      } else {
        navigation.replace("Search")
      }
    } catch (error: any) {
      Logger.error("Login failed", error)
      dispatch(loginFailure())
      Alert.alert("Login Failed", error.message || "Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (userType: "user" | "coach") => {
    if (userType === "user") {
      setEmail("user@example.com")
      setPassword("password123")
    } else {
      setEmail("coach@example.com")
      setPassword("password123")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Image source={{ uri: "/placeholder.svg?height=80&width=80&text=20min" }} style={styles.logo} />
            <Text style={styles.title}>20minCoach</Text>
            <Text style={styles.subtitle}>Connect with experts in 20 minutes</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                value={email}
                onChangeText={(text) => {
                  setEmail(text)
                  if (emailError) setEmailError("")
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                value={password}
                onChangeText={(text) => {
                  setPassword(text)
                  if (passwordError) setPasswordError("")
                }}
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <Button
              title={isLoading ? "Signing In..." : "Sign In"}
              onPress={handleLogin}
              disabled={isLoading}
              style={styles.signInButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or try demo accounts</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.demoButtons}>
              <Button
                title="Demo User"
                onPress={() => handleDemoLogin("user")}
                variant="outline"
                style={styles.demoButton}
              />
              <Button
                title="Demo Coach"
                onPress={() => handleDemoLogin("coach")}
                variant="secondary"
                style={styles.demoButton}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to 20minCoach? Create an account to get started.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
  },
  signInButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6b7280",
    fontSize: 14,
  },
  demoButtons: {
    flexDirection: "row",
    gap: 12,
  },
  demoButton: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
})
