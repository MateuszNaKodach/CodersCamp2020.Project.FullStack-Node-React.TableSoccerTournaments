import {Link} from "react-router-dom";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

type NewTournamentButtonProps = {
    readonly onLink: string;
}

const useStyles = makeStyles({
        link: {
            textDecoration: "none"
        },
        fab: {
            padding: 10,
            position: 'absolute',
            right: 0,
        },
        icon: {
            paddingRight: 7
        },
    }
)

const NewTournamentButton = ({onLink}: NewTournamentButtonProps) => {
    const classes = useStyles();

    return (
        <Link to={onLink} className={classes.link}>
            <Fab variant="extended" color="secondary" aria-label="add" className={classes.fab}>
                <Add className={classes.icon}/>
                Turniej
            </Fab>
        </Link>
    )
}

export default NewTournamentButton;