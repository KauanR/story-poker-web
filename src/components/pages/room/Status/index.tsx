import { Button, Card as MuiCard, CardContent, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import useApi from '../../../../hooks/useApi'
import { useSnackbar } from '../../../../hooks/useSnackbar'
import { Actions } from '../../../../types/room/actions'
import Card from '../../../../types/room/card'
import { QueueCtrl } from '../../../../types/room/queue-ctrl'
import { Story } from '../../../../types/room/story'
import { User } from '../../../../types/user'
import Select from '../../../common/Select'
import styles from './styles.module.scss'

type Props = {
    user: User | null
    cards: Card[]
    queue: QueueCtrl
    updateSocket: (action: Actions) => void
    nextStory: Story
}

const RoomStatus = ({ user, cards, queue, updateSocket, nextStory }: Props) => {

    const { createSnack } = useSnackbar()
    const { put } = useApi()

    const userType = user?.email ? 'owner' : 'participant'

    const storyValues = cards.map(card => ({
        name: card.value,
        value: card.value
    }))

    const updateNextStory = () => {
        const payload = {
            title: nextStory.title,
            estimation: '',
            status: 'active'
        }

        put('/story/' + nextStory.id, payload, true)
            .then(() => {
                updateSocket('queue')
                createSnack('Voting started successfully!', 'success')
            })
            .catch(err => console.log(err))
    }

    const endVoting = () => {
        const payload = {
            title: nextStory.title,
            estimation: 'WAITING_CONFIRMATION',
            status: 'active'
        }

        put('/story/' + nextStory.id, payload, true)
            .then(() => {
                updateSocket('queue')
                createSnack('Voting ended successfully!', 'success')
            })
            .catch(err => console.log(err))
    }

    const onSubmit = ({ value }: any) => {
        const payload = {
            title: nextStory.title,
            estimation: value,
            status: 'completed'
        }

        put('/story/' + nextStory.id, payload, true)
            .then(() => {
                updateSocket('queue')
                updateSocket('stories')
                createSnack('Story completed successfully!', 'success')
            })
            .catch(err => console.log(err))
    }

    const skipStory = () => {
        console.log('skipStory')
    }

    return (
        <MuiCard>
            <CardContent className={styles.content}>
                <>
                    <Typography variant='h5'>
                        Status
                    </Typography>

                    { (() => {
                        if(queue.status === 'waiting') {
                            return (
                                <>
                                    <Typography variant='h6' align='center' color='text.secondary'>
                                        Waiting for a story
                                    </Typography>

                                    { userType === 'owner' && (
                                        <Button 
                                            color='primary' 
                                            variant='contained'
                                            type='button'
                                            disabled={!nextStory}
                                            onClick={updateNextStory}
                                        >
                                            Next Story
                                        </Button>
                                    )}
                                </>
                            )
                        } else if(queue.status === 'active') {
                            return (
                                <>
                                    <Typography variant='h6' align='center' color='secondary.main'>
                                        Voting in 
                                        <br />
                                        { queue.story?.title } 
                                    </Typography>

                                    { userType === 'owner' && (
                                        <div className={styles.buttons}>
                                            <Button
                                                variant='outlined'
                                                type='button'
                                                onClick={skipStory}
                                            >
                                                Skip Story
                                            </Button>

                                            <Button 
                                                color='primary' 
                                                variant='contained'
                                                type='button'
                                                disabled={!nextStory}
                                                onClick={endVoting}
                                            >
                                                Finish
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <Typography variant='h6' align='center' color='secondary.main'>
                                        Ending voting in 
                                        <br />
                                        { queue.story?.title } 
                                    </Typography>

                                    <Formik
                                        initialValues={{
                                            value: ''
                                        }}
                                        validationSchema={Yup.object().shape({
                                            value: Yup.string().required('Story value is required'),
                                        })}
                                        validateOnBlur={true}
                                        validateOnMount={true}
                                        onSubmit={onSubmit}
                                    >
                                        { formProps => (
                                            <Form className={styles.form}>
                                                <Select
                                                    label='Story value'
                                                    name='value'
                                                    options={storyValues}
                                                />

                                                <Button 
                                                    color='primary' 
                                                    variant='contained'
                                                    type='submit'
                                                    disabled={!formProps.isValid}
                                                >
                                                    Complete Story
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </>
                            )
                        }
                    })()}
                </>
            </CardContent>
        </MuiCard>
    )
}

export default RoomStatus