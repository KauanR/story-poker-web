import { Button, Typography } from '@mui/material'
import styles from './styles.module.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Room } from '../types/room'
import DashboardForm from '../Form'
import { useState } from 'react'
import { FormValues } from '../types/form-values'

type Props = {
    addRoom: (room: Room) => void
}

const DashboardHead = ({ addRoom }: Props) => {

    const [idCounter, setIdCounter] = useState<number>(1)
    const [dialogFlag, setDialogFlag] = useState<boolean>(false)

    const createRoom = (values: FormValues) => {
        console.log('createRoom', values)

        addRoom({
            id: idCounter.toString(),
            estimatesQty: 0,
            lastUsed: '',
            ...values,
        })

        setDialogFlag(false)
        setIdCounter(val => ++val)
    }

    return (
        <>
            <div className={styles.head}>
                <div className={styles.text}>
                    <Typography variant='h4'>
                        Your Rooms
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Select and enter into a room to invite your co-workers to estimate
                    </Typography>
                </div>
                <Button 
                    variant='contained' 
                    endIcon={<AddCircleIcon/>} 
                    onClick={() => setDialogFlag(true)}
                >
                    Create
                </Button>
            </div>

            <DashboardForm
                onClose={() => setDialogFlag(false)}
                onSubmit={createRoom}
                open={dialogFlag}
                title='Create a new Room'
                buttonText='Create'
            />
        </>
    )
}

export default DashboardHead