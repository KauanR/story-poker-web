import React from 'react'
import type { NextPage } from 'next'
import Dashboard from '../../components/pages/dashboard'
import useAuthRedirect from '../../hooks/useAuthRedirect'

const DashboardPage: NextPage = () => {
    useAuthRedirect()

    return <Dashboard />
}

export default DashboardPage
