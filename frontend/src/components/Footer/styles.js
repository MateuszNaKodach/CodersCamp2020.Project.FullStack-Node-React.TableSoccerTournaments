import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    dupa: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: '10px 0',
        width: '20%'
    },
}));

export default useStyles;