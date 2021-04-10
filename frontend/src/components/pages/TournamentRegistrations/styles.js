import { makeStyles } from "@material-ui/core/styles";
import { MIN_CARD_COMPONENT_WIDTH } from "../../atoms/constants/sizes";

const useStyles = makeStyles((theme) => ({
  root: {
    width: MIN_CARD_COMPONENT_WIDTH,
  },
}));

export default useStyles;
