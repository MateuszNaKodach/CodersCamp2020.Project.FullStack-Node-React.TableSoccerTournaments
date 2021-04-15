import {Alert, AlertTitle} from "@material-ui/lab";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import {Box, CircularProgress, Tabs, Typography} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import React, {useEffect, useState} from "react";
import {Centered} from "../../atoms/Centered";
import {DoublesTournamentRestAPI} from "../../../restapi/doubles-tournament/DoublesTournamentRestApi";
import {TournamentPlaceDto} from "../../../restapi/doubles-tournament/TournamentPlaceDto";

type TournamentResultsProps = {
    tournamentId: string;
}

function TournamentsResults(props: TournamentResultsProps) {
    const [tournamentStatus, setTournamentStatus] = useState(undefined);
    const [tournamentPlaces, setTournamentPlaces] = useState<TournamentPlaceDto>();

    useEffect(() => {
        return () => {
            DoublesTournamentRestAPI()
                .getDoublesTournament(props.tournamentId)
                .then((doublesTournament) => {

                })
        };
    }, []);


    useEffect(() => {
        return () => {
            DoublesTournamentRestAPI()
                .getTournamentPlaces(props.tournamentId)
                .then((tournamentPlaces) => {
                    const firstPlace = tournamentPlaces.items.find((tournamentPlace) => tournamentPlace.placeNumber === 1);
                    setTournamentPlaces(firstPlace)
                });
        };
    }, []);
    
    
    return (
        <>
            <Centered>
                <CircularProgress/>
            </Centered>
            <>
                <Alert severity="info">
                    <AlertTitle><strong>Turniej w trakcie</strong></AlertTitle>
                    Wyniki będą dostępne po zakończeniu wszystkich meczy
                </Alert>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Centered>
                        <EmojiEventsIcon color={"primary"} style={{fontSize: '3rem'}}/>
                        <Typography variant={"h5"} component={"h5"}>Zwycięzca</Typography>
                        <Box>
                            <Tabs
                                value={0}
                                orientation="vertical"
                                variant="scrollable"
                                aria-label="Vertical tabs example"
                            >
                                <Tab label="Gracz1"/>
                                <Tab label="Gracz2"/>
                            </Tabs>
                        </Box>
                    </Centered>
                </div>
            </>

        </>
    );
}

export default TournamentsResults;