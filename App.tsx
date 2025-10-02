import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Session } from "@supabase/supabase-js";
import { store } from "./src/state/store";
import { ThemeProvider } from "./src/components/styles/ThemeContext";
import { supabase } from "./src/utils/supabase";
import Auth from "./src/components/auth/Auth";
import UserHomeScreen from "./src/screens/UserHomeScreen";
import CoachListingScreen from "./src/screens/CoachListingScreen";
import CoachDetailScreen from "./src/screens/CoachDetailScreen";
import CoachDashboardScreen from "./src/screens/CoachDashboardScreen";
import UserSettingsScreen from "./src/screens/UserSettingsScreen";
import SessionHistoryScreen from "./src/screens/SessionHistoryScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          {session && session.user ? (
            <Stack.Navigator
              initialRouteName="UserHome"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="UserHome" component={UserHomeScreen} />
              <Stack.Screen
                name="CoachListing"
                component={CoachListingScreen}
              />
              <Stack.Screen name="CoachDetail" component={CoachDetailScreen} />
              <Stack.Screen
                name="CoachDashboard"
                component={CoachDashboardScreen}
              />
              <Stack.Screen
                name="UserSettings"
                component={UserSettingsScreen}
              />
              <Stack.Screen
                name="SessionHistory"
                component={SessionHistoryScreen}
              />
              <Stack.Screen name="Favorites" component={FavoritesScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
          ) : (
            <Auth />
          )}
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
