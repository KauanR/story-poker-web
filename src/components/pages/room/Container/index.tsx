import { useEffect, useState } from 'react'
import useApi from '../../../../hooks/useApi'
import { ActionsCount } from '../../../../types/room/actions-count'
import { Participant } from '../../../../types/room/participant'
import RoomAttr from '../../../../types/room/room'

export type RoomContainerProps = {
    room: RoomAttr
    children: any
    counts: ActionsCount
}

export type RoomContainerData = {
    participants: Participant[]
    stories: any[]
    voting: any
}

const RoomContainer = ({ room, children, counts }: RoomContainerProps) => {

    const { get } = useApi()

    const [participants, setParticipants] = useState<Participant[]>([])
    useEffect(() => {
        get('/participant/' + room.id, true)
            .then(data => setParticipants(data))
            .catch(err => console.log(err))
    }, [counts.participants])

    const [stories, setStories] = useState([])
    useEffect(() => {
        console.log('reloading stories')
    }, [counts.stories])

    const [voting, setVoting] = useState({})
    useEffect(() => {
        console.log('reloading voting')
    }, [counts.voting])

    return (
        <>
            {
                children({
                    participants,
                    stories,
                    voting
                } as RoomContainerData)
            }
        </>
    )
}

export default RoomContainer