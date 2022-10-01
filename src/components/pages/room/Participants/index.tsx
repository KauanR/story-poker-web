import { Card, CardContent, Typography } from '@mui/material'
import { useEffect } from 'react'
import useApi from '../../../../hooks/useApi'

type Props = {
    roomId: string
}

const RoomParticipants = ({ roomId }: Props) => {
    const { get } = useApi()

    useEffect(() => {
        get('/participant/' + roomId, true)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

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