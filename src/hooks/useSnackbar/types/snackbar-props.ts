import { AlertColor } from '@mui/material'

export type SnackbarProps = {
    message: string
    type: AlertColor
    open: boolean
    onClose?: () => void
}