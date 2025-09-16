import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../state/store"
import { logout } from "../../slices/authSlice"

interface NavigationBarProps {
  navigation: any
  activeScreen: string
}

export default function NavigationBar({ navigation, activeScreen }: NavigationBarProps) {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigation.replace("Login")
  }

  const navigateToScreen = (screenName: string) => {
    if (screenName === "Search") {
      navigation.navigate("Search")
    } else if (screenName === "History") {
      navigation.navigate("SessionHistory")
    } else if (screenName === "Favorites") {
      navigation.navigate("Favorites")
    } else if (screenName === "Profile") {
      if (user?.isCoach()) {
        navigation.navigate("CoachProfile")
      } else {
        navigation.navigate("UserProfile")
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navItem, activeScreen === "Search" ? styles.navItemActive : null]}
        onPress={() => navigateToScreen("Search")}
      >
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={[styles.navText, activeScreen === "Search" ? styles.navTextActive : null]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, activeScreen === "History" ? styles.navItemActive : null]}
        onPress={() => navigateToScreen("History")}
      >
        <Text style={styles.navIcon}>📚</Text>
        <Text style={[styles.navText, activeScreen === "History" ? styles.navTextActive : null]}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, activeScreen === "Favorites" ? styles.navItemActive : null]}
        onPress={() => navigateToScreen("Favorites")}
      >
        <Text style={styles.navIcon}>⭐</Text>
        <Text style={[styles.navText, activeScreen === "Favorites" ? styles.navTextActive : null]}>Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, activeScreen === "Profile" ? styles.navItemActive : null]}
        onPress={() => navigateToScreen("Profile")}
      >
        <Text style={styles.navIcon}>👤</Text>
        <Text style={[styles.navText, activeScreen === "Profile" ? styles.navTextActive : null]}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
        <Text style={styles.navIcon}>🚪</Text>
        <Text style={styles.navText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingBottom: 20,
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: "#f3f4f6",
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  navTextActive: {
    color: "#1f2937",
  },
})
