import React from 'react'
import type { NextPage } from 'next'
import Login from '../../components/pages/login'
import useAuthRedirect from '../../hooks/useAuthRedirect'

const LoginPage: NextPage = () => {
    useAuthRedirect()

    return <Login/>
}

export default LoginPage
