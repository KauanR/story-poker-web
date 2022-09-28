import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import UserContext from '../context/user'

const publicRoutes = [
    '/',
    '/login',
    '/sign-up'
]

const useAuthRedirect = () => {
    const router = useRouter()
    const { user } = useContext(UserContext)

    useEffect(() => {
        const isAPublicRoute = publicRoutes.indexOf(router.route) !== -1

        if(!user && !isAPublicRoute) {
            router.push('/')
        } else if(user && isAPublicRoute) {
            router.push('/dashboard')
        }
    }, [user, router])
}

export default useAuthRedirect