import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native"
import NavigationBar from "../components/common/NavigationBar"

interface FavoritesScreenProps {
  navigation: any
}

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const favoriteCoaches = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Psychology",
      rating: 4.9,
      profilePicture: "/placeholder.svg?height=60&width=60&text=SJ",
      isAvailable: true,
    },
    {
      id: "6",
      name: "Robert Kim",
      specialization: "Business",
      rating: 4.9,
      profilePicture: "/placeholder.svg?height=60&width=60&text=RK",
      isAvailable: true,
    },
    {
      id: "10",
      name: "Alex Turner",
      specialization: "Programming",
      rating: 4.8,
      profilePicture: "/placeholder.svg?height=60&width=60&text=AT",
      isAvailable: false,
    },
  ]

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    for (let i = 0; i < fullStars; i++) {
      stars.push("⭐")
    }
    return stars.join("")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Coaches</Text>
        <Text style={styles.subtitle}>Your saved coaches for quick access</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {favoriteCoaches.map((coach) => (
          <TouchableOpacity key={coach.id} style={styles.coachCard}>
            <Image source={{ uri: coach.profilePicture }} style={styles.coachAvatar} />

            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{coach.name}</Text>
              <Text style={styles.coachSpecialization}>{coach.specialization}</Text>

              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{renderStars(coach.rating)}</Text>
                <Text style={styles.ratingText}>{coach.rating}</Text>
              </View>
            </View>

            <View style={styles.rightSection}>
              <View style={[styles.availabilityBadge, coach.isAvailable ? styles.available : styles.unavailable]}>
                <Text
                  style={[styles.availabilityText, coach.isAvailable ? styles.availableText : styles.unavailableText]}
                >
                  {coach.isAvailable ? "Available" : "Busy"}
                </Text>
              </View>

              <TouchableOpacity style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <NavigationBar navigation={navigation} activeScreen="Favorites" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  scrollView: {
    flex: 1,
    padding: 24,
  },
  coachCard: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  coachAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  coachSpecialization: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  available: {
    backgroundColor: "#dcfce7",
  },
  unavailable: {
    backgroundColor: "#fef2f2",
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: "500",
  },
  availableText: {
    color: "#16a34a",
  },
  unavailableText: {
    color: "#dc2626",
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  removeButtonText: {
    fontSize: 12,
    color: "#ef4444",
    fontWeight: "500",
  },
  bottomSpacer: {
    height: 100,
  },
})
