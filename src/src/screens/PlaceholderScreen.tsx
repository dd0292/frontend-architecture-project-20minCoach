import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import Button from "../components/common/Button"
import NavigationBar from "../components/common/NavigationBar"

interface PlaceholderScreenProps {
  navigation: any
  route: any
}

export default function PlaceholderScreen({ navigation, route }: PlaceholderScreenProps) {
  const screenName = route.params?.screenName || "Feature"

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🚧</Text>
        <Text style={styles.title}>{screenName}</Text>
        <Text style={styles.subtitle}>This feature is coming soon in the full version of 20minCoach.</Text>

        <Button title="Go Back to Home" onPress={() => navigation.navigate("Search")} style={styles.backButton} />
      </View>

      <NavigationBar navigation={navigation} activeScreen="" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  backButton: {
    minWidth: 200,
  },
})
