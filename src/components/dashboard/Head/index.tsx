import { Button, Typography } from '@mui/material'
import styles from './styles.module.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Room } from '../types/room'
import { RoomTypes } from '../types/room-types'

type Props = {
    addRoom: (room: Room) => void
}

const DashboardHead = ({ addRoom }: Props) => {

    const fakeRoomsHandler = () => {
        const helper = (id: string, name: string, type: RoomTypes, lastUsed: string, estimatesQty: number) => ({
            id,
            name,
            type,
            lastUsed,
            estimatesQty,
        })

        addRoom(helper('1', 'Sala 1', 'fibonacci', '06/09/2022', 12))
        addRoom(helper('2', 'Desce a Letra Show', 'cards', '01/03/2022', 34))
        addRoom(helper('3', 'NerdCast', 'relative', '21/05/2020', 3))
        addRoom(helper('4', 'Pod Pah', 'fibonacci', '15/01/2021', 28))
        addRoom(helper('5', 'Matando Robôs Gigantes', 'sequential', 'wqeqw', 1))
    }

    return (
        <div className={styles.head}>
            <div className={styles.text}>
                <Typography variant='h4'>
                    Your Rooms
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Select and enter into a room to invite your co-workers to estimate
                </Typography>
            </div>
            <Button variant='contained' endIcon={<AddCircleIcon/>} onClick={fakeRoomsHandler}>
                Create
            </Button>
        </div>
    )
}

export default DashboardHead