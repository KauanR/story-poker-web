import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import DashboardHead from './Head'
import { Room } from './types/room'
import { useSnackbar } from '../../hooks/useSnackbar'
import useApi from '../../hooks/useApi'
import { Cards } from './types/cards'
import DashboardTable from './Table'

const Dashboard = () => {

    const { get } = useApi()
    const { createSnack } = useSnackbar()

    const [ cards, setCards ] = useState<Cards>({})

    const [rooms, setRooms] = useState<Room[]>([])

    const loadRooms = () => {
        get('/room', true)
            .then(rooms => {
                setRooms(rooms)
            })
            .catch(err => {
                createSnack('Something wrong happened, please try again', 'error')
                setRooms([])
                console.log(err)
            })
    }

    useEffect(() => {
        loadRooms()
    }, [])

    useEffect(() => {
        get('/cards', true)
            .then(cards => setCards(cards))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={styles.wrapper}>
            <DashboardHead 
                cards={cards}
                refresh={loadRooms}
            />

            <DashboardTable
                cards={cards}
                rooms={rooms}
                refresh={loadRooms}
            />
        </div>
    )
}

export default Dashboard
