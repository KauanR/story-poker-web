import { Theme } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { blue, pink } from '@mui/material/colors'

const customTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: blue,
        secondary: pink
    }
})

export default customTheme