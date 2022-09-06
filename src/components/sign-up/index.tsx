import React, { useState } from 'react'
import { Button, Card, CardContent, IconButton, InputAdornment, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FormValues } from './types/form-values'
import TextField from '../common/TextField'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'
import styles from './styles.module.scss'
import Link from 'next/link'

const formSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('It needs to be a valid email')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
})

const SignUpContent = () => {

    const [showPassword, setShowPassword] = useState(false)

    function formSubmit(values: FormValues): void {
        console.log(values)
    }

    return (
        <div className={styles.wrapper}>
            <Card sx={{width: '35vw'}}>
                <CardContent>
                    <Typography variant='h5' textAlign='center'>
                        Sign Up!
                    </Typography>
                    <Typography variant='body2' color='text.secondary' textAlign='center' sx={{mb: '2rem'}}>
                        Let&apos;s Get Started! Create an account to get all the features
                    </Typography>

                    <Formik
                        initialValues={{
                            name: '',
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
                                    name='name'
                                    label='Name'
                                    type='text'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'> <PersonIcon/> </InputAdornment>
                                        )
                                    }}
                                    fullWidth
                                />

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


                                <Button 
                                    variant='contained' 
                                    type='submit'
                                    disabled={!formProps.isValid}
                                >
                                    Create
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>

            <div className={styles.redirect}>
                <Typography variant='body2'>
                    Already have an account?
                </Typography>
                <Link href='/login'>
                    <Typography 
                        variant='body2' 
                        component='a' 
                        sx={{
                            color: 'primary.main',
                            cursor: 'pointer',
                            ml: '.25rem'
                        }}
                    >
                        Login
                    </Typography>
                </Link>
            </div>

        </div>
    )
}

export default SignUpContent
