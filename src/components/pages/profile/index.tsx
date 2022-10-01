import React, { useState } from 'react'
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Typography } from '@mui/material'
import { User } from '../../../types/user'
import { Form, Formik } from 'formik'
import { FormValues } from './types/form-values'
import * as Yup from 'yup'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'
import styles from './styles.module.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '../../common/TextField'
import useApi from '../../../hooks/useApi'
import { useSnackbar } from '../../../hooks/useSnackbar'
import { useUser } from '../../../hooks/useUser'

const formSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('It needs to be a valid email')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .when('password', (password, schema) => {
            return schema.test({
                test: (confirmPassword: string) => password === confirmPassword,
                message: 'Your passwords do not match'
            })
        })
})

type Props = {
    user: User
}

const Profile = ({ user }: Props) => {

    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)

    const [dialogFlag, setDialogFlag] = useState(false)

    const { createSnack } = useSnackbar()

    const { put, del } = useApi()

    const { setUser } = useUser()

    const formSubmit = (values: FormValues) => {
        put('/user/' + user.id, values, true)
            .then(data => {
                setUser({
                    token: user.token,
                    ...data.user
                })
                createSnack('Profile updated successfully!', 'success')
            })
            .catch(err => {
                createSnack('Something wrong happened, please try again', 'error')
                console.log(err)
            })
    }

    const deleteUser = () => {
        del('/user/' + user.id, true)
            .then(() => {
                setUser(null)
            })
            .catch(err => {
                createSnack('Something wrong happened, please try again', 'error')
                console.log(err)
            })
    }

    return (
        <>
            <Card className={styles.wrap}>
                <CardContent>
                    <Typography variant='h5' textAlign='center' mb="2rem">
                        Profile
                    </Typography>

                    <Formik
                        initialValues={{
                            name: user.name,
                            email: user.email,
                            password: '',
                            confirmPassword: ''
                        } as FormValues}
                        validationSchema={formSchema}
                        validateOnBlur={true}
                        validateOnMount={true}
                        onSubmit={formSubmit}
                    >
                        { formProps => (
                            <Form className={styles.form}>
                                <TextField
                                    name='name'
                                    label='Name'
                                    type='text'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'> <PersonIcon/> </InputAdornment>
                                        )
                                    }}
                                    sx={{ width: '90%' }}
                                />

                                <TextField
                                    name='email'
                                    label='Email'
                                    type='text'
                                    disabled
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'> <EmailIcon/> </InputAdornment>
                                        )
                                    }}
                                    sx={{ width: '90%' }}
                                />

                                <TextField
                                    name='password'
                                    label='Password'
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'> <KeyIcon/> </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    { showPassword ? <Visibility /> : <VisibilityOff /> }
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ width: '90%' }}
                                />

                                <TextField
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    type={showCPassword ? 'text' : 'password'}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'> <KeyIcon/> </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <IconButton onClick={() => setShowCPassword(!showCPassword)}>
                                                    { showCPassword ? <Visibility /> : <VisibilityOff /> }
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ width: '90%' }}
                                />

                                <div className={styles.submit}>
                                    <Button 
                                        variant='contained' 
                                        type='submit'
                                        disabled={!formProps.isValid}
                                    >
                                        Update
                                    </Button>

                                    <IconButton
                                        className={styles.delete}
                                        color='error'
                                        onClick={() => setDialogFlag(true)}
                                        type='button'
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>

            <Dialog
                open={dialogFlag}
                onClose={() => setDialogFlag(false)}
            >
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign='center'>
                        Are you sure you want to delete yourself?
                    </DialogContentText>
                    <DialogContentText textAlign='center'>
                        All related data will be permanently deleted!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        type='button'
                        onClick={() => setDialogFlag(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={deleteUser}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Profile
