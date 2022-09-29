import { AppBar, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Buttons, Spacer, temp_logoText, UserName } from './styles'
import Link from 'next/link'
import { useUser } from '../../../hooks/useUser'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'

const Header = () => {
    
    const router = useRouter()

    const { user, setUser } = useUser()
    const logout = () => {
        setAnchor(null)
        setUser(null)
    }

    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    const openMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget)
    const closeMenu = () => setAnchor(null)

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='a' href='/' sx={temp_logoText}>
                    Story Poker
                </Typography>

                <Spacer/>

                { user  
                    ? (
                        <>
                            <IconButton onClick={openMenu}>
                                <AccountCircleIcon/>
                            </IconButton>
                            <Menu
                                anchorEl={anchor}
                                open={Boolean(anchor)}
                                onClose={closeMenu}
                            >
                                <MenuItem disabled>
                                    <Typography variant='body2'>
                                        Signed in as <span></span>
                                        <UserName>{ user.name }</UserName>
                                    </Typography>
                                </MenuItem>
                                <Divider/>
                                <MenuItem onClick={() => router.push('/profile')}>
                                    <ListItemIcon>
                                        <PersonIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        My account
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <ListItemIcon>
                                        <LogoutIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        Logout
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                        </>
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