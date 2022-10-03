import { Typography } from '@mui/material'

type Props = {
    dumbProp?: string
}

const RoomChart = ({ dumbProp }: Props) => {
    return (
        <Typography variant='h5'>
            Room Chart
        </Typography>
    )
}

export default RoomChart