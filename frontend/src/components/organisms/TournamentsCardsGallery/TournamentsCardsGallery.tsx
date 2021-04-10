import {createStyles, GridList, GridListTile, styled, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TournamentCard from "../../molecules/TournamentCard/TournamentCard";
import {MIN_CARD_COMPONENT_WIDTH} from "../../atoms/constants/sizes";


const loadedTournamentsCards = [
    {
        id: 1,
        tournamentName: 'Turniej z jajem',
        tournamentRegistrationsStatus: 'OPENED',
    },
    {
        id: 2,
        tournamentName: 'Turniej bez jaja',
        tournamentRegistrationsStatus: 'CLOSED',
    },
    {
        id: 3,
        tournamentName: 'Turniej wrocławski',
        tournamentRegistrationsStatus: 'OPENED',
    },
    {
        id: 4,
        tournamentName: 'Turniej kaliski',
        tournamentRegistrationsStatus: 'CLOSED',
    },
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
            '&::-webkit-scrollbar-track':
                {
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                    borderRadius: '4px',
                    backgroundColor: '#646464',
                },
            '&::-webkit-scrollbar': {
                height: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '4px',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
                backgroundColor: theme.palette.primary.main,
            }
        },
    }),
);

const StyledWrapper = styled("div")({
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    maxWidth: MIN_CARD_COMPONENT_WIDTH,
    width: MIN_CARD_COMPONENT_WIDTH,
})

const TournamentCardsGallery = () => {
    const classes = useStyles();

    return (
        <StyledWrapper>
            <GridList cols={1} cellHeight={'auto'} style={{margin: 0}} classes={{
                root: classes.gridList,
            }}>
                {loadedTournamentsCards.map((card) => (
                    <GridListTile key={card.id} style={{padding: 0, marginRight: '40px'}}>
                        <TournamentCard tournamentName={card.tournamentName}
                                        registrationStatus={card.tournamentRegistrationsStatus}/>
                    </GridListTile>
                ))}
            </GridList>
        </StyledWrapper>
    );
}

export default TournamentCardsGallery;