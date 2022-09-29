import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Room from '../../components/pages/room'
import useAuthRedirect from '../../hooks/useAuthRedirect'

const RoomPage: NextPage = () => {
    useAuthRedirect()

    const router = useRouter()
    const { roomId } = router.query

    return <Room roomId={roomId} />
}

export default RoomPage
