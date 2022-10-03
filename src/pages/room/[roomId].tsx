import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Room from '../../components/pages/room'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import { CircularProgress } from '@mui/material'
import useApi from '../../hooks/useApi'
import RoomAttr from '../../types/room/room'
import { useUser } from '../../hooks/useUser'

const RoomPage: NextPage = () => {
    useAuthRedirect()

    const router = useRouter()
    const { roomId } = router.query
    const { get } = useApi()
    const { user } = useUser()

    const [roomData, setRoomData] = useState<RoomAttr | null>(null)

    useEffect(() => {
        if(typeof window !== 'undefined') {
            get('/room/' + roomId, true)
                .then(data => {
                    setRoomData({
                        id: data.id,
                        userData: user,
                        name: data.name,
                        type: data.type,
                        cards: data.roomCards.map((roomCard: any) => ({
                            id: roomCard.card.id,
                            votingId: roomCard.id,
                            value: roomCard.card.value
                        })),
                        basePath: window.location.host
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return roomData ? <Room {...roomData} /> : <CircularProgress sx={{margin: 'auto'}}/>
}

export default RoomPage
