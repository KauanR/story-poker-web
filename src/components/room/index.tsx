import { Typography } from '@mui/material'

type Props = {
    roomId: string | string[] | undefined
}

const Room = ({ roomId }: Props) => {
    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography variant='h5'>
            Hey, i&apos;m on Room page
            </Typography>
            <Typography variant='body1'>
            And the room id is: {roomId}
            </Typography>
        </div>
    )
}

export default Room