import { AlertColor } from '@mui/material'

export type SnackbarContextType = {
    createSnack: (message: string, type: AlertColor) => void
    handleClose: () => void
}
