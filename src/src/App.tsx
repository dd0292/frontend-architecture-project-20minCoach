import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider } from "react-redux"
import { store } from "./state/store"
import LoginScreen from "./screens/LoginScreen"
import SearchScreen from "./screens/SearchScreen"
import ResultsScreen from "./screens/ResultsScreen"
import CoachProfileScreen from "./screens/CoachProfileScreen"
import PlaceholderScreen from "./screens/PlaceholderScreen"
import SessionHistoryScreen from "./screens/SessionHistoryScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import UserProfileScreen from "./screens/UserProfileScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#1f2937",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ title: "20minCoach" }} />
          <Stack.Screen name="Results" component={ResultsScreen} options={{ title: "Available Coaches" }} />
          <Stack.Screen name="CoachProfile" component={CoachProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Placeholder" component={PlaceholderScreen} options={{ title: "Coming Soon" }} />
          <Stack.Screen name="SessionHistory" component={SessionHistoryScreen} options={{ title: "Session History" }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favorite Coaches" }} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: "Profile" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
