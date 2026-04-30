export interface Topic {
  id: string
  title: string
  description: string
  examples: string[]
  videoId: string
  tags: string[]
  emoji: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  commentCount: number
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userPhoto: string | null
  text: string
  createdAt: Date
  topicId: string
}
