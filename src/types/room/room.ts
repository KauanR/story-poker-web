import { User } from '../user'
import Card from './card'

type RoomAttr = {
    id: string
    userData: User | null
    basePath: string
    name: string
    type: 'fibonacci' | 'relative' | 'sequential' | 'cards'
    cards: Card[]
}

export default RoomAttr