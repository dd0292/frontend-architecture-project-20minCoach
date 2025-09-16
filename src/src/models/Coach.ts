export interface Coach {
  id: string
  name: string
  specialization: string[]
  bio: string
  rating: number
  profilePicture: string
  location: string
  isAvailable: boolean
  experience: string
  tags: string[]
}

export class CoachModel implements Coach {
  id: string
  name: string
  specialization: string[]
  bio: string
  rating: number
  profilePicture: string
  location: string
  isAvailable: boolean
  experience: string
  tags: string[]

  constructor(data: Coach) {
    this.id = data.id
    this.name = data.name
    this.specialization = data.specialization
    this.bio = data.bio
    this.rating = data.rating
    this.profilePicture = data.profilePicture
    this.location = data.location
    this.isAvailable = data.isAvailable
    this.experience = data.experience
    this.tags = data.tags
  }

  hasTag(tag: string): boolean {
    return this.tags.includes(tag)
  }

  matchesSpecialization(specialization: string): boolean {
    return this.specialization.some((spec) => spec.toLowerCase().includes(specialization.toLowerCase()))
  }
}
