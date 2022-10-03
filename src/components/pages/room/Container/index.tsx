import { useEffect, useState } from 'react'
import useApi from '../../../../hooks/useApi'
import { ActionsCount } from '../../../../types/room/actions-count'
import { Participant } from '../../../../types/room/participant'
import { QueueCtrl } from '../../../../types/room/queue-ctrl'
import RoomAttr from '../../../../types/room/room'
import { StoryCtrl } from '../../../../types/room/story'

export type RoomContainerProps = {
    room: RoomAttr
    children: any
    counts: ActionsCount
}

export type RoomContainerData = {
    participants: Participant[]
    stories: StoryCtrl
    queue: QueueCtrl
}

const RoomContainer = ({ room, children, counts }: RoomContainerProps) => {

    const { get } = useApi()

    const [participants, setParticipants] = useState<Participant[]>([])

    useEffect(() => {
        get('/participant/' + room.id, true)
            .then(data => setParticipants(data))
            .catch(err => console.log(err))
    }, [counts.participants])



    const [stories, setStories] = useState<StoryCtrl>({
        queue: [],
        completed: []
    })

    useEffect(() => {
        get('/story/' + room.id, true)
            .then(data => {
                setStories(data)
            })
            .catch(err => console.log(err))
    }, [counts.stories])



    const [queue, setQueue] = useState<QueueCtrl>({ status: 'waiting' })
    
    useEffect(() => {
        get(`/story/${room.id}?status=active`, true)
            .then(data => {
                let status: 'waiting' | 'active' | 'completed'

                if(data.length === 0)
                    status = 'waiting'
                else
                    status = data[0].estimation === 'WAITING_CONFIRMATION' ? 'completed' : 'active'

                setQueue({
                    status,
                    story: data[0] || null
                })
                console.log(queue)
            })
            .catch(err => console.log(err))
    }, [counts.queue])

    return (
        <>
            {
                children({
                    participants,
                    stories,
                    queue
                } as RoomContainerData)
            }
        </>
    )
}

export default RoomContainer