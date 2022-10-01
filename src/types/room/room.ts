import Card from './card'

type RoomAttr = {
    id: string
    basePath: string
    name: string
    type: 'fibonacci' | 'relative' | 'sequential' | 'cards'
    cards: Card[]
}

export default RoomAttr