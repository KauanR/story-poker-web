import { Card, CardContent, Divider, List, ListItem, Menu, MenuItem, Typography } from '@mui/material'
import { Fragment, MouseEvent, useState } from 'react'
import useApi from '../../../../hooks/useApi'
import { useSnackbar } from '../../../../hooks/useSnackbar'
import { Actions } from '../../../../types/room/actions'
import { Participant } from '../../../../types/room/participant'
import { QueueCtrl } from '../../../../types/room/queue-ctrl'
import { User } from '../../../../types/user'
import styles from './styles.module.scss'

type Props = {
    participants: Participant[]
    queue: QueueCtrl
    updateSocket: (action: Actions) => void
    user: User | null
}

const RoomParticipants = ({ participants, queue, updateSocket, user }: Props) => {

    const userType = user?.email ? 'owner' : 'participant'

    const votes = (() => {
        if(queue?.story)
            return queue.story.storyParticipants.reduce((acc, cur) => {
                acc[cur.participant.id] = (cur as any).roomCard.card.value
                return acc
            }, {} as any)
        else
            return {}
    })()

    const { createSnack } = useSnackbar()

    const { del } = useApi()

    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    const openMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget)
    const closeMenu = () => setAnchor(null)

    const kickParticipant = (id: number) => {
        del('/participant/' + id, true)
            .then(() => {
                createSnack('Participant kicked successfully', 'success')
                updateSocket('participants')
                closeMenu()
            })
            .catch(err => console.log(err))
    }

    return (
        <Card>
            <CardContent>
                <Typography variant='h5'>
                    Participants
                </Typography>
                <List className={styles.participants}>
                    { participants && participants.length > 0 && participants.map((p, index) => (
                        <Fragment key={p.id}>
                            <ListItem className={styles.participant}>
                                <Typography variant='body1' {...(userType === 'owner') && { onClick: openMenu }}>
                                    { p.nickname }
                                </Typography>
                                <Typography variant='h6'>
                                    { (userType === 'owner' || queue.status === 'completed') 
                                        ? (votes[p.id] || '...')
                                        : '...'
                                    }
                                </Typography>
                            </ListItem>
                            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}>
                                <MenuItem onClick={() => kickParticipant(p.id)}>
                                    Kick participant
                                </MenuItem>
                            </Menu>
                            { index !== participants.length -1 && <Divider variant='middle'/> }
                        </Fragment>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}

export default RoomParticipants