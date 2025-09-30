"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

export type ThemeMode = "light" | "dark" | "system";
export type ColorScheme = "light" | "dark";

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  error: string;
  success: string;
  warning: string;
}

const lightTheme: ThemeColors = {
  background: "#F8F9FA",
  surface: "#FFFFFF",
  primary: "#4361EE",
  secondary: "#3A0CA3",
  accent: "#F72585",
  text: "#1F2937",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  card: "#FFFFFF",
  error: "#FF375F",
  success: "#10B981",
  warning: "#F59E0B",
};

const darkTheme: ThemeColors = {
  background: "#0F172A",
  surface: "#1E293B",
  primary: "#6366F1",
  secondary: "#8B5CF6",
  accent: "#F472B6",
  text: "#F8FAFC",
  textSecondary: "#94A3B8",
  border: "#334155",
  card: "#1E293B",
  error: "#EF4444",
  success: "#22C55E",
  warning: "#EAB308",
};

export interface ThemeContextType {
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@20mincoach_theme";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [systemColorScheme, setSystemColorScheme] = useState<ColorScheme>(
    Appearance.getColorScheme() === "dark" ? "dark" : "light",
  );

  // Load theme from storage on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
          setThemeModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    loadTheme();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme === "dark" ? "dark" : "light");
    });
    return () => subscription?.remove();
  }, []);

  // Save theme to storage when changed
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  // Determine current color scheme
  const colorScheme: ColorScheme =
    themeMode === "system" ? systemColorScheme : themeMode;

  // Get current theme colors
  const colors = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{ themeMode, colorScheme, colors, setThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
