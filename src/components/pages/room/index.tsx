import { Typography } from '@mui/material'
import RoomInvite from './Invite'
import RoomParticipants from './Participants'
import RoomStories from './Stories'
import styles from './styles.module.scss'
import RoomVoting from './Voting'

type Props = {
    roomId: string | string[] | undefined
    basePath: string | string[] | undefined
}

const Room = ({ roomId, basePath }: Props) => {
    return (
        <div className={styles.wrap}>
            <Typography className={styles.title} variant='h3' align='center'>
                Title will be here
            </Typography>

            <div className={styles.main}>
                <RoomVoting/>
                <RoomStories/>
            </div>

            <div className={styles.aside}>
                <RoomParticipants/>
                <RoomInvite basePath={basePath} roomId={roomId}/>
            </div>
        </div>
    )
}

export default Room