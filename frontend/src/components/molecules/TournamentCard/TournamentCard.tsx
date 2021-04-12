import {Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import TextButton from "../../atoms/Shared/TextButton/TextButton";
import {makeStyles} from "@material-ui/core/styles";
import {VerticalSpace} from "../../atoms/Shared/VerticalSpace";
import {MIN_CARD_COMPONENT_WIDTH} from "../../atoms/constants/sizes";
import {PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW} from "../../atoms/constants/routerPaths";

type TournamentCardProps = {
    readonly tournamentId: string,
    readonly tournamentName: string,
    readonly registrationStatus: string,
}


const useStyles = makeStyles({
    root: {
        maxWidth: MIN_CARD_COMPONENT_WIDTH,
    },
    media: {
        height: 150,
    },
    cardActions: {
        justifyContent: "flex-end",
    }
});

const TournamentCard = ({tournamentId, tournamentName, registrationStatus}: TournamentCardProps) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media}
                       image="https://images.unsplash.com/photo-1593958200942-2c05f0a4e72e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                       title="Tournament Image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {tournamentName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    ZAPISY: {registrationStatus}
                </Typography>
            </CardContent>
            <VerticalSpace height={"20px"}/>
            <CardActions disableSpacing={true} className={classes.cardActions}>
                <>
                {registrationStatus === "OPENED"
                    ?
                    <TextButton text={"Zapisy"} onLink={PATH_FOR_TOURNAMENT_REGISTRATIONS_VIEW + `/${tournamentId}`}/>
                    :
                    <TextButton text={"Mecze i wyniki"} onLink={''}/>
                }
                </>
            </CardActions>
        </Card>
    );
}

export default TournamentCard;