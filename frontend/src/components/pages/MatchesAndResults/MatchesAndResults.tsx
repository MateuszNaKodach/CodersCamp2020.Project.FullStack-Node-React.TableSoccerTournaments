import React from "react";
import {Box, Card, CardContent, IconButton, Typography} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

import MatchesAndResultsTabs from "../../molecules/MatchesAndResultsTabs/MatchesAndResultsTabs";
import {MIN_CARD_COMPONENT_WIDTH} from "../../atoms/constants/sizes";
import {VerticalSpace} from "../../atoms/VerticalSpace";
import {Centered} from "../../atoms/Centered";

export const MatchesAndResults = (props: { tournamentId: string }) => {

    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };

    const useStyles = makeStyles(() => ({
        padding: {
            padding: 0,
            paddingTop: "2px",
        },
        card: {
            minWidth: MIN_CARD_COMPONENT_WIDTH,
            width: MIN_CARD_COMPONENT_WIDTH,
            padding: 0,
        },
    }));
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Centered>
                    <Box display="flex" alignItems="center" width="100%">
                        <Box>
                            <IconButton className={classes.padding} onClick={goBack}>
                                <ArrowBackIosIcon/>
                            </IconButton>
                        </Box>
                        <Box flexGrow={1} textAlign="center">
                            <Typography component="h6" variant="h6">
                                Mecze i wyniki
                            </Typography>
                        </Box>
                    </Box>
                    <VerticalSpace height={30}/>
                    <Box>
                        <MatchesAndResultsTabs tournamentId={props.tournamentId}/>
                    </Box>
                </Centered>
            </CardContent>
        </Card>
    );
};
