import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { THEME } from "../../constants/ThemeMUI";

const style = {
  color: THEME.palette.primary.main,
  fontSize: "2.5rem",
};

const ArrowBackButton = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <IconButton onClick={handleClick}>
      <NavigateBeforeIcon style={style} />
    </IconButton>
  );
};

export default ArrowBackButton;
