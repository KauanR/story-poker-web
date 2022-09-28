import styled from '@emotion/styled'
import { SxProps, Theme } from '@mui/material'

export const temp_logoIcon: SxProps<Theme> = {
    color: 'primary.main'
}

export const temp_logoText: SxProps<Theme> = {
    ml: 2,
    mr: 2,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
    textTransform: 'uppercase'
}

export const Spacer = styled.span`
    flex: 1 1 auto;
`

export const Buttons = styled.div`
    display: flex;
    gap: 1rem;
`

export const UserName = styled.span`
    font: inherit;
    font-weight: bold;
`