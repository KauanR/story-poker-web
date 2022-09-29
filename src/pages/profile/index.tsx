import React from 'react'
import type { NextPage } from 'next'
import Profile from '../../components/pages/profile'
import useAuthRedirect from '../../hooks/useAuthRedirect'

const ProfilePage: NextPage = () => {
    useAuthRedirect()

    return <Profile />
}

export default ProfilePage
