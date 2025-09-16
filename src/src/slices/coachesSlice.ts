import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Coach } from "../models/Coach"

interface CoachesState {
  coaches: Coach[]
  filteredCoaches: Coach[]
  loading: boolean
  searchQuery: string
  selectedTags: string[]
}

// Mock data for coaches
const mockCoaches: Coach[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: ["Psychology", "Life Coaching"],
    bio: "Licensed psychologist with 10+ years of experience in cognitive behavioral therapy and personal development.",
    rating: 4.9,
    profilePicture: "/placeholder.svg?height=100&width=100&text=SJ",
    location: "New York, NY",
    isAvailable: true,
    experience: "10+ years",
    tags: ["psychology", "life-coaching"],
  },
  {
    id: "2",
    name: "Mike Chen",
    specialization: ["Programming", "Cloud Services"],
    bio: "Senior software engineer specializing in cloud architecture and full-stack development.",
    rating: 4.8,
    profilePicture: "/placeholder.svg?height=100&width=100&text=MC",
    location: "San Francisco, CA",
    isAvailable: true,
    experience: "8 years",
    tags: ["programming", "cloud", "tech"],
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    specialization: ["Arts", "Creative Writing"],
    bio: "Published author and creative writing instructor with expertise in storytelling and artistic expression.",
    rating: 4.7,
    profilePicture: "/placeholder.svg?height=100&width=100&text=ER",
    location: "Austin, TX",
    isAvailable: false,
    experience: "6 years",
    tags: ["arts", "writing", "creativity"],
  },
  {
    id: "4",
    name: "James Wilson",
    specialization: ["Mechanics", "Engineering"],
    bio: "Mechanical engineer with extensive experience in automotive repair and industrial machinery.",
    rating: 4.6,
    profilePicture: "/placeholder.svg?height=100&width=100&text=JW",
    location: "Detroit, MI",
    isAvailable: true,
    experience: "12 years",
    tags: ["mechanics", "engineering", "automotive"],
  },
  {
    id: "5",
    name: "Dr. Maria Santos",
    specialization: ["Health", "Nutrition"],
    bio: "Registered dietitian and wellness coach helping clients achieve optimal health through personalized nutrition plans.",
    rating: 4.8,
    profilePicture: "/placeholder.svg?height=100&width=100&text=MS",
    location: "Miami, FL",
    isAvailable: true,
    experience: "7 years",
    tags: ["health", "fitness", "nutrition"],
  },
  {
    id: "6",
    name: "Robert Kim",
    specialization: ["Business", "Finance"],
    bio: "Former investment banker turned business consultant, specializing in startup strategy and financial planning.",
    rating: 4.9,
    profilePicture: "/placeholder.svg?height=100&width=100&text=RK",
    location: "Chicago, IL",
    isAvailable: true,
    experience: "15+ years",
    tags: ["business", "finance", "entrepreneurship"],
  },
  {
    id: "7",
    name: "Lisa Thompson",
    specialization: ["Law", "Legal Consulting"],
    bio: "Corporate lawyer with expertise in contract law, intellectual property, and small business legal matters.",
    rating: 4.7,
    profilePicture: "/placeholder.svg?height=100&width=100&text=LT",
    location: "Boston, MA",
    isAvailable: false,
    experience: "9 years",
    tags: ["law", "legal", "contracts"],
  },
  {
    id: "8",
    name: "Carlos Mendez",
    specialization: ["Agriculture", "Sustainable Farming"],
    bio: "Agricultural engineer and sustainable farming expert helping farmers optimize crop yields and implement eco-friendly practices.",
    rating: 4.6,
    profilePicture: "/placeholder.svg?height=100&width=100&text=CM",
    location: "Sacramento, CA",
    isAvailable: true,
    experience: "11 years",
    tags: ["agriculture", "sustainability", "farming"],
  },
  {
    id: "9",
    name: "Dr. Jennifer Lee",
    specialization: ["Psychology", "Therapy"],
    bio: "Clinical psychologist specializing in anxiety disorders, depression, and relationship counseling using evidence-based approaches.",
    rating: 4.9,
    profilePicture: "/placeholder.svg?height=100&width=100&text=JL",
    location: "Seattle, WA",
    isAvailable: true,
    experience: "13 years",
    tags: ["psychology", "therapy", "mental-health"],
  },
  {
    id: "10",
    name: "Alex Turner",
    specialization: ["Programming", "Web Development"],
    bio: "Full-stack developer and coding instructor with expertise in React, Node.js, and modern web technologies.",
    rating: 4.8,
    profilePicture: "/placeholder.svg?height=100&width=100&text=AT",
    location: "Portland, OR",
    isAvailable: true,
    experience: "6 years",
    tags: ["programming", "web-development", "react"],
  },
]

const initialState: CoachesState = {
  coaches: mockCoaches,
  filteredCoaches: mockCoaches,
  loading: false,
  searchQuery: "",
  selectedTags: [],
}

const coachesSlice = createSlice({
  name: "coaches",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.filteredCoaches = filterCoaches(state.coaches, action.payload, state.selectedTags)
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload
      state.filteredCoaches = filterCoaches(state.coaches, state.searchQuery, action.payload)
    },
    clearFilters: (state) => {
      state.searchQuery = ""
      state.selectedTags = []
      state.filteredCoaches = state.coaches
    },
  },
})

function filterCoaches(coaches: Coach[], query: string, tags: string[]): Coach[] {
  return coaches.filter((coach) => {
    const matchesQuery =
      query === "" ||
      coach.name.toLowerCase().includes(query.toLowerCase()) ||
      coach.specialization.some((spec) => spec.toLowerCase().includes(query.toLowerCase())) ||
      coach.bio.toLowerCase().includes(query.toLowerCase())

    const matchesTags = tags.length === 0 || tags.some((tag) => coach.tags.includes(tag))

    return matchesQuery || matchesTags
  })
}

export const { setSearchQuery, setSelectedTags, clearFilters } = coachesSlice.actions
export default coachesSlice.reducer
