import { Card, CardContent, Typography } from '@mui/material'
import styles from './styles.module.scss'

const RoomParticipants = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h5'>
                    Room participants
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RoomParticipants