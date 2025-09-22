// src/models/navigation.ts
import { Coach } from './Coach';

export type RootStackParamList = {
  CoachDetail: { coach: Coach };
  Home: undefined;
  Login: undefined;
  Search: undefined;
  Results: undefined;
  // Add other screens as needed
};

export type StackNavigation = keyof RootStackParamList;