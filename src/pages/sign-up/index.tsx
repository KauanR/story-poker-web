import React from 'react'
import type { NextPage } from 'next'
import SignUp from '../../components/sign-up'
import useAuthRedirect from '../../hooks/useAuthRedirect'

const SignUpPage: NextPage = () => {
    useAuthRedirect()
    
    return <SignUp/>
}

export default SignUpPage
