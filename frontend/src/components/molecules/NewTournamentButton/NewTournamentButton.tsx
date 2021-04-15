import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
  fab: {
    padding: 10,
    position: "absolute",
    right: 0,
  },
  icon: {
    paddingRight: 7,
  },
});

const NewTournamentButton = (props: { openForm: (open: boolean) => void }) => {
  const classes = useStyles();

  return (
    <Fab
      variant="extended"
      color="secondary"
      aria-label="add"
      className={classes.fab}
      onClick={() => props.openForm(true)}
    >
      <Add className={classes.icon} />
      Turniej
    </Fab>
  );
};

export default NewTournamentButton;
