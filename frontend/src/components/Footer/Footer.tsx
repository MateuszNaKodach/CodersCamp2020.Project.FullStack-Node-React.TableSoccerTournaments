import { Typography, Box } from '@material-ui/core';
import useStyles from './styles'


const Footer = ({text=`Copyright \u00a9 TourDeFoos 2021`}) => {
    const classes = useStyles();
    return (
        <Box className={classes.footer} data-testid="footer">
            <Typography variant='body2' align='center'>
            {text}
            </Typography>
        </Box>
    )
}

export default Footer;