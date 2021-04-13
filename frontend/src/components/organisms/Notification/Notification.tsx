import useStyles from "./styles";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Notification = (props: {
  text: string;
  open: boolean;
  handleClose: () => void;
  isError: boolean;
}) => {
  const classes = useStyles();

  return props.isError ? (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={props.handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={props.handleClose} severity="error">
        {props.text}
      </Alert>
    </Snackbar>
  ) : (
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
