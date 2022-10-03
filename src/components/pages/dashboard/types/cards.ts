export type Cards = {
    cards?: Card[]
    fibonacci?: Card[]
    relative?: Card[]
    sequential?: Card[]
}

export type Card = {
    id: number
    value: string
    type?: string
}