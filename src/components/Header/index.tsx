import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import DryCleaningIcon from '@mui/icons-material/DryCleaning'
import { Buttons, Spacer, temp_logoIcon, temp_logoText } from './styles'
import Link from 'next/link'

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
                    <Link href='/login'>
                        <Button variant='text' component='a'>
                            Login
                        </Button>
                    </Link>
                    <Link href='sign-up'>
                        <Button variant='outlined' component='a'>
                            Sign Up
                        </Button>
                    </Link>
                </Buttons>
            </Toolbar>
        </AppBar>
    )
}

export default Header