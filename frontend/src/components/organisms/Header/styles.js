import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    width: '100%',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    maxHeight: '50px',
  },
  title: {
    letterSpacing: '0.15px',
    padding: '5px',
  },
}));

export default useStyles;