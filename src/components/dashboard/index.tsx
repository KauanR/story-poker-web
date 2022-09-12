import React, { useState } from 'react'
import styles from './styles.module.scss'
import DashboardHead from './Head'
import { Room } from './types/room'
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import DashboardItem from './Item'
import { useSnackbar } from '../../hooks/useSnackbar'

const Dashboard = () => {

    const { createSnack } = useSnackbar()

    const [rooms, setRooms] = useState<Room[]>([])

    const addRoom = (room: Room) => {
        setRooms(rooms => [...rooms, room])
        createSnack('Room added successfully!', 'success')
    }

    const editRoom = (room: Room, index: number) => {
        const updatedRooms = [...rooms]
        updatedRooms[index] = room
        setRooms(updatedRooms)

        createSnack('Room updated successfully!', 'success')
    }

    const deleteRoom = (index: number) => {
        const updatedRooms = rooms.filter((_, i) => i !== index)
        setRooms(updatedRooms)

        createSnack('Room deleted successfully!', 'success')
    }

    return (
        <div className={styles.wrapper}>
            <DashboardHead
                addRoom={addRoom}
            />

            <Card sx={{width: '100%', overflow: 'inherit'}}>
                <CardContent>
                    <Table>
                        <colgroup>
                            <col style={{width: '25%'}} />
                            <col style={{width: '20%'}} />
                            <col style={{width: '20%'}} />
                            <col style={{width: '20%'}} />
                            <col style={{width: '15%'}} />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell align='center'>
                                    Type
                                </TableCell>
                                <TableCell align='center'>
                                    Estimates Qty.
                                </TableCell>
                                <TableCell align='center'>
                                    Last Used
                                </TableCell>
                                <TableCell align='right'>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            { rooms.map((room, index) => (
                                <DashboardItem 
                                    key={room.id} 
                                    room={room}
                                    index={index}
                                    editRoom={editRoom}
                                    deleteRoom={deleteRoom}
                                />
                            )) }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard
