import { Card, CardContent, Divider, List, ListItem, Menu, MenuItem, Typography } from '@mui/material'
import { Fragment, MouseEvent, useEffect, useState } from 'react'
import useApi from '../../../../hooks/useApi'
import { useSnackbar } from '../../../../hooks/useSnackbar'
import { Actions } from '../../../../types/room/actions'
import { Participant } from '../../../../types/room/participant'
import { User } from '../../../../types/user'
import styles from './styles.module.scss'

type Props = {
    participants: Participant[]
    updateSocket: (action: Actions) => void
    user: User | null
}

const RoomParticipants = ({ participants, updateSocket, user }: Props) => {

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
                    Room participants
                </Typography>
                <List className={styles.participants}>
                    { participants && participants.length > 0 && participants.map((p, index) => (
                        <Fragment key={p.id}>
                            <ListItem className={styles.participant}>
                                <Typography variant='body1' {...user?.email && { onClick: openMenu }}>
                                    { p.nickname }
                                </Typography>
                                <Typography variant='h6'>
                                    {'<aqui vem o voto>'}
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