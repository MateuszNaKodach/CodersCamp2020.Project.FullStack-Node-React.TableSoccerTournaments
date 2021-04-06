import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: '10px 0',
    width: '100%',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    marginLeft: '10px',
    maxWidth: '60px',
    maxHeight: '70px',
  },
  title: {
    letterSpacing: '0.15px',
    padding: '5px',
  },
}));

export default useStyles;