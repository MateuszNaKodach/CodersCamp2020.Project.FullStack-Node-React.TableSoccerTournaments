import useStyles from "./styles";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Notification = (props: {
  text: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const classes = useStyles();
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={props.handleClose}
    >
      <Alert
        onClose={props.handleClose}
        className={classes.colors}
        icon={false}
      >
        {props.text}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
