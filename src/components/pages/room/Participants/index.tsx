import { Card, CardContent, Divider, List, ListItem, Menu, MenuItem, Typography } from '@mui/material'
import { Fragment, MouseEvent, useEffect, useState } from 'react'
import useApi from '../../../../hooks/useApi'
import { useSnackbar } from '../../../../hooks/useSnackbar'
import { Participant } from '../../../../types/room/participant'
import { User } from '../../../../types/user'
import styles from './styles.module.scss'

type Props = {
    user: User | null
    roomId: string
}

const RoomParticipants = ({ user, roomId }: Props) => {

    const { createSnack } = useSnackbar()

    const { get, del } = useApi()

    const [participants, setParticipants] = useState<Participant[]>([])

    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    const openMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget)
    const closeMenu = () => setAnchor(null)

    const loadParticipants = () => {
        get('/participant/' + roomId, true)
            .then(data => setParticipants(data))
            .catch(err => console.log(err))
    }

    const kickParticipant = (id: number) => {
        del('/participant/' + id, true)
            .then(() => {
                createSnack('Participant kicked successfully', 'success')
                loadParticipants()
                closeMenu()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadParticipants()
    }, [])

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