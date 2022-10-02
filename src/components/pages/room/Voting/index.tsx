import { Paper, Tooltip, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Actions } from '../../../../types/room/actions'
import Card from '../../../../types/room/card'
import { User } from '../../../../types/user'
import styles from './styles.module.scss'

type Props = {
    user: User | null
    voting: any
    cards: Card[]
    updateSocket: (action: Actions) => void
}

const RoomVoting = ({ user, voting, cards, updateSocket }: Props) => {

    const theme = useTheme()

    const [votedCard, setVotedCard] = useState<number>(-1)

    useEffect(() => {
        setVotedCard(-1)
    }, [])

    const vote = (id: number) => {
        setVotedCard(id)
        updateSocket('voting')
    }

    return (
        <div className={styles.cards}>
            { voting === null
                ? (
                    <Tooltip title='Wait until the voting starts' arrow placement='top'>
                        <div className={styles.backdrop}></div>
                    </Tooltip>
                )
                : null
            }

            <Typography 
                className={styles.storyTitle}
                variant='h5' 
                align='center'
            >
                { voting?.name || '...' }
            </Typography>

            <div className={styles.grid}>
                { cards && cards.map(card => (
                    <div
                        key={card.id} 
                        { ...!user?.email 
                            ? {
                                className: `${styles.card} ${votedCard === card.votingId ? styles.active : ''}`,
                                onClick: () => vote(card.votingId)
                            }
                            :
                            { className: styles.card }
                        }
                    >
                        <div className={styles.top}>
                            <Typography variant='caption'>{ card.value }</Typography>
                        </div>
                        <div className={styles.middle}>
                            <Typography variant='h4' m='auto'>{ card.value }</Typography>
                        </div>
                        <div className={styles.bottom}>
                            <Typography variant='caption'>{ card.value }</Typography>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default RoomVoting