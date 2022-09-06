import { RoomTypes } from './room-types'

export type Room = {
    id: string
    name: string
    type: RoomTypes
    lastUsed: string
    estimatesQty: number
}
