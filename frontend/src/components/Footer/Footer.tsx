// import React from 'react';
import { Typography, Box } from '@material-ui/core';
import useStyles from './styles'


const Footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.dupa}>
            <Typography variant='subtitle2' align='center'>
                Copyright &copy;TourDeFoos 2021
            </Typography>
        </Box>
    )
}

export default Footer;