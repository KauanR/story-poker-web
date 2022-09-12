import React, { useState } from 'react'
import styles from './styles.module.scss'
import DashboardHead from './Head'
import { Room } from './types/room'
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import DashboardItem from './Item'

const Dashboard = () => {

    const [rooms, setRooms] = useState<Room[]>([])

    const addRoom = (room: Room) => setRooms(rooms => [...rooms, room])

    const editRoom = (room: Room, index: number) => {
        console.log(room)
        const updatedRooms = [...rooms]
        updatedRooms[index] = room

        setRooms(updatedRooms)
    }

    const deleteRoom = (index: number) => {
        const updatedRooms = rooms.filter((_, i) => i !== index)
        setRooms(updatedRooms)
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
