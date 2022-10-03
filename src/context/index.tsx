import { ReactNode } from 'react'
import { SnackbarProvider } from './snackbar'
import { UserProvider } from './user'

type GlobalContextProps = {
    children: ReactNode
}

const GlobalContext = ({ children }: GlobalContextProps) => {
    return (
        <UserProvider>
            <SnackbarProvider>
                { children }
            </SnackbarProvider>
        </UserProvider>
    )
}

export default GlobalContext