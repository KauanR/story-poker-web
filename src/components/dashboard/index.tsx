import React, { useState } from 'react'
import styles from './styles.module.scss'
import DashboardHead from './Head'
import DashboardTable from './Table'
import { Room } from './types/room'

const Dashboard = () => {

    const [rooms, setRooms] = useState<Room[]>([])

    const addRoom = (room: Room) => setRooms(rooms => [...rooms, room])

    const restartRoom = (index: number) => {
        console.log('num fiz ainda', index)
    }

    const editRoom = (index: number, room: Room) => {
        console.log('num fiz ainda', index, room)
    }

    const deleteRoom = (index: number) => {
        console.log('num fiz ainda', index)
    }

    return (
        <div className={styles.wrapper}>
            <DashboardHead
                addRoom={addRoom}
            />

            <DashboardTable 
                rooms={rooms}
                restartRoom={restartRoom}
                editRoom={editRoom}
                deleteRoom={deleteRoom}
            />
        </div>
    )
}

export default Dashboard
