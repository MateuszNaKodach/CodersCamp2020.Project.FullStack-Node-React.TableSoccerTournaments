import {Alert, AlertTitle} from "@material-ui/lab";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import {Box, CircularProgress, Tabs, Typography} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import React, {useEffect, useState} from "react";
import {Centered} from "../../atoms/Centered";
import {DoublesTournamentRestAPI} from "../../../restapi/doubles-tournament/DoublesTournamentRestApi";
import {TournamentTeamPlaceDto} from "../../../restapi/doubles-tournament/TournamentTeamPlaceDto";
import {PlayerProfileDto, UserProfileRestApi} from "../../../restapi/players-profiles";

type TournamentResultsProps = {
    tournamentId: string;
}

function TournamentsResults(props: TournamentResultsProps) {
    const [tournamentStatus, setTournamentStatus] = useState<string | undefined>(undefined);
    const [tournamentFirstPlaceTeam, setTournamentFirstPlaceTeam] = useState<TournamentTeamPlaceDto>();
    const [firstWinnerPlayerId, setFirstWinnerPlayerId] = useState<string>();
    const [secondWinnerPlayerId, setSecondWinnerPlayerId] = useState<string>();
    const [firstWinnerPlayerDetails, setFirstWinnerPlayerDetails] = useState<PlayerProfileDto>();
    const [secondWinnerPlayerDetails, setSecondWinnerPlayerDetails] = useState<PlayerProfileDto>();


    useEffect(() => {
        return () => {
            DoublesTournamentRestAPI()
                .getDoublesTournament(props.tournamentId)
                .then((doublesTournament) => {
                    setTournamentStatus(doublesTournament.status)
                });
        };
    }, []);


    useEffect(() => {
        return () => {
            DoublesTournamentRestAPI()
                .getTournamentPlaces(props.tournamentId)
                .then((tournamentPlaces) => {
                    const firstPlaceTeam = tournamentPlaces.items.find((tournamentPlace) => tournamentPlace.placeNumber === 1);
                    setTournamentFirstPlaceTeam(firstPlaceTeam)
                });
        };
    }, []);

    useEffect(() => {
        return () => {
            DoublesTournamentRestAPI()
                .getTournamentTeams(props.tournamentId)
                .then((tournamentTeams) => {
                    const winnerTeamMembers = tournamentTeams.items.find((tournamentTeam) => tournamentTeam.teamId === tournamentFirstPlaceTeam?.teamId);
                    setFirstWinnerPlayerId(winnerTeamMembers?.firstTeamPlayer);
                    setSecondWinnerPlayerId(winnerTeamMembers?.secondTeamPlayer);
                    return winnerTeamMembers;
                });
        };
    }, []);

    useEffect(() => {
        return () => {
            UserProfileRestApi()
                .getPlayerProfile(firstWinnerPlayerId!)
                .then((playerDetails) => {
                    setFirstWinnerPlayerDetails(playerDetails);
                });
        };
    }, []);

    useEffect(() => {
        return () => {
            UserProfileRestApi()
                .getPlayerProfile(secondWinnerPlayerId!)
                .then((playerDetails) => {
                    setSecondWinnerPlayerDetails(playerDetails);
                });
        };
    }, []);

    return (
        <>{tournamentStatus === undefined
            ?
            <Centered>
                <CircularProgress/>
            </Centered>
            :
            <>{tournamentStatus === 'ENDED'
                ?
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
                                <Tab label={`${firstWinnerPlayerDetails?.firstName} ${firstWinnerPlayerDetails?.lastName}`}/>
                                <Tab label={`${secondWinnerPlayerDetails?.firstName} ${secondWinnerPlayerDetails?.lastName}`}/>
                            </Tabs>
                        </Box>
                    </Centered>
                </div>
                :
                <Alert severity="info">
                    <AlertTitle><strong>Turniej w trakcie</strong></AlertTitle>
                    Wyniki będą dostępne po zakończeniu wszystkich meczy
                </Alert>
            }</>

        }</>
    );
}

export default TournamentsResults;