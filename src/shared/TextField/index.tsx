import { TextField as MuiTextField, TextFieldProps } from '@mui/material'
import { useField } from 'formik'

type Props = TextFieldProps & {
    name: string
    label: string
}

const TextField = ({name, ...otherProps}: Props) => {
    const [field, control] = useField(name)

    const fieldConfig = {
        ...field,
        ...otherProps,
        error: false,
        helperText: ' '
    }

    if(control && control.touched && control.error) {
        fieldConfig.error = true
        fieldConfig.helperText = control.error
    }
    
    return (
        <MuiTextField {...fieldConfig} />
    )
}

export default TextField