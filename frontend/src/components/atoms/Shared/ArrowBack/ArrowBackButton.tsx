import {IconButton} from "@material-ui/core";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {Link} from "react-router-dom";


const style = {
    color: "primary",
    fontSize: "2.5rem"
}

type ArrowBackButtonProps = {
    readonly onClick: () => void;
    readonly onLink: string;
}

const ArrowBackButton = ({onClick, onLink}: ArrowBackButtonProps) => {
    return (
        <Link to={onLink}>
            <IconButton onClick={onClick}>
                <NavigateBeforeIcon style={style}/>
            </IconButton>
        </Link>
    )
}

export default ArrowBackButton;