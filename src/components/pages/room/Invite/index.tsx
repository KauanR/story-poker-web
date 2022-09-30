import { Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import styles from './styles.module.scss'
import { useState } from 'react'

type Props = {
    roomId: string | string[] | undefined
    basePath: string | string[] | undefined
}

const RoomInvite = ({ roomId, basePath }: Props) => {

    const invite = `${basePath}/join/${roomId}?title=${'Essa merda de titulo'}`

    const [copyFlag, setCopyFlag] = useState(false)

    const copyInvite = () => {
        navigator.clipboard.writeText(encodeURI(invite))
        setCopyFlag(true)
        setTimeout(() => setCopyFlag(false), 2000)
    }

    return (
        <Card>
            <CardContent className={styles.invite}>
                <Typography variant='body1' color='text.secondary'>
                    Send the invite link to your coworkers
                </Typography>

                <Tooltip 
                    title={copyFlag ? 'Copied!' : 'Copy to clipboard'}
                    arrow
                    { ...copyFlag && {
                        componentsProps: {
                            tooltip: { sx: { backgroundColor: 'success.main' } },
                            arrow: { sx: { color: 'success.main' } }
                        }
                    }}
                >
                    <div onClick={copyInvite} className={styles.copy}>
                        <Typography className={styles.text} variant='caption'>
                            { invite }
                        </Typography>
                        <IconButton size='small'>
                            <ContentPasteIcon fontSize='medium' />
                        </IconButton>
                    </div>
                </Tooltip>
            </CardContent>
        </Card>
    )
}

export default RoomInvite