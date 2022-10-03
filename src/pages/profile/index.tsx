import React from 'react'
import type { NextPage } from 'next'
import Profile from '../../components/pages/profile'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import { useUser } from '../../hooks/useUser'
import { CircularProgress } from '@mui/material'

const ProfilePage: NextPage = () => {
    useAuthRedirect()

    const { user } = useUser()

    return user ? <Profile user={user} /> : <CircularProgress sx={{margin: 'auto'}}/>
}

export default ProfilePage
