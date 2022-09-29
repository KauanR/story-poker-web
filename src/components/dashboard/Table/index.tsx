import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Cards } from '../types/cards'
import { Room } from '../types/room'
import DashboardItem from './Item'

type Props = {
    rooms: Room[]
    cards: Cards
    refresh: () => void
}

const DashboardTable = ({ rooms, cards, refresh }: Props) => {
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
                        { rooms.map((room, index) => (
                            <DashboardItem 
                                key={room.id} 
                                room={room}
                                index={index}
                                cards={cards}
                                refresh={refresh}
                            />
                        )) }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default DashboardTable