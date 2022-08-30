import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import DryCleaningIcon from '@mui/icons-material/DryCleaning'
import { Buttons, Spacer, temp_logoIcon, temp_logoText } from './styles'

const Header = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <DryCleaningIcon sx={temp_logoIcon}/>
                <Typography variant='h6' component='a' href='/' sx={temp_logoText}>
                    logo
                </Typography>

                <Spacer/>

                <Buttons>
                    <Button variant='text'>
                        Login
                    </Button>
                    <Button variant='outlined'>
                        Sign Up
                    </Button>
                </Buttons>
            </Toolbar>
        </AppBar>
    )
}

export default Header