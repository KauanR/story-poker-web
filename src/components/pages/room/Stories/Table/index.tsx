import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Story } from '../../../../../types/room/story'

type Props = {
    stories: Story[]
}

const RoomStoriesTable = ({ stories }: Props) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Title
                    </TableCell>
                    <TableCell align='center'>
                        Status
                    </TableCell>
                    <TableCell align='center'>
                        Estimation
                    </TableCell>
                </TableRow>
            </TableHead>
    
            <TableBody>
                { stories && stories.length > 0 && stories.map(story => (
                    <TableRow key={story.id}>
                        <TableCell>
                            { story.title }
                        </TableCell>
                        <TableCell align='center'>
                            { story.status }
                        </TableCell>
                        <TableCell align='center'>
                            { story.estimation || '...' }
                        </TableCell>
                    </TableRow>
                )) }
            </TableBody>
        </Table>
    )
}

export default RoomStoriesTable