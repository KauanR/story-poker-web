import { Button, Card, CardContent, InputAdornment, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../../common/TextField'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import styles from './styles.module.scss'
import Select from '../../common/Select'
import useApi from '../../../hooks/useApi'
import { useSnackbar } from '../../../hooks/useSnackbar'
import { useRouter } from 'next/router'
import { useUser } from '../../../hooks/useUser'

type Props = {
    roomId: string | string[] | undefined
    title: string | string[] | undefined
}

const Join = ({ roomId, title }: Props) => {

    const router = useRouter()
    const { post } = useApi()
    const { createSnack } = useSnackbar()
    const { setUser } = useUser()

    const formSubmit = (values: any) => {
        post('/participant', { room_id: roomId, ...values })
            .then(data => {
                setUser({
                    id: data.participant.id,
                    name: data.participant.nickname,
                    email: '',
                    token: data.token
                })
                createSnack('Joined successfully!', 'success')
                router.push(`/room/${roomId}`)
            })
            .catch(err => {
                console.log(err)
                createSnack('Something wrong happened, please try again', 'error')
            })
    }

    return (
        <div className={styles.wrap}>
            <Card>
                <CardContent>
                    <Typography variant='h5' textAlign='center'>
                        { title }
                    </Typography>
                    <Typography variant='h5' textAlign='center' sx={{fontWeight: 300, mb: '1.5rem'}}>
                        room invite
                    </Typography>

                    <Typography variant='body2' color='text.secondary' textAlign='center' sx={{mb: '2rem'}}>
                        Please, enter your nickname and type before to continue
                    </Typography>

                    <Formik
                        initialValues={{
                            nickname: '',
                            type: 'player'
                        }}
                        validationSchema={
                            Yup.object().shape({
                                nickname: Yup.string().required('Nickname is required')
                            })
                        }
                        validateOnBlur={true}
                        validateOnMount={true}
                        onSubmit={formSubmit}
                    >
                        { formProps => (
                            <Form className={styles.form}>
                                <TextField
                                    name='nickname'
                                    label='Nickname'
                                    type='text'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <PersonPinIcon/>
                                            </InputAdornment>
                                        )
                                    }}
                                    fullWidth
                                />

                                <Select
                                    name='type'
                                    label='Type'
                                    options={[
                                        { name: 'Player', value: 'player' },
                                        { name: 'Observer', value: 'observer' }
                                    ]}
                                    fullWidth
                                />

                                <div className={styles.submit}>
                                    <Button
                                        variant='contained'
                                        type='submit'
                                        disabled={!formProps.isValid}
                                    >
                                        Join it
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}

export default Join