import { createContext, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { User } from '../types/user'

type UserContextType = {
    user: User | null,
    setUser: (user: SetStateAction<User | null>) => void
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
})

type UserProviderProps = {
    children: ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
    const[user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const user = sessionStorage.getItem('user')
        if(user !== null)
            setUser(JSON.parse(user))
    }, [])

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <UserContext.Provider value={{user, setUser}}>
            { children }
        </UserContext.Provider>
    )
}

export { UserProvider }
export default UserContext