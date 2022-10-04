import Card from './card'
import { Participant } from './participant'

export type StoryParticipant = {
    id: string
    participant: Participant
    roomCard: {
        card: Card
    }
}