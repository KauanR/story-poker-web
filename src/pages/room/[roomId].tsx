import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import RoomContent from '../../modules/room'

const Room: NextPage = () => {

    const router = useRouter()
    const { roomId } = router.query

    return <RoomContent roomId={roomId} />
}

export default Room
