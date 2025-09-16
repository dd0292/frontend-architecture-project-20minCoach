import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import NavigationBar from "../components/common/NavigationBar"

interface SessionHistoryScreenProps {
  navigation: any
}

export default function SessionHistoryScreen({ navigation }: SessionHistoryScreenProps) {
  const mockSessions = [
    {
      id: "1",
      coachName: "Dr. Sarah Johnson",
      topic: "Anxiety Management",
      date: "2024-01-15",
      duration: "20 min",
      rating: 5,
      status: "completed",
    },
    {
      id: "2",
      coachName: "Mike Chen",
      topic: "React Development",
      date: "2024-01-12",
      duration: "20 min",
      rating: 4,
      status: "completed",
    },
    {
      id: "3",
      coachName: "Robert Kim",
      topic: "Business Strategy",
      date: "2024-01-10",
      duration: "15 min",
      rating: 5,
      status: "completed",
    },
  ]

  const renderStars = (rating: number) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Session History</Text>
        <Text style={styles.subtitle}>Your past coaching sessions</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockSessions.map((session) => (
          <TouchableOpacity key={session.id} style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <Text style={styles.coachName}>{session.coachName}</Text>
              <Text style={styles.sessionDate}>{session.date}</Text>
            </View>

            <Text style={styles.sessionTopic}>{session.topic}</Text>

            <View style={styles.sessionFooter}>
              <Text style={styles.sessionDuration}>{session.duration}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{renderStars(session.rating)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <NavigationBar navigation={navigation} activeScreen="History" />
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
  sessionCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  coachName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  sessionDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  sessionTopic: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 12,
  },
  sessionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionDuration: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8b5cf6",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
  },
  bottomSpacer: {
    height: 100,
  },
})
