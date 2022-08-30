import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'

const Room: NextPage = () => {

    const router = useRouter()
    const { roomId } = router.query

    return (
        <>
            <Typography variant='h5'>
                Hey, i&apos;m on Room page
            </Typography>
            <Typography variant='body1'>
                And the room id is: {roomId}
            </Typography>
        </>
    )
}

export default Room
