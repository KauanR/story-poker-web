import React, { useState } from 'react'
import { Button, Card, CardContent, IconButton, InputAdornment, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FormValues } from './types/form-values'
import TextField from '../common/TextField'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'
import styles from './styles.module.scss'
import Link from 'next/link'
import { useUser } from '../../hooks/useUser'
import { useSnackbar } from '../../hooks/useSnackbar'
import useApi from '../../hooks/useApi'

const formSchema = Yup.object().shape({
    email: Yup.string()
        .email('It needs to be a valid email')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
})

const Login = () => {

    const { post } = useApi()
    const { setUser } = useUser()
    const { createSnack } = useSnackbar()

    const [showPassword, setShowPassword] = useState(false)

    function formSubmit(values: FormValues): void {
        post('/login', values)
            .then(data => {
                console.log(data)
                setUser({ ...data.user, token: data.token })
                createSnack('Login successfully!', 'success')
            })
            .catch(err => {
                createSnack('Something wrong happened, please try again', 'success')
                console.log(err)
            })
    }

    return (
        <div className={styles.wrapper}>
            <Card sx={{width: '35vw'}}>
                <CardContent>
                    <Typography variant='h5' textAlign='center'>
                       Welcome back!
                    </Typography>
                    <Typography variant='body2' color='text.secondary' textAlign='center' sx={{mb: '2rem'}}>
                        Log in to your existing account of Story Poker
                    </Typography>

                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        } as FormValues}
                        validationSchema={formSchema}
                        validateOnBlur={true}
                        validateOnMount={true}
                        onSubmit={formSubmit}
                    >
                        { formProps => (
                            <Form className={styles.form}>
                                <TextField
                                    name='email'
                                    label='Email'
                                    type='text'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'> <EmailIcon/> </InputAdornment>
                                        )
                                    }}
                                    fullWidth
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
                                    fullWidth
                                />

                                <Link href='/forgot-password'>
                                    <Typography 
                                        component='a' 
                                        variant='body2'
                                        sx={{
                                            alignSelf: 'flex-end',
                                            color: 'primary.main',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Forgot password?
                                    </Typography>
                                </Link>

                                <Button 
                                    variant='contained' 
                                    type='submit'
                                    disabled={!formProps.isValid}
                                >
                                    Log in
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>

            <div className={styles.redirect}>
                <Typography variant='body2'>
                    Don&apos;t have an account? 
                </Typography>
                <Link href='/sign-up'>
                    <Typography 
                        variant='body2' 
                        component='a' 
                        sx={{
                            color: 'primary.main',
                            cursor: 'pointer',
                            ml: '.25rem'
                        }}
                    >
                        Sign Up
                    </Typography>
                </Link>
            </div>

        </div>
    )
}

export default Login
