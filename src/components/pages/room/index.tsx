import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import env from '../../../constants/env'
import { Actions } from '../../../types/room/actions'
import { ActionsCount } from '../../../types/room/actions-count'
import RoomAttr from '../../../types/room/room'
import RoomChart from './Chart'
import RoomContainer, { RoomContainerData } from './Container'
import RoomInvite from './Invite'
import RoomParticipants from './Participants'
import RoomStatus from './Status'
import RoomStories from './Stories'
import styles from './styles.module.scss'
import RoomVoting from './Voting'

const Room = (roomAttr: RoomAttr) => {

    const { sendJsonMessage } = useWebSocket(`${env.hookUrl}/room/${roomAttr.id}`, {
        onOpen: () => console.log('[WEBHOOK] Opened'),
        onError: err => console.log('[WEBHOOK] Error: ', err),
        shouldReconnect: () => true,
        reconnectInterval: 3000,
        reconnectAttempts: 2,
        onMessage: messageEvent => {
            const { action } = JSON.parse(messageEvent.data)
            console.log(action)
            setCounts({
                participants: action === 'participants' ? ++counts.participants : counts.participants,
                stories: action === 'stories' ? ++counts.stories : counts.stories,
                queue: action === 'queue' ? ++counts.queue : counts.queue
            })
        },
        queryParams: {
            token: roomAttr.userData?.token as string
        }
    })

    const [counts, setCounts] = useState<ActionsCount>({
        participants: 0,
        stories: 0,
        queue: 0
    })

    const handleMessages = (action: Actions) => {
        sendJsonMessage({ action, roomId: roomAttr.id })
    }

    useEffect(() => {
        handleMessages('participants')
    }, [])

    return (
        <RoomContainer room={roomAttr} counts={counts}>
            {({ participants, stories, queue }: RoomContainerData) => (
                <div className={styles.wrap}>
                    <Typography className={styles.title} variant='h4' align='center'>
                        {roomAttr.name}
                    </Typography>

                    <div className={styles.main}>
                        { queue.status === 'waiting' || queue.status === 'active'
                            ? (
                                <RoomVoting 
                                    cards={roomAttr.cards} 
                                    queue={queue} 
                                    user={roomAttr.userData}
                                    updateSocket={handleMessages}
                                />
                            )
                            : (
                                <RoomChart queue={queue} />
                            )
                        }
                        
                        <RoomStories 
                            stories={stories}
                            user={roomAttr.userData}
                            roomId={roomAttr.id}
                            updateSocket={handleMessages}
                        />
                    </div>

                    <div className={styles.aside}>
                        <RoomStatus
                            user={roomAttr.userData}
                            cards={roomAttr.cards}
                            queue={queue}
                            updateSocket={handleMessages}
                            nextStory={stories.queue[0]}
                        />

                        <RoomParticipants
                            participants={participants}
                            queue={queue}
                            updateSocket={handleMessages}
                            user={roomAttr.userData}
                        />

                        <RoomInvite 
                            basePath={roomAttr.basePath} 
                            roomName={roomAttr.name}
                            roomId={roomAttr.id} 
                        />
                    </div>
                </div>
            )}
        </RoomContainer>
    )
}

export default Room