import { MenuItem, TextField as MuiTextField, TextFieldProps } from '@mui/material'
import { useField } from 'formik'

type Props = TextFieldProps & {
    name: string
    label: string
    options: Array<{
        name: string
        value: any
    }>
}

const Select = ({name, options, ...otherProps}: Props) => {
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
        <MuiTextField
            select
            {...fieldConfig}
        >
            { options && options.length > 0 && options.map((option, index) => (
                <MenuItem
                    value={option.value}
                    key={index}
                >
                    {option.name}
                </MenuItem>
            )) }
        </MuiTextField>
    )
}

export default Select