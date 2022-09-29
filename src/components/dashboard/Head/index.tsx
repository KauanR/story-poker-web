import { Button, Typography } from '@mui/material'
import styles from './styles.module.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Room } from '../types/room'
import DashboardForm from '../Form'
import { useEffect, useState } from 'react'
import { FormValues } from '../types/form-values'
import useApi from '../../../hooks/useApi'
import { Cards } from '../types/cards'
import { useSnackbar } from '../../../hooks/useSnackbar'

type Props = {
    cards: Cards
    refresh: () => void
}

const DashboardHead = ({ cards, refresh }: Props) => {

    const { createSnack } = useSnackbar()
    const { post } = useApi()

    const [dialogFlag, setDialogFlag] = useState<boolean>(false)

    const createRoom = (values: FormValues) => {
        const payload = {
            ...values,
            cards: cards[values.type]?.map(card => card.id)
        }

        post('/room', payload, true)
            .then(() => {
                refresh()
                createSnack('Room created successfully!', 'success')
                setDialogFlag(false)
            })
            .catch(err => {
                console.log(err)
                createSnack('Something wrong happened, please try again', 'error')
            })
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
                cards={cards}
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