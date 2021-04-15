import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {MatchesList} from "../../organisms/MatchesList/MatchesList";
import {Centered} from "../../atoms/Centered";

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

                </TabPanel>
            </TabContext>
        </div>
    );
}