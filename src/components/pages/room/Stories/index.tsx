import { Button, Card, CardContent, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Tab, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { Actions } from '../../../../types/room/actions'
import { User } from '../../../../types/user'
import TabPanel from '@mui/lab/TabPanel'
import styles from './styles.module.scss'
import { TabContext } from '@mui/lab'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TabList from '@mui/lab/TabList'
import { Form, Formik } from 'formik'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import * as Yup from 'yup'
import TextField from '../../../common/TextField'
import useApi from '../../../../hooks/useApi'
import { useSnackbar } from '../../../../hooks/useSnackbar'
import { StoryCtrl } from '../../../../types/room/story'
import RoomStoriesTable from './Table'

type Props = {
    user: User | null
    roomId: string
    stories: StoryCtrl
    updateSocket: (action: Actions) => void
}

const RoomStories = ({ user, roomId, stories, updateSocket }: Props) => {

    const { post } = useApi()
    const { createSnack } = useSnackbar()

    const formRef = useRef<any>()

    const [tabIndex, setTabIndex] = useState<string>('queue')

    const [dialogFlag, setDialogFlag] = useState<boolean>(false)

    const onSubmit = ({ title, createAnother }: any) => {
        post('/story', { title, room_id: roomId }, true)
            .then(() => {
                createSnack('Story created successfully', 'success')
                updateSocket('stories')
                if(createAnother)
                    formRef.current.resetForm()
                else
                    setDialogFlag(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const nextStory = () => {
        console.log('nextStory')
    }

    return (
        <>
            <Card className={styles.card}>
                <CardContent>
                    <div className={styles.title}>
                        <Typography variant='h5'>
                            Stories
                        </Typography>
                        { user?.email && (
                            <div>
                                <IconButton onClick={() => setDialogFlag(true)}>
                                    <AddCircleIcon/>
                                </IconButton>
                                <IconButton onClick={nextStory}>
                                    <PlayCircleFilledIcon/>
                                </IconButton>
                            </div>
                        )}
                    </div>
                    <TabContext value={tabIndex}>
                        <TabList centered onChange={(evt, val) => setTabIndex(val)}>
                            <Tab label='Stories Queue' value='queue' />
                            <Tab label='Completed Stories' value='completed' />
                        </TabList>
                        <TabPanel value='queue'>
                            <RoomStoriesTable stories={stories.queue}/>
                        </TabPanel>
                        <TabPanel value='completed'>
                            <RoomStoriesTable stories={stories.completed}/>
                        </TabPanel>
                    </TabContext>
                </CardContent>
            </Card>

            <Dialog open={dialogFlag}>
                <DialogTitle> Create Story </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            title: '',
                            createAnother: false
                        }}
                        validationSchema={Yup.object().shape({
                            title: Yup.string().required('Title is required'),
                            createAnother: Yup.boolean()
                        })}
                        validateOnBlur={true}
                        validateOnMount={true}
                        innerRef={ref => formRef.current = ref}
                        onSubmit={onSubmit}
                    >
                        { formProps => (
                            <Form className={styles.createForm}>
                                <TextField
                                    name='title'
                                    label='Story Title'
                                    type='text'
                                    sx={{width: '90%', mt: '.5rem'}}
                                />

                                <div className={styles.submit}>
                                    <FormControlLabel 
                                        control={<Checkbox/>}
                                        label='Create another'
                                        name='createAnother'
                                        onChange={formProps.handleChange}
                                    />

                                    <Button
                                        variant='outlined'
                                        type='button'
                                        onClick={() => setDialogFlag(false)}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        variant='contained'
                                        type='submit'
                                        disabled={!formProps.isValid}
                                    >
                                        Create
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default RoomStories