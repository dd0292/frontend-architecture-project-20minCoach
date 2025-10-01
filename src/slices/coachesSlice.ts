import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Coach, Session, Review } from "../models/Coach";
import {
  hardCodedCoaches,
  hardCodedSessions,
  hardCodedReviews,
} from "../pocs/real-time-search/mockDataProvider";

interface CoachesState {
  coaches: Coach[];
  sessions: Session[];
  reviews: Review[];
  favorites: string[];
  searchResults: Coach[];
  isLoading: boolean;
}

const initialState: CoachesState = {
  coaches: hardCodedCoaches,
  sessions: hardCodedSessions,
  reviews: hardCodedReviews,
  favorites: ["1", "4"],
  searchResults: [],
  isLoading: false,
};

const coachesSlice = createSlice({
  name: "coaches",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Coach[]>) => {
      state.searchResults = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const coachId = action.payload;
      if (state.favorites.includes(coachId)) {
        state.favorites = state.favorites.filter((id) => id !== coachId);
      } else {
        state.favorites.push(coachId);
      }
    },
    addSession: (state, action: PayloadAction<Session>) => {
      state.sessions.push(action.payload);
    },
    updateSession: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Session> }>,
    ) => {
      const { id, updates } = action.payload;
      const sessionIndex = state.sessions.findIndex(
        (session) => session.id === id,
      );
      if (sessionIndex !== -1) {
        state.sessions[sessionIndex] = {
          ...state.sessions[sessionIndex],
          ...updates,
        };
      }
    },
  },
});

export const { setSearchResults, toggleFavorite, addSession, updateSession } =
  coachesSlice.actions;
export default coachesSlice.reducer;
