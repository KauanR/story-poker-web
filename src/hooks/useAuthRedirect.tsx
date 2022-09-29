import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import UserContext from '../context/user'
import { useUser } from './useUser'

const publicRoutes = [
    '/',
    '/login',
    '/sign-up',
    '/join'
]

const useAuthRedirect = () => {
    const router = useRouter()
    const { user } = useContext(UserContext)

    useEffect(() => {
        const isAPublicRoute = publicRoutes.indexOf(router.route) !== -1

        if(!user && !isAPublicRoute) {
            router.push('/?redirect=' + encodeURI(window.location.pathname))
        } else if(user && isAPublicRoute) {
            const oldRoute = router.query.redirect
            router.push(typeof oldRoute === 'string' ? decodeURI(oldRoute) : '/dashboard')
        }
    }, [router, user])
}

export default useAuthRedirect