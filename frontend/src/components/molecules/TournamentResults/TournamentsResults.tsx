import {Alert, AlertTitle} from "@material-ui/lab";
import {Centered} from "../../atoms/Shared/Centered";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import {Box, Tabs, Typography} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import React, {useState} from "react";

function TournamentsResults() {
    const [tournamentStatus, setTournamentStatus] = useState(undefined);

    useEffect(() => {
        return () => {
            effect
        };
    }, [input]);
    

    return (
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
    );
}

export default TournamentsResults;