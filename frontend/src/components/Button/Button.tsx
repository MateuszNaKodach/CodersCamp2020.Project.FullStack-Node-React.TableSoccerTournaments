import {Button as MaterialUiButton} from '@material-ui/core';
import './Button.css';

function Button( props:{ name: string, onClick:()=>{} }) {
    return (
        <>
            <MaterialUiButton color="primary" variant="contained">{props.name}</MaterialUiButton>
        </>
    );
}

export default Button;
