import { TextField } from '@mui/material';

type props = {
        name: string;
        label: string;
        type: string;
        placeholder?: string;
}

const CustomizedInput = (props: props) => {
    return (
        <TextField 
        margin='normal'
            InputLabelProps={{ style: { color: '#000' } }}
            InputProps={{ style: { width: '400px', color: '#000', fontSize: 20, borderRadius: 10} }}
        name={props.name} label={props.label} type={props.type} placeholder={props.placeholder ? props.placeholder : ''}></TextField>
    )
}

export default CustomizedInput