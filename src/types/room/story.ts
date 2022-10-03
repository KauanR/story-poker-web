import { StoryParticipant } from './story-participant'

export type Story = {
    id: number
    title: string
    room_id: string
    status: 'queue' | 'active' | 'completed'
    duration_time: string
    estimation: string
    storyParticipants: StoryParticipant[]
}

export type StoryCtrl = {
    completed: Story[]
    queue: Story[]
}