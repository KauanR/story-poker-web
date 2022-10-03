import { Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useApi from '../../../../hooks/useApi'
import { Actions } from '../../../../types/room/actions'
import Card from '../../../../types/room/card'
import { QueueCtrl } from '../../../../types/room/queue-ctrl'
import { User } from '../../../../types/user'
import styles from './styles.module.scss'

type Props = {
    user: User | null
    queue: QueueCtrl
    cards: Card[]
    updateSocket: (action: Actions) => void
}

const RoomVoting = ({ user, queue, cards, updateSocket }: Props) => {

    const { post } = useApi()

    const [votedCard, setVotedCard] = useState<{id: number, reqId: number}>({
        id: -1,
        reqId: -1
    })

    const vote = (card: Card) => {
        const payload = {
            story_id:queue.story?.id,
            room_card_id: card.votingId,
            ...(votedCard.reqId !== -1) && {
                id: votedCard.reqId
            }
        }

        post('/vote', payload, true)
            .then(data => {
                setVotedCard({
                    id: card.votingId,
                    reqId: data.id
                })
                updateSocket('queue')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.cards}>
            { queue.status === 'waiting'
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
                { queue.story?.title || '...' }
            </Typography>

            <div className={styles.grid}>
                { cards && cards.map(card => (
                    <div
                        key={card.id} 
                        { ...!user?.email 
                            ? {
                                className: `${styles.card} ${votedCard.id === card.votingId ? styles.active : ''}`,
                                onClick: () => vote(card)
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