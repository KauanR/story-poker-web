import { Typography } from '@mui/material'
import { Actions } from '../../../../types/room/actions'
import { User } from '../../../../types/user'
import styles from './styles.module.scss'

type Props = {
    user: User | null
    stories: any[]
    updateSocket: (action: Actions) => void
}

const RoomStories = ({ user, stories, updateSocket }: Props) => {
    return (
        <>
            <Typography variant='h5'>
                Stories will be here
            </Typography>
            { user?.email
                ? (
                    <button onClick={() => updateSocket('stories')}>
                        Test update stories
                    </button>
                )
                : null
            }
        </>
    )
}

export default RoomStories