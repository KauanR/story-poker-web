import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Buttons, Spacer, temp_logoText } from './styles'
import Link from 'next/link'
import { useUser } from '../../../hooks/useUser'

const Header = () => {
    const { user, setUser } = useUser()

    const logout = () => {
        setUser(null)
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='a' href='/' sx={temp_logoText}>
                    Story Poker
                </Typography>

                <Spacer/>

                { user  
                    ? (
                        <Button variant='text' onClick={logout}>
                            Logout
                        </Button>
                    )
                    : (
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
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header