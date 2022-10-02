import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import env from '../../../constants/env'
import { Actions } from '../../../types/room/actions'
import { ActionsCount } from '../../../types/room/actions-count'
import RoomAttr from '../../../types/room/room'
import RoomActions from './Actions'
import RoomContainer, { RoomContainerData } from './Container'
import RoomInvite from './Invite'
import RoomParticipants from './Participants'
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
            setCounts({
                participants: action === 'participants' ? ++counts.participants : counts.participants,
                stories: action === 'stories' ? ++counts.stories : counts.stories,
                voting: action === 'voting' ? ++counts.voting : counts.voting
            })
        },
        queryParams: {
            token: roomAttr.userData?.token as string
        }
    })

    const [counts, setCounts] = useState<ActionsCount>({
        participants: 0,
        stories: 0,
        voting: 0
    })

    const handleMessages = (action: Actions) => {
        sendJsonMessage({ action, roomId: roomAttr.id })
    }

    useEffect(() => {
        handleMessages('participants')
    }, [])

    return (
        <RoomContainer room={roomAttr} counts={counts}>
            {({ participants, stories, voting }: RoomContainerData) => (
                <div className={styles.wrap}>
                    <Typography className={styles.title} variant='h4' align='center'>
                        {roomAttr.name}
                    </Typography>

                    <div className={styles.main}>
                        <RoomVoting 
                            cards={roomAttr.cards} 
                            voting={voting} 
                            user={roomAttr.userData}
                            updateSocket={handleMessages}
                        />
                        <RoomStories 
                            stories={stories}
                            user={roomAttr.userData}
                            roomId={roomAttr.id}
                            updateSocket={handleMessages}
                        />
                    </div>

                    <div className={styles.aside}>
                        <RoomParticipants
                            participants={participants}
                            updateSocket={handleMessages}
                            user={roomAttr.userData}
                        />

                        <RoomActions/>

                        <RoomInvite 
                            basePath={roomAttr.basePath} 
                            roomId={roomAttr.id} 
                        />
                    </div>
                </div>
            )}
        </RoomContainer>
    )
}

export default Room