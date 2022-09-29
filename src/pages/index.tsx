import React from 'react'
import type { NextPage } from 'next'
import useAuthRedirect from '../hooks/useAuthRedirect'

const Home: NextPage = () => {
    useAuthRedirect()

    return (
        <div>Home</div>
    )
}

export default Home
