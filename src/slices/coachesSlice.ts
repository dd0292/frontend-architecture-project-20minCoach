import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Coach, Session, Review } from "../models/Coach"

interface CoachesState {
  coaches: Coach[]
  sessions: Session[]
  reviews: Review[]
  favorites: string[]
  searchResults: Coach[]
  isLoading: boolean
}

// Hard-coded coaches data
const hardCodedCoaches: Coach[] = [
  {
    id: "1",
    name: "Dr. Maria Rodriguez",
    title: "Clinical Psychologist",
    specialization: ["Anxiety", "Depression", "Relationships"],
    rating: 4.9,
    reviewCount: 156,
    tags: ["Psychology", "Mental Health", "Therapy"],
    profilePicture: require("../../assets/public//professional-woman-psychologist.png"),
    isAvailable: true,
    bio: "Licensed clinical psychologist with 10+ years of experience helping people overcome anxiety and depression.",
    experience: "10+ years",
    hourlyRate: 80,
    coverPhoto: require("../../assets/public//psychology-office-background.png"),
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    title: "Auto Mechanic Specialist",
    specialization: ["Engine Diagnostics", "BMW", "Mercedes"],
    rating: 4.8,
    reviewCount: 128,
    tags: ["Mechanics", "Automotive", "Diagnostics"],
    profilePicture: require("../../assets/public//professional-mechanic-man.jpg"),
    isAvailable: true,
    bio: "Expert automotive technician specializing in European cars with 15 years of experience.",
    experience: "15+ years",
    hourlyRate: 60,
    coverPhoto: require("../../assets/public//auto-repair-shop-background.jpg"),
  },
  {
    id: "3",
    name: "Ana Silva",
    title: "Senior Software Developer",
    specialization: ["React", "Node.js", "Python"],
    rating: 4.7,
    reviewCount: 89,
    tags: ["Programming", "Web Development", "JavaScript"],
    profilePicture: require("../../assets/public//professional-woman-developer.jpg"),
    isAvailable: false,
    bio: "Full-stack developer with expertise in modern web technologies and 8 years of industry experience.",
    experience: "8+ years",
    hourlyRate: 90,
    coverPhoto: require("../../assets/public//modern-office-coding-setup.jpg"),
  },
  {
    id: "4",
    name: "Roberto Santos",
    title: "Legal Advisor",
    specialization: ["Contract Law", "Business Law", "Real Estate"],
    rating: 4.9,
    reviewCount: 203,
    tags: ["Law", "Legal Advice", "Contracts"],
    profilePicture: require("../../assets/public//professional-lawyer-man.jpg"),
    isAvailable: true,
    bio: "Experienced lawyer specializing in business and contract law with 12 years of practice.",
    experience: "12+ years",
    hourlyRate: 120,
    coverPhoto: require("../../assets/public//law-office-background.jpeg"),
  },
  {
    id: "5",
    name: "Isabella Martinez",
    title: "Professional Artist",
    specialization: ["Watercolor", "Oil Painting", "Digital Art"],
    rating: 4.6,
    reviewCount: 67,
    tags: ["Arts", "Painting", "Creative"],
    profilePicture: require("../../assets/public//professional-woman-artist.jpg"),
    isAvailable: true,
    bio: "Professional artist and art instructor with expertise in traditional and digital mediums.",
    experience: "6+ years",
    hourlyRate: 45,
    coverPhoto: require("../../assets/public//art-studio-background.jpg"),
  },
  {
    id: "6",
    name: "Diego Fernandez",
    title: "Agricultural Engineer",
    specialization: ["Crop Management", "Soil Analysis", "Organic Farming"],
    rating: 4.8,
    reviewCount: 94,
    tags: ["Agriculture", "Farming", "Sustainability"],
    profilePicture: require("../../assets/public//professional-agricultural-engineer.jpg"),
    isAvailable: true,
    bio: "Agricultural engineer with specialization in sustainable farming practices and crop optimization.",
    experience: "9+ years",
    hourlyRate: 55,
    coverPhoto: require("../../assets/public//farm-field-background.jpg"),
  },
]

// Hard-coded sessions data
const hardCodedSessions: Session[] = [
  {
    id: "1",
    coachId: "1",
    userId: "user1",
    problem: "Dealing with work anxiety and stress management",
    tags: ["Psychology", "Anxiety", "Stress"],
    scheduledTime: "2024-01-15T10:00:00Z",
    status: "completed",
    rating: 5,
    review: "Dr. Rodriguez was incredibly helpful and provided practical strategies.",
  },
  {
    id: "2",
    coachId: "2",
    userId: "user1",
    problem: "Strange noise coming from car engine",
    tags: ["Mechanics", "Engine", "Diagnostics"],
    scheduledTime: "2024-01-20T14:30:00Z",
    status: "completed",
    rating: 4,
    review: "Carlos quickly identified the issue and explained the solution clearly.",
  },
  {
    id: "3",
    coachId: "4",
    userId: "user1",
    problem: "Need help reviewing a rental contract",
    tags: ["Law", "Contracts", "Real Estate"],
    scheduledTime: "2024-01-25T16:00:00Z",
    status: "upcoming",
  },
]

// Hard-coded reviews data
const hardCodedReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "John D.",
    rating: 5,
    comment: "Excellent advice and very professional approach. Highly recommended!",
    date: "2024-01-15",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah M.",
    rating: 4,
    comment: "Very knowledgeable and helped me solve my problem quickly.",
    date: "2024-01-10",
  },
]

const initialState: CoachesState = {
  coaches: hardCodedCoaches,
  sessions: hardCodedSessions,
  reviews: hardCodedReviews,
  favorites: ["1", "4"],
  searchResults: [],
  isLoading: false,
}

const coachesSlice = createSlice({
  name: "coaches",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Coach[]>) => {
      state.searchResults = action.payload
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const coachId = action.payload
      if (state.favorites.includes(coachId)) {
        state.favorites = state.favorites.filter((id) => id !== coachId)
      } else {
        state.favorites.push(coachId)
      }
    },
    addSession: (state, action: PayloadAction<Session>) => {
      state.sessions.push(action.payload)
    },
    updateSession: (state, action: PayloadAction<{ id: string; updates: Partial<Session> }>) => {
      const { id, updates } = action.payload
      const sessionIndex = state.sessions.findIndex((session) => session.id === id)
      if (sessionIndex !== -1) {
        state.sessions[sessionIndex] = { ...state.sessions[sessionIndex], ...updates }
      }
    },
  },
})

export const { setSearchResults, toggleFavorite, addSession, updateSession } = coachesSlice.actions
export default coachesSlice.reducer
