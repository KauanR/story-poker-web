import { Paper, Tooltip, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import Card from '../../../../types/room/card'
import styles from './styles.module.scss'

type Props = {
    activeStory?: {
        id: string
        name: string
    }
    cards: Card[]
}

const RoomVoting = ({ activeStory, cards }: Props) => {

    const theme = useTheme()

    console.log(theme)

    const [votedCard, setVotedCard] = useState<number>(-1)

    useEffect(() => {
        setVotedCard(-1)
    }, [])

    const vote = (id: number) => {
        setVotedCard(id)
    }

    return (
        <div className={styles.cards}>
            {/* { activeStory === undefined
                ? (
                    <Tooltip title='Wait until the voting starts' arrow placement='top'>
                        <div className={styles.backdrop}></div>
                    </Tooltip>
                )
                : null
            } */}

            <Typography 
                className={styles.storyTitle}
                variant='h5' 
                align='center'
            >
                { activeStory?.name || '...' }
            </Typography>

            <div className={styles.grid}>
                { cards && cards.map(card => (
                    <div
                        key={card.id} 
                        className={`${styles.card} ${votedCard === card.votingId ? styles.active : ''}`} 
                        onClick={() => vote(card.votingId)}
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