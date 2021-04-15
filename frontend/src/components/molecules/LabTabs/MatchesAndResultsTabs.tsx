import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {Alert, AlertTitle} from "@material-ui/lab";
import {Centered} from "../../atoms/Shared/Centered";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import {Box, Tabs, Typography} from "@material-ui/core";
import {MatchesList} from "../../organisms/MatchesList/MatchesList";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: '270px'
    },
    tab: {
        width: '270px',
    }
}));

type LabTabsProps = {
    readonly tournamentId: string;
}

export default function MatchesAndResultsTabs(props: LabTabsProps) {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <TabContext value={value}>
                <AppBar position="static" className={classes.tab}>
                    <Centered>
                        <TabList onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Mecze" value="1"/>
                            <Tab label="Wyniki" value="2"/>
                        </TabList>
                    </Centered>
                </AppBar>
                <TabPanel value="1">
                    <MatchesList tournamentId={props.tournamentId}/>
                </TabPanel>
                <TabPanel value="2">
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
                </TabPanel>
            </TabContext>
        </div>
    );
}