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
import {Typography} from "@material-ui/core";

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

export default function LabTabs() {
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
                <TabPanel value="1">Mecze</TabPanel>
                <TabPanel value="2">
                    <Alert severity="info">
                        <AlertTitle><strong>Turniej w trakcie</strong></AlertTitle>
                        Wyniki będą dostępne po zakończeniu wszystkich meczy
                    </Alert>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Centered>
                            <EmojiEventsIcon color={"primary"} style={{fontSize: '3rem'}}/>
                            <Typography variant={"h5"} component={"h5"}>Zwycięzca</Typography>
                        </Centered>

                    </div>

                </TabPanel>
            </TabContext>
        </div>
    );
}