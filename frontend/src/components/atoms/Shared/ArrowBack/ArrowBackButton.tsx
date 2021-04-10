import {IconButton} from "@material-ui/core";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {Link} from "react-router-dom";


const style = {
    color: "primary",
    fontSize: "2.5rem"
}

type ArrowBackButtonProps = {
    readonly onLink: string;
}

const ArrowBackButton = ({onLink}: ArrowBackButtonProps) => {
    return (
        <Link to={onLink}>
            <IconButton>
                <NavigateBeforeIcon style={style}/>
            </IconButton>
        </Link>
    )
}

export default ArrowBackButton;