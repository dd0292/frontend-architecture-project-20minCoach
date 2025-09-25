import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider } from "react-redux"
import { StatusBar } from "expo-status-bar"
import { store } from "./state/store"
import { ThemeProvider } from "./components/styles/ThemeContext"
import LoginScreen from "./screens/LoginScreen"
import UserHomeScreen from "./screens/UserHomeScreen"
import CoachListingScreen from "./screens/CoachListingScreen"
import CoachDetailScreen from "./screens/CoachDetailScreen"
import CoachDashboardScreen from "./screens/CoachDashboardScreen"
import UserSettingsScreen from "./screens/UserSettingsScreen"
import SessionHistoryScreen from "./screens/SessionHistoryScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import ProfileScreen from "./screens/ProfileScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="UserHome" component={UserHomeScreen} />
            <Stack.Screen name="CoachListing" component={CoachListingScreen} />
            <Stack.Screen name="CoachDetail" component={CoachDetailScreen} />
            <Stack.Screen name="CoachDashboard" component={CoachDashboardScreen} />
            <Stack.Screen name="UserSettings" component={UserSettingsScreen} />
            <Stack.Screen name="SessionHistory" component={SessionHistoryScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}
