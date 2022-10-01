import { Typography } from '@mui/material'
import RoomAttr from '../../../types/room/room'
import RoomInvite from './Invite'
import RoomParticipants from './Participants'
import RoomStories from './Stories'
import styles from './styles.module.scss'
import RoomVoting from './Voting'

const Room = (room: RoomAttr) => {

    return (
        <div className={styles.wrap}>
            <Typography className={styles.title} variant='h4' align='center'>
                { room.name }
            </Typography>

            <div className={styles.main}>
                <RoomVoting cards={room.cards}/>
                <RoomStories/>
            </div>

            <div className={styles.aside}>
                <RoomParticipants roomId={room.id}/>
                <RoomInvite basePath={room.basePath} roomId={room.id}/>
            </div>
        </div>
    )
}

export default Room