import { useContext } from 'react'
import { SnackbarContext } from './snackbar-provider'
import { SnackbarContextType } from './types/snackbar-context-type'

export function useSnackbar(): SnackbarContextType {
    return useContext(SnackbarContext)
}