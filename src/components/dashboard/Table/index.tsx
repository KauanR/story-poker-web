import { Card, CardContent, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import { Room } from '../types/room'
import styles from './styles.module.scss'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'

type Props = {
    rooms: Room[]
    restartRoom: (index: number) => void
    editRoom: (index: number, room: Room) => void
    deleteRoom: (index: number) => void
}

const DashboardTable = ({ rooms }: Props) => {

    const router = useRouter()

    console.log(rooms)

    return (
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
                        { rooms.map(room => (
                            <TableRow 
                                key={room.id} 
                                onClick={() => router.push(`/room/${room.id}`)}
                                sx={{ 
                                    '&:last-child td, &:last-child th': { 
                                        border: 0 
                                    },
                                    '&:hover': {
                                        cursor: 'pointer',
                                        background: 'rgba(255, 255, 255, 0.05)'
                                    }
                                }}
                            >
                                <TableCell>
                                    { room.name }
                                </TableCell>
                                <TableCell align='center'>
                                    { room.type }
                                </TableCell>
                                <TableCell align='center'>
                                    { room.lastUsed }
                                </TableCell>
                                <TableCell align='center'>
                                    { room.estimatesQty }
                                </TableCell>
                                <TableCell align='right'>
                                    <div className={styles.actions}>
                                        <Tooltip title='Restart'>
                                            <IconButton>
                                                <RestartAltIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Edit'>
                                            <IconButton>
                                                <EditIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Delete'>
                                            <IconButton>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default DashboardTable