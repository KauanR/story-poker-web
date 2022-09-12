import { Alert, AlertColor, Snackbar, Typography } from '@mui/material'
import React, { createContext, ReactNode, useState } from 'react'
import { SnackbarContextType } from './types/snackbar-context-type'
import { SnackbarProps } from './types/snackbar-props'

export const SnackbarContext = createContext<SnackbarContextType>({
    createSnack: (message: string, type: AlertColor) => {},
    handleClose: () => {}
})

type Props = {
    children: ReactNode
}

export const SnackbarProvider = ({ children }: Props) => {
    const [ snack, setSnack ] = useState<SnackbarProps | null>(null)

    const createSnack = (message: string, type: AlertColor) => setSnack({ message, type, open: true })

    const handleClose = () => setSnack(null)

    return (
        <SnackbarContext.Provider value={{createSnack, handleClose}}>
            { snack && (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={snack.open}
                    onClose={handleClose}
                    autoHideDuration={6000}
                >
                    <Alert 
                        severity={snack.type} 
                        variant="filled"
                    >
                        <Typography variant='body2'>
                            { snack.message }
                        </Typography>
                    </Alert>
                </Snackbar>
            )}
            { children }
        </SnackbarContext.Provider>
    )
}