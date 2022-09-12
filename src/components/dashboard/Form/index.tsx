import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Select from '../../common/Select'
import TextField from '../../common/TextField'
import { FormValues } from '../types/form-values'
import styles from './styles.module.scss'

type Props = {
    open: boolean
    onClose: () => void
    onSubmit: (values: FormValues) => void
    title: string
    buttonText: string
    initialValues?: FormValues
}

const DashboardForm = (props: Props) => {

    const typeOptions = [
        { name: 'Fibonacci', value: 'fibonacci' },
        { name: 'Relative', value: 'relative' },
        { name: 'Sequential', value: 'sequential' },
        { name: 'Cards', value: 'cards' }
    ]

    const initialValues: FormValues = props.initialValues || { 
        name: '', 
        type: 'fibonacci' 
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        type: Yup.string()
            .required('Type is required')
    })


    return (
        <Dialog 
            open={props.open} 
            onClose={props.onClose}
            maxWidth='sm'
            fullWidth
        >
            <DialogTitle>
                { props.title }
            </DialogTitle>

            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnBlur={true}
                    validateOnMount={true}
                    onSubmit={props.onSubmit}
                >
                    { formProps => (
                        <Form className={styles.form}>
                            <TextField
                                name='name'
                                label='Name'
                                type='text'
                                sx={{width: '90%'}}
                            />

                            <Select
                                name='type'
                                label='Type'
                                options={typeOptions}
                                fullWidth
                                sx={{width: '90%'}}
                            />

                            <div className={styles.buttons}>
                                <Button
                                    variant='outlined'
                                    type='button'
                                    onClick={props.onClose}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant='contained'
                                    type='submit'
                                    disabled={!formProps.isValid}
                                >
                                    { props.buttonText }
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default DashboardForm