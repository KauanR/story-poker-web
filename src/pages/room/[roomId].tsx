import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Room from '../../components/pages/room'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import { CircularProgress } from '@mui/material'

const RoomPage: NextPage = () => {
    useAuthRedirect()

    const router = useRouter()
    const { roomId } = router.query

    const [definedWindow, setDefinedWindow] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined')
            setDefinedWindow(true)
    }, [])

    return definedWindow 
        ?  <Room roomId={roomId} basePath={window.location.host}/>
        : <CircularProgress/>
}

export default RoomPage
